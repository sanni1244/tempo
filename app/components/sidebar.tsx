'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logo from '@/app/components/images/logo.png'
import { pages } from './pagesConfig'

export const SideBar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-200 text-gray-700 flex flex-col justify-between py-4 px-3 min-h-screen">
      <div>
        <div className="flex items-center space-x-2 px-2 mb-6">
          <Image src={logo} alt="Logo" width={32} height={32} />
          <span className="text-xl font-bold">ai-wk</span>
        </div>
        <nav className="space-y-2">
          {pages.map(({ name, path, icon: Icon }) => {
            const isActive = pathname === path
            return (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-300 transition ${
                  isActive ? 'bg-white font-semibold text-black' : ''
                }`}
              >
                <Icon size={18} />
                <span>{name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="text-xs text-gray-500 text-center pt-4">
        <div className="font-medium text-base text-black">222.12</div>
        Credits left
      </div>
    </aside>
  )
}