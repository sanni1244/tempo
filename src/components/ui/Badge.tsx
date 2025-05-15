'use client'

import React from 'react'
import clsx from 'clsx'

export type BadgeVariant = 'default' | 'destructive'

export function Badge({
                          children,
                          variant = 'default',
                      }: {
    children: React.ReactNode
    variant?: BadgeVariant
}) {
    return (
        <span
            className={clsx(
                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                {
                    'bg-gray-100 text-gray-800': variant === 'default',
                    'bg-red-100 text-red-800': variant === 'destructive',
                }
            )}
        >
      {children}
    </span>
    )
}
