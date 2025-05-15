'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, PlusIcon } from 'lucide-react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableFormFieldEditor } from './SortableFormFieldEditor'
import {UiField} from "@/components/forms/FormFieldEditor";
import { FormType } from '@/types/form'

export type UiGroup = {
    id: string
    title: string
    fields: UiField[]
}

interface SortableGroupEditorProps {
    group: UiGroup
    index: number
    onChangeGroupAction: (id: string, data: Partial<UiGroup>) => void
    onRemoveGroupAction: (id: string) => void
    onChangeFieldAction: (groupId: string, fieldId: string, data: Partial<UiField>) => void
    onRemoveFieldAction: (groupId: string, fieldId: string) => void
    formType: FormType
    onReorderFieldsAction: (groupId: string, oldIdx: number, newIdx: number) => void
    addFieldAction: (groupId: string) => void
}

export function SortableGroupEditor({
                                        group,
                                        index,
                                        onChangeGroupAction,
                                        onRemoveGroupAction,
                                        onChangeFieldAction,
                                        onRemoveFieldAction,
                                        formType,
                                        onReorderFieldsAction,
                                        addFieldAction,
                                    }: SortableGroupEditorProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: group.id })

    // DnD for fields inside group
    const sensors = useSensors(useSensor(PointerSensor))
    const handleFieldDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const oldIdx = group.fields.findIndex(f => f.id === active.id)
            const newIdx = group.fields.findIndex(f => f.id === over.id)
            onReorderFieldsAction(group.id, oldIdx, newIdx)
        }
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-gray-50 rounded-lg mb-8"
        >
            {/* Group Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
                <div className="flex items-center gap-2">
          <span
              {...listeners}
              {...attributes}
              className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
              tabIndex={-1}
          >
            <GripVertical size={20} />
          </span>
                    <input
                        type="text"
                        value={group.title}
                        onChange={e => onChangeGroupAction(group.id, { title: e.target.value })}
                        className="font-medium text-gray-900 bg-transparent border-0 focus:ring-0"
                        placeholder={`Group ${index + 1} Title`}
                    />
                </div>
                <button
                    onClick={() => onRemoveGroupAction(group.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove group"
                >
                    <Trash2 size={18} />
                </button>
            </div>
            {/* Group Fields */}
            <div className="px-4 py-3">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleFieldDragEnd}
                >
                    <SortableContext
                        items={group.fields.map(f => f.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-4">
                            {group.fields.map((field, i) => (
                                <SortableFormFieldEditor
                                    key={field.id}
                                    field={field}
                                    index={i}
                                    onChangeAction={(fid, data) => onChangeFieldAction(group.id, fid, data)}
                                    onRemoveAction={fid => onRemoveFieldAction(group.id, fid)}
                                    formType={formType}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
                {/* Add Field */}
                <button
                    type="button"
                    onClick={() => addFieldAction(group.id)}
                    className="flex items-center gap-2 font-semibold text-black hover:underline mt-4"
                >
                    <PlusIcon size={16} /> Add Question
                </button>
            </div>
        </div>
    )
}
