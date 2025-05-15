'use client'
import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Edit2 } from 'lucide-react'
import { useFormTemplate } from '@/hooks/useFormTemplate'
import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar'
import { Loader } from '@/components/ui/Loader'
import { FormFieldRenderer } from '@/components/forms/FormFieldRenderer'

export default function FormTemplateDetailPage() {
    const { templateId } = useParams()
    const router = useRouter()
    const { data: tpl, isLoading, error } = useFormTemplate(templateId)


    if (isLoading) return <Loader />
    if (error || !tpl) return <div className="text-red-500 p-6">Failed to load.</div>

    return (
        <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <BreadcrumbBar
                    items={[
                        { label: 'Templates', href: '/templates' },
                        { label: 'Form Templates', href: '/templates/forms' },
                        { label: tpl.title },
                    ]}
                />
                <button
                    onClick={() => router.push(`/templates/forms/${tpl.id}/edit`)}
                    className="flex items-center gap-2 text-black hover:underline"
                >
                    <Edit2 size={16} /> Edit
                </button>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-1">{tpl.title}</h1>
            <p className="text-sm text-gray-500 capitalize mb-6">
                {tpl.formType} form
            </p>

            <div className="space-y-8">
                {tpl.groups.map(group => (
                    <section key={group.id}>
                        {group.title && (
                            <h2 className="text-lg font-medium text-gray-800 mb-4">
                                {group.title}
                            </h2>
                        )}
                        <div className="space-y-4">
                            {group.fields.map(field => (
                                <FormFieldRenderer
                                    key={field.id}
                                    field={field}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
