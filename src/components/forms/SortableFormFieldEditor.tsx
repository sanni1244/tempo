'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import { FormFieldEditor, UiField } from './FormFieldEditor'
import { FormType } from '@/types/form'

interface SortableFormFieldEditorProps {
    field: UiField
    index: number
    onChangeAction: (id: string, data: Partial<UiField>) => void
    onRemoveAction: (id: string) => void
    formType: FormType
}

export function SortableFormFieldEditor({
                                            field,
                                            index,
                                            onChangeAction,
                                            onRemoveAction,
                                            formType,
                                        }: SortableFormFieldEditorProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: field.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white rounded-lg shadow-sm mb-4"
        >
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
                <div className="flex items-center gap-2">
          <span
              {...listeners}
              {...attributes}
              className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
              tabIndex={-1}
          >
            <GripVertical size={20} />
          </span>
                    <span className="font-medium text-gray-900">Question {index + 1}</span>
                </div>
                <button
                    onClick={() => onRemoveAction(field.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove question"
                >
                    <Trash2 size={18} />
                </button>
            </div>
            <div className="px-4 py-3">
                <FormFieldEditor
                    field={field}
                    index={index}
                    onChangeAction={onChangeAction}
                    formType={formType}
                />
            </div>
        </div>
    )
}
