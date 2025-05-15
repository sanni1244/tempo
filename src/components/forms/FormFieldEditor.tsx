'use client'

import React from 'react'
import { FieldType, ApplicantFieldMapping, FormType } from '@/types/form'

export type UiField = {
    id: string
    label: string
    type: FieldType
    options: string[]
    required: boolean
    applicantFieldMapping: ApplicantFieldMapping
}

interface FormFieldEditorProps {
    field: UiField
    index: number
    onChangeAction: (id: string, data: Partial<UiField>) => void
    formType: FormType
}

export function FormFieldEditor({
                                    field,
                                    onChangeAction,
                                    formType,
                                }: FormFieldEditorProps) {
    const needsOptions = [
        FieldType.SELECT,
        FieldType.RADIO,
        FieldType.CHECKBOX,
        FieldType.RATING,
    ].includes(field.type)

    const addOption = () => onChangeAction(field.id, { options: [...field.options, ''] })
    const updateOption = (i: number, val: string) => {
        const opts = [...field.options]
        opts[i] = val
        onChangeAction(field.id, { options: opts })
    }
    const removeOption = (i: number) => {
        const opts = field.options.filter((_, idx) => idx !== i)
        onChangeAction(field.id, { options: opts })
    }

    return (
        <div className="space-y-4">
            {/* Label */}
            <div>
                <input
                    type="text"
                    value={field.label}
                    onChange={e => onChangeAction(field.id, { label: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    placeholder="Type your question here"
                />
            </div>
            {/* Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    value={field.type}
                    onChange={e =>
                        onChangeAction(field.id, { type: e.target.value as FieldType, options: [] })
                    }
                    className="mt-1 block w-48 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                >
                    {Object.values(FieldType).map(ft => (
                        <option key={ft} value={ft}>
                            {ft.charAt(0).toUpperCase() + ft.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            {/* Options Editor */}
            {needsOptions && (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                    {field.options.map((opt, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            {field.type === FieldType.RADIO && (
                                <input type="radio" disabled className="h-4 w-4 text-gray-400" />
                            )}
                            {field.type === FieldType.CHECKBOX && (
                                <input type="checkbox" disabled className="form-checkbox h-4 w-4 text-gray-400" />
                            )}
                            {field.type === FieldType.SELECT && <span className="text-gray-400">{i + 1}.</span>}
                            <input
                                type="text"
                                value={opt}
                                onChange={e => updateOption(i, e.target.value)}
                                className="flex-1 border-b border-gray-300 focus:border-black focus:outline-none"
                                placeholder={`Option ${i + 1}`}
                            />
                            <button
                                onClick={() => removeOption(i)}
                                type="button"
                                className="text-gray-400 hover:text-gray-600"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addOption}
                        className="inline-flex items-center text-sm font-semibold text-black hover:underline"
                    >
                        + Add option
                    </button>
                </div>
            )}
            {/* File upload preview */}
            {field.type === FieldType.DOCUMENT && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        File upload (applicant will see upload box)
                    </label>
                    <input
                        type="file"
                        disabled
                        className="mt-1 block w-full text-gray-500 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                </div>
            )}
            {/* Required + Applicant Mapping */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={field.required}
                        onChange={e => onChangeAction(field.id, { required: e.target.checked })}
                        className="form-checkbox h-4 w-4 text-black"
                    />
                    <span className="ml-2 text-sm text-gray-700">Required</span>
                </label>
                {formType === FormType.APPLICATION && (
                    <div className="flex-1 mt-4 sm:mt-0">
                        <label className="block text-sm font-medium text-gray-700">
                            Map to applicant
                            <span className="ml-2 text-gray-400 text-xs">(i)</span>
                        </label>
                        <select
                            value={field.applicantFieldMapping}
                            onChange={e =>
                                onChangeAction(field.id, {
                                    applicantFieldMapping: e.target.value as ApplicantFieldMapping,
                                })
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        >
                            {Object.values(ApplicantFieldMapping).map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <div className="text-xs text-gray-400 mt-1">
                            Fields mapped here will be used to create applicant profiles.
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
