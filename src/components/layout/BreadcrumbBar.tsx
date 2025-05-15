'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight } from 'lucide-react'

type BreadcrumbItem = {
    label: string
    href?: string
}

interface BreadcrumbBarProps {
    items: BreadcrumbItem[]
    showBack?: boolean
}

export const BreadcrumbBar = ({ items, showBack = true }: BreadcrumbBarProps) => {
    const router = useRouter()

    return (
        <div className="px-6 py-3">
            <div className="flex items-center text-sm text-gray-500">
                {showBack && (
                    <button onClick={() => router.back()} className="mr-2 text-gray-500 hover:text-black">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                )}

                {items.map((item, index) => (
                    <div key={index} className="flex items-center">
            <span
                className={`${
                    index === items.length - 1
                        ? 'text-gray-900 font-medium'
                        : 'hover:underline cursor-pointer'
                }`}
                onClick={() => item.href && router.push(item.href)}
            >
              {item.label}
            </span>
                        {index < items.length - 1 && (
                            <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
