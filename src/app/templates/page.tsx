'use client'

import { useRouter } from 'next/navigation'
import { FileText, LayoutTemplate } from 'lucide-react'
import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar'

export default function TemplatesPage() {
    const router = useRouter()

    const templateOptions = [
        {
            title: 'Form Templates',
            description: 'Reusable forms for applications, assessments, and more.',
            icon: LayoutTemplate,
            href: '/templates/forms',
        },
        {
            title: 'Email Templates',
            description: 'Email drafts for bulk communications with candidates.',
            icon: FileText,
            href: '/templates/emails',
        },
    ]

    return (
        <>
            <BreadcrumbBar items={[{ label: 'Templates' }]} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {templateOptions.map(({ title, description, icon: Icon, href }) => (
                        <button
                            key={href}
                            onClick={() => router.push(href)}
                            className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md p-6 text-left flex gap-4 items-start transition"
                        >
                            <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
                                <Icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
                                <p className="text-sm text-gray-600 mt-1">{description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}
