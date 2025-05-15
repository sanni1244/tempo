'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

export default function Breadcrumb({ items }: { items: Crumb[] }) {
    return (
        <nav className="mb-4">
            <ol className="flex text-sm text-muted-foreground space-x-1">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                        {idx > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
                        {item.href ? (
                            <Link href={item.href} className="text-gray-500 hover:text-gray-800 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-800 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
