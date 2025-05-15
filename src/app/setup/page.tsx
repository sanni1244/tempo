'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createManager } from '@/services/managerService'

export default function SetupPage() {
    const router = useRouter()
    const { setManager } = useAuth()

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        companyName: '',
        companyDescription: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newManager = await createManager(form)
        setManager(newManager)
        router.push('/jobs')
    }

    return (
        <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
            <div className="bg-white shadow-sm border border-gray-200 rounded-xl w-full max-w-md p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Set up your Company</h2>
                <p className="text-sm text-gray-500 mb-6">Fill the forms across the next steps to set up your account</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="companyName" className="text-sm font-medium text-gray-700 block mb-1">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Company name"
                            value={form.companyName}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="companyDescription" className="text-sm font-medium text-gray-700 block mb-1">Company Information</label>
                        <textarea
                            name="companyDescription"
                            placeholder="Enter a description of your company"
                            value={form.companyDescription}
                            onChange={handleChange}
                            rows={3}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="flex justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-900 transition"
                        >
                            Next Step
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
