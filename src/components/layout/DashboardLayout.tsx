'use client'

import React, {useState} from 'react'
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import {Briefcase, FileText, LayoutDashboard, Network, PanelLeftClose, PanelLeftOpen,} from 'lucide-react'
import Image from 'next/image'

const navItems = [
    {
        name: 'Overview',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'Job Applications',
        href: '/jobs',
        icon: Briefcase,
    },
    {
        name: 'Templates',
        href: '/templates',
        icon: FileText,
    },
    {
        name: 'Identities',
        href: '/identities',
        icon: Network,
    },
]

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen bg-[#fafafa]">
            {/* Sidebar */}
            <aside className={clsx(
                'bg-white shadow-sm border-r border-gray-200 transition-all duration-300 min-h-screen flex flex-col',
                collapsed ? 'w-[64px]' : 'w-[240px]'
            )}>
                {/* Top: Logo + Toggle */}
                <div className="flex items-center justify-between px-6 py-4">
                    {!collapsed && (
                        <Image
                            src="/platform-logo.svg"
                            alt="ai-wk logo"
                            width={24}
                            height={24}
                            className="h-6 w-auto"
                        />
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-gray-500 hover:text-black"
                    >
                        {collapsed ? <PanelLeftOpen size={20}/> : <PanelLeftClose size={20}/>}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6 space-y-2 px-2 flex-1">
                    {navItems.map(({name, href, icon: Icon}) => (
                        <Link key={href} href={href}>
              <span className={clsx(
                  'flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-md cursor-pointer transition',
                  pathname === href ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50',
                  collapsed && 'justify-center px-2'
              )}>
                <Icon size={18}/>
                  {!collapsed && name}
              </span>
                        </Link>
                    ))}
                </nav>

                {/* Bottom: Placeholder - can later include settings, profile, org info */}
                {!collapsed && (
                    <div className="mt-auto px-4 py-6 border-t text-xs text-gray-500">
                        Profile
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Freddie Header */}
                <div className="px-6 py-3 bg-white flex items-center gap-3">
                    <Image
                        src="/freddie-avatar.png"
                        alt="Freddie Avatar"
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                    <h1 className="text-sm font-bold text-gray-900">Freddie</h1>
                </div>

                {/* Page content */}
                <div className="px-6 pt-6 pb-12">{children}</div>
            </main>
        </div>
    )
}
