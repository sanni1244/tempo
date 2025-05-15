'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useFormTemplate } from '@/hooks/useFormTemplate'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar'
import { Loader } from '@/components/ui/Loader'
import { PlusIcon } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import {
    FormType,
    FieldType,
    ApplicantFieldMapping,
    UpdateFormRequest,
} from '@/types/form'
import { UiField } from '@/components/forms/FormFieldEditor'
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

export default function EditFormTemplatePage() {
    const { templateId } = useParams()
    const router = useRouter()
    const { manager } = useAuth()
    const queryClient = useQueryClient()

    // fetch existing
    const { data: tpl, isLoading } = useFormTemplate(templateId!)

    // local state
    const [title, setTitle] = useState('')
    const [formType, setFormType] = useState<FormType>(FormType.APPLICATION)
    const [ungroupedFields, setUngroupedFields] = useState<UiField[]>([])
    const [groups, setGroups] = useState<UiGroup[]>([])

    // on load, populate
    useEffect(() => {
        if (!tpl) return

        // map backend groups → UiGroup[], defaulting mapping to NONE
        const uiGroups = tpl.groups.map((g) => ({
            id: g.id,
            title: g.title || '',
            fields: g.fields.map((f) => ({
                id: f.id,
                label: f.label,
                type: f.type,
                options: f.options ?? [],
                required: f.required,
                // <<< here's the key default:
                applicantFieldMapping: f.applicantFieldMapping ?? ApplicantFieldMapping.NONE,
            })),
        }))

        setTitle(tpl.title)
        setFormType(tpl.formType)
        setGroups(uiGroups)
        // if your backend returns ungrouped fields use tpl.fields here,
        // otherwise clear to empty
        setUngroupedFields(
            // e.g. tpl.fields?.map(...) or just empty
            []
        )
    }, [tpl])

    // mutation
    const updateMutation = useMutation<void, Error, UpdateFormRequest>({
        mutationFn: payload =>
            api.patch(`/form-templates/${templateId}`, payload, {
                params: { managerId: manager!.id },
            }),
        onSuccess: () => {
            // invalidate the single‐template cache
            void queryClient.invalidateQueries({
                queryKey: ['formTemplate', templateId],
            })
            // invalidate the list cache
            void queryClient.invalidateQueries({
                queryKey: ['formTemplates', manager!.id],
            })
            router.push(`/templates/forms/${templateId}`)
        },
    })

    // DnD sensors
    const sensors = useSensors(useSensor(PointerSensor))

    // reordering
    const onGroupDragEnd = (e: DragEndEvent) => {
        const { active, over } = e
        if (over && active.id !== over.id) {
            setGroups(g =>
                arrayMove(
                    g,
                    g.findIndex(x => x.id === active.id),
                    g.findIndex(x => x.id === over.id)
                )
            )
        }
    }
    const onUngroupedDragEnd = (e: DragEndEvent) => {
        const { active, over } = e
        if (over && active.id !== over.id) {
            setUngroupedFields(f =>
                arrayMove(
                    f,
                    f.findIndex(x => x.id === active.id),
                    f.findIndex(x => x.id === over.id)
                )
            )
        }
    }

    // handlers for groups / fields… (identical to “New” page)
    const addGroup = () =>
        setGroups(g => [
            ...g,
            { id: uuidv4(), title: '', fields: [] },
        ])
    const updateGroup = (id: string, data: Partial<UiGroup>) =>
        setGroups(g =>
            g.map(x => (x.id === id ? { ...x, ...data } : x))
        )
    const removeGroup = (id: string) =>
        setGroups(g => g.filter(x => x.id !== id))

    const addFieldToGroup = (gid: string) =>
        setGroups(g =>
            g.map(x =>
                x.id === gid
                    ? {
                        ...x,
                        fields: [
                            ...x.fields,
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
                    : x
            )
        )
    const updateFieldInGroup = (
        gid: string,
        fid: string,
        data: Partial<UiField>
    ) =>
        setGroups(g =>
            g.map(x =>
                x.id === gid
                    ? {
                        ...x,
                        fields: x.fields.map(f =>
                            f.id === fid ? { ...f, ...data } : f
                        ),
                    }
                    : x
            )
        )
    const removeFieldFromGroup = (gid: string, fid: string) =>
        setGroups(g =>
            g.map(x =>
                x.id === gid
                    ? { ...x, fields: x.fields.filter(f => f.id !== fid) }
                    : x
            )
        )

    const addUngroupedField = () =>
        setUngroupedFields(f => [
            ...f,
            {
                id: uuidv4(),
                label: '',
                type: FieldType.TEXT,
                options: [],
                required: false,
                applicantFieldMapping: ApplicantFieldMapping.NONE,
            },
        ])
    const updateUngrouped = (id: string, data: Partial<UiField>) =>
        setUngroupedFields(f =>
            f.map(x => (x.id === id ? { ...x, ...data } : x))
        )
    const removeUngrouped = (id: string) =>
        setUngroupedFields(f => f.filter(x => x.id !== id))

    const reorderFieldsInGroup = (groupId: string, oldIdx: number, newIdx: number) => {
        setGroups(prev =>
            prev.map(g =>
                g.id === groupId
                    ? { ...g, fields: arrayMove(g.fields, oldIdx, newIdx) }
                    : g
            )
        )
    }

    if (isLoading) return <Loader />

    const handleSave = () => {
        const payload: UpdateFormRequest = {
            title,
            formType,
            groups: groups.length
                ? groups.map((g, gi) => ({
                    id: g.id,
                    title: g.title,
                    sortOrder: gi,
                    fields: g.fields.map((f, fi) => ({
                        id: f.id,
                        label: f.label,
                        type: f.type,
                        options:
                            [FieldType.SELECT, FieldType.RADIO, FieldType.CHECKBOX, FieldType.RATING].includes(
                                f.type
                            )
                                ? f.options
                                : undefined,
                        required: f.required,
                        applicantFieldMapping:
                            formType === FormType.APPLICATION
                                ? f.applicantFieldMapping
                                : undefined,
                        sortOrder: fi,
                    })),
                }))
                : undefined,
            fields: ungroupedFields.length
                ? ungroupedFields.map((f, i) => ({
                    id: f.id,
                    label: f.label,
                    type: f.type,
                    options:
                        [FieldType.SELECT, FieldType.RADIO, FieldType.CHECKBOX, FieldType.RATING].includes(
                            f.type
                        )
                            ? f.options
                            : undefined,
                    required: f.required,
                    applicantFieldMapping:
                        formType === FormType.APPLICATION
                            ? f.applicantFieldMapping
                            : undefined,
                    sortOrder: i,
                }))
                : undefined,
        }
        updateMutation.mutate(payload)
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <BreadcrumbBar
                items={[
                    { label: 'Templates', href: '/templates' },
                    { label: 'Form Templates', href: '/templates/forms' },
                    { label: tpl!.title },
                ]}
            />

            <h1 className="text-2xl font-semibold text-gray-900">{tpl!.title}</h1>

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

            {/* Grouped Questions */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700">Grouped Questions</span>
                    <button
                        onClick={addGroup}
                        className="flex items-center gap-2 text-black font-semibold hover:underline"
                    >
                        <PlusIcon size={16} /> Add Group
                    </button>
                </div>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={onGroupDragEnd}
                >
                    <SortableContext
                        items={groups.map(g => g.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {groups.map((g, i) => (
                            <SortableGroupEditor
                                key={g.id}
                                group={g}
                                index={i}
                                formType={formType}
                                onChangeGroupAction={updateGroup}
                                onRemoveGroupAction={removeGroup}
                                onChangeFieldAction={updateFieldInGroup}
                                onRemoveFieldAction={removeFieldFromGroup}
                                onReorderFieldsAction={reorderFieldsInGroup}
                                addFieldAction={addFieldToGroup}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

            {/* Ungrouped Questions */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700">Ungrouped Questions</span>
                    <button
                        onClick={addUngroupedField}
                        className="flex items-center gap-2 text-black font-semibold hover:underline"
                    >
                        <PlusIcon size={16} /> Add Question
                    </button>
                </div>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={onUngroupedDragEnd}
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
                                    formType={formType}
                                    onChangeAction={updateUngrouped}
                                    onRemoveAction={removeUngrouped}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* Save */}
            <div className="flex justify-end pt-6 border-t">
                <button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
                >
                    {updateMutation.isPending ? 'Saving…' : 'Save Changes'}
                </button>
            </div>
        </div>
    )
}
