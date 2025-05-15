'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon } from 'lucide-react'
import { useFormTemplates } from '@/hooks/useFormTemplates'
import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar'
import { Loader } from '@/components/ui/Loader'

export default function FormTemplatesListPage() {
    const router = useRouter()
    const { data: templates, isLoading } = useFormTemplates()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BreadcrumbBar
                items={[
                    { label: 'Templates', href: '/templates' },
                    { label: 'Form Templates' },
                ]}
            />

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => router.push('/templates/forms/new')}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
                >
                    <PlusIcon size={16} /> New Template
                </button>
            </div>

            {isLoading ? (
                <Loader />
            ) : templates?.length === 0 ? (
                <div className="text-gray-500">No form templates found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates?.map(tpl => (
                        <div
                            key={tpl.id}
                            onClick={() => router.push(`/templates/forms/${tpl.id}`)}
                            className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md p-6 transition"
                        >
                            <h2 className="text-lg font-semibold text-gray-900">{tpl.title}</h2>
                            <p className="text-sm text-gray-500 capitalize mt-1">
                                {tpl.formType} form
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                {tpl.groups.reduce((sum, g) => sum + g.fields.length, 0)} fields
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
