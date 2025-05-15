'use client'
import React from 'react'
import {FieldType, FormFieldDto} from '@/types/form'
import {Star} from "lucide-react";

interface FormFieldRendererProps {
    field: FormFieldDto
    value?: string | string[]
    onChange?: (v: string | string[]) => void
}

export function FormFieldRenderer({
                                      field,
                                      value,
                                      onChange,
                                  }: FormFieldRendererProps) {
    const label = (
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
    )

    switch (field.type) {
        case FieldType.TEXT:
        case FieldType.EMAIL:
        case FieldType.PHONE:
        case FieldType.URL:
        case FieldType.CITY:
        case FieldType.STATE:
        case FieldType.ZIPCODE:
        case FieldType.COUNTRY:
            return (
                <div>
                    {label}
                    <input
                        type={field.type === FieldType.EMAIL ? 'email' : 'text'}
                        value={String(value ?? '')}
                        onChange={e => onChange?.(e.target.value)}
                        disabled
                        className="mt-1 block w-full border-gray-300 bg-gray-50 rounded-md shadow-sm cursor-not-allowed"
                    />
                </div>
            )

        case FieldType.TEXT_AREA:
            return (
                <div>
                    {label}
                    <textarea
                        value={String(value ?? '')}
                        onChange={e => onChange?.(e.target.value)}
                        disabled
                        className="mt-1 block w-full border-gray-300 bg-gray-50 rounded-md shadow-sm cursor-not-allowed"
                    />
                </div>
            )

        case FieldType.SELECT:
            return (
                <div>
                    {label}
                    <select
                        value={String(value ?? '')}
                        onChange={e => onChange?.(e.target.value)}
                        disabled
                        className="mt-1 block w-full border-gray-300 bg-gray-50 rounded-md shadow-sm cursor-not-allowed"
                    >
                        <option>—</option>
                        {field.options?.map(opt => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
            )

        case FieldType.RADIO:
            return (
                <fieldset>
                    {label}
                    <div className="space-y-2">
                        {field.options?.map(opt => (
                            <label key={opt} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name={field.id}
                                    value={opt}
                                    checked={value === opt}
                                    disabled
                                    className="form-radio text-gray-400 cursor-not-allowed"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            )

        case FieldType.CHECKBOX:
            return (
                <fieldset>
                    {label}
                    <div className="space-y-2">
                        {field.options?.map(opt => (
                            <label key={opt} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name={field.id}
                                    value={opt}
                                    checked={Array.isArray(value) && value.includes(opt)}
                                    disabled
                                    className="form-checkbox text-gray-400 cursor-not-allowed"
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            )

        case FieldType.DATE:
            return (
                <div>
                    {label}
                    <input
                        type="date"
                        value={String(value ?? '')}
                        disabled
                        className="mt-1 block border-gray-300 bg-gray-50 rounded-md shadow-sm cursor-not-allowed"
                    />
                </div>
            )

        case FieldType.DOCUMENT:
            return (
                <div>
                    {label}
                    <input
                        type="file"
                        disabled
                        className="mt-1 block w-full text-gray-500 bg-gray-50 rounded-md cursor-not-allowed"
                    />
                </div>
            )

        // rating
        case FieldType.RATING:
            return (
                <fieldset>
                    {label}
                    <div className="flex items-center space-x-2">
                        {field.options?.map(opt => (
                            <label key={opt} className="flex flex-col items-center">
                                <input
                                    type="radio"
                                    name={field.id}
                                    value={opt}
                                    checked={String(value) === opt}
                                    onChange={e => onChange?.(e.target.value)}
                                    disabled
                                    className="hidden"
                                />
                                <Star size={24} className="text-gray-400"/>
                                <span className="text-xs text-gray-500">{opt}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            )

        default:
            return null
    }
}
