'use client'

import { useAuth } from '@/context/AuthContext'

export default function Home() {
    const { manager } = useAuth()

    if (!manager) return <p>Loading manager...</p>

    return (
        <main className="p-8">
            <h1 className="text-xl font-semibold">Welcome, {manager.fullName}</h1>
            <p>Company: {manager.companyName}</p>
            <p>Description: {manager.companyDescription}</p>
        </main>
    )
}
