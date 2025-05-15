'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar'
import { PlusIcon } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import {
    FormType,
    FieldType,
    ApplicantFieldMapping,
    CreateFormTemplateRequest,
} from '@/types/form'
import { SortableFormFieldEditor } from '@/components/forms/SortableFormFieldEditor'
import { SortableGroupEditor, UiGroup } from '@/components/forms/SortableGroupEditor'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable'
import {UiField} from "@/components/forms/FormFieldEditor";

export default function NewFormTemplatePage() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { manager } = useAuth()

    const [title, setTitle] = useState('')
    const [formType, setFormType] = useState<FormType>(FormType.APPLICATION)
    const [ungroupedFields, setUngroupedFields] = useState<UiField[]>([])
    const [groups, setGroups] = useState<UiGroup[]>([])

    // DnD sensors
    const sensors = useSensors(useSensor(PointerSensor))

    // --- Group Handlers ---
    const addGroup = () => {
        setGroups(prev => [
            ...prev,
            {
                id: uuidv4(),
                title: '',
                fields: [],
            },
        ])
    }
    const updateGroup = (id: string, data: Partial<UiGroup>) =>
        setGroups(prev => prev.map(g => (g.id === id ? { ...g, ...data } : g)))
    const removeGroup = (id: string) =>
        setGroups(prev => prev.filter(g => g.id !== id))

    // --- Group DnD ---
    const handleGroupDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            setGroups(prev => {
                const oldIdx = prev.findIndex(g => g.id === active.id)
                const newIdx = prev.findIndex(g => g.id === over.id)
                return arrayMove(prev, oldIdx, newIdx)
            })
        }
    }

    // --- Fields in Group ---
    const addFieldToGroup = (groupId: string) => {
        setGroups(prev =>
            prev.map(g =>
                g.id === groupId
                    ? {
                        ...g,
                        fields: [
                            ...g.fields,
                            {
                                id: uuidv4(),
                                label: '',
                                type: FieldType.TEXT,
                                options: [],
                                required: false,
                                applicantFieldMapping: ApplicantFieldMapping.NONE,
                            },
                        ],
                    }
                    : g
            )
        )
    }
    const updateFieldInGroup = (groupId: string, fieldId: string, data: Partial<UiField>) => {
        setGroups(prev =>
            prev.map(g =>
                g.id === groupId
                    ? {
                        ...g,
                        fields: g.fields.map(f => (f.id === fieldId ? { ...f, ...data } : f)),
                    }
                    : g
            )
        )
    }
    const removeFieldFromGroup = (groupId: string, fieldId: string) => {
        setGroups(prev =>
            prev.map(g =>
                g.id === groupId
                    ? { ...g, fields: g.fields.filter(f => f.id !== fieldId) }
                    : g
            )
        )
    }
    const reorderFieldsInGroup = (groupId: string, oldIdx: number, newIdx: number) => {
        setGroups(prev =>
            prev.map(g =>
                g.id === groupId
                    ? { ...g, fields: arrayMove(g.fields, oldIdx, newIdx) }
                    : g
            )
        )
    }

    // --- Ungrouped Fields ---
    const addUngroupedField = () => {
        setUngroupedFields(prev => [
            ...prev,
            {
                id: uuidv4(),
                label: '',
                type: FieldType.TEXT,
                options: [],
                required: false,
                applicantFieldMapping: ApplicantFieldMapping.NONE,
            },
        ])
    }
    const updateUngroupedField = (id: string, data: Partial<UiField>) =>
        setUngroupedFields(prev => prev.map(f => (f.id === id ? { ...f, ...data } : f)))
    const removeUngroupedField = (id: string) =>
        setUngroupedFields(prev => prev.filter(f => f.id !== id))
    const handleUngroupedFieldDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            setUngroupedFields(prev => {
                const oldIdx = prev.findIndex(f => f.id === active.id)
                const newIdx = prev.findIndex(f => f.id === over.id)
                return arrayMove(prev, oldIdx, newIdx)
            })
        }
    }

    // --- Save Template ---
    const createTemplate = useMutation<void, Error, CreateFormTemplateRequest>({
        mutationFn: payload => api.post('/form-templates', payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['form-templates'] })
            router.push('/templates/forms')
        },
    })

    // --- Submit Handler ---
    const handleSubmit = () => {
        if (!manager) return

        // Compose payload per backend DTO
        const payload: CreateFormTemplateRequest = {
            title,
            managerId: manager.id,
            formType,
            groups: groups.length
                ? groups.map((g, idx) => ({
                    title: g.title,
                    fields: g.fields.map((f, jdx) => ({
                        label: f.label,
                        type: f.type,
                        options:
                            [FieldType.SELECT, FieldType.RADIO, FieldType.CHECKBOX, FieldType.RATING].includes(f.type)
                                ? f.options
                                : undefined,
                        required: f.required,
                        applicantFieldMapping: formType === FormType.APPLICATION ? f.applicantFieldMapping : undefined,
                        sortOrder: jdx,
                    })),
                    sortOrder: idx,
                }))
                : undefined,
            fields: ungroupedFields.length
                ? ungroupedFields.map((f, idx) => ({
                    label: f.label,
                    type: f.type,
                    options:
                        [FieldType.SELECT, FieldType.RADIO, FieldType.CHECKBOX, FieldType.RATING].includes(f.type)
                            ? f.options
                            : undefined,
                    required: f.required,
                    applicantFieldMapping: formType === FormType.APPLICATION ? f.applicantFieldMapping : undefined,
                    sortOrder: idx,
                }))
                : undefined,
        }
        createTemplate.mutate(payload)
    }

    return (
        <>
            <BreadcrumbBar
                items={[
                    { label: 'Templates', href: '/templates' },
                    { label: 'Form Templates', href: '/templates/forms' },
                    { label: 'New Template' },
                ]}
            />

            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Title & Type */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Template Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                            placeholder="Enter form template title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Form Type
                        </label>
                        <select
                            value={formType}
                            onChange={e => setFormType(e.target.value as FormType)}
                            className="mt-1 block w-48 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        >
                            {Object.values(FormType).map(ft => (
                                <option key={ft} value={ft}>
                                    {ft.charAt(0).toUpperCase() + ft.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Grouped Fields */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-700">Grouped Questions</span>
                        <button
                            type="button"
                            onClick={addGroup}
                            className="flex items-center gap-2 font-semibold text-black hover:underline"
                        >
                            <PlusIcon size={16} /> Add Group
                        </button>
                    </div>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleGroupDragEnd}
                    >
                        <SortableContext
                            items={groups.map(g => g.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {groups.map((group, idx) => (
                                <SortableGroupEditor
                                    key={group.id}
                                    group={group}
                                    index={idx}
                                    onChangeGroupAction={updateGroup}
                                    onRemoveGroupAction={removeGroup}
                                    onChangeFieldAction={updateFieldInGroup}
                                    onRemoveFieldAction={removeFieldFromGroup}
                                    formType={formType}
                                    onReorderFieldsAction={reorderFieldsInGroup}
                                    addFieldAction={addFieldToGroup}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>

                {/* Ungrouped Fields */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-700">Ungrouped Questions</span>
                        <button
                            type="button"
                            onClick={addUngroupedField}
                            className="flex items-center gap-2 font-semibold text-black hover:underline"
                        >
                            <PlusIcon size={16} /> Add Question
                        </button>
                    </div>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleUngroupedFieldDragEnd}
                    >
                        <SortableContext
                            items={ungroupedFields.map(f => f.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-4">
                                {ungroupedFields.map((f, i) => (
                                    <SortableFormFieldEditor
                                        key={f.id}
                                        field={f}
                                        index={i}
                                        onChangeAction={updateUngroupedField}
                                        onRemoveAction={removeUngroupedField}
                                        formType={formType}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>

                {/* Save */}
                <div className="pt-4 flex justify-end border-t">
                    <button
                        onClick={handleSubmit}
                        disabled={createTemplate.isPending}
                        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
                    >
                        {createTemplate.isPending ? 'Saving…' : 'Save Template'}
                    </button>
                </div>
            </div>
        </>
    )
}
