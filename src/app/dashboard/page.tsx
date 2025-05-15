'use client'

import {useAuth} from '@/context/AuthContext'
import {AlertCircle, FilePlus, LayoutTemplate, MailPlus} from 'lucide-react'
import {useRouter} from 'next/navigation'

export default function DashboardPage() {
    const {manager} = useAuth()
    const router = useRouter()

    const hasIdentities = false // TODO: Replace with actual check when identities are implemented

    const actions = [
        {
            label: 'New Job Application',
            description: 'Click to create a new role listing',
            icon: <FilePlus className="w-5 h-5 text-blue-600"/>,
            onClick: () => router.push('/jobs/new'),
        },
        {
            label: 'New Mail Template',
            description: 'Click to create a new mail template',
            icon: <MailPlus className="w-5 h-5 text-blue-600"/>,
            onClick: () => router.push('/templates/emails'),
        },
        {
            label: 'New Form Template',
            description: 'Click to create a new Assessment form',
            icon: <LayoutTemplate className="w-5 h-5 text-blue-600"/>,
            onClick: () => router.push('/templates/forms'),
        },
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
            {/* Notification */}
            {manager && !hasIdentities && (
                <div
                    className="flex items-center justify-between p-4 mb-6 bg-orange-50 border border-orange-200 rounded-md text-sm text-orange-800">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500"/>
                        <span>Set up your email identity to allow Freddie send emails on your behalf to applicants</span>
                    </div>
                    <button
                        onClick={() => router.push('/identities')}
                        className="text-sm font-medium text-black hover:underline"
                    >
                        Setup Now
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
                <button
                    onClick={() => router.push('/jobs/new')}
                    className="flex items-center gap-1 bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-900 transition"
                >
                    <span className="text-lg pb-1 leading-none">+</span> New Job
                </button>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {actions.map((action, idx) => (
                    <button
                        key={idx}
                        onClick={action.onClick}
                        className="w-full bg-blue-50 hover:bg-blue-100 text-left p-4 rounded-xl border border-blue-100 transition shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            {action.icon}
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{action.label}</p>
                                <p className="text-xs text-gray-600">{action.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Recent Jobs Table */}
            <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Jobs</h3>
                <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 text-xs font-semibold bg-gray-50 px-4 py-2 text-gray-700">
                        <div>S/N</div>
                        <div>Application Name</div>
                        <div>No. of Candidates</div>
                        <div>Date Created</div>
                    </div>
                    <div className="px-4 py-6 text-sm text-gray-400 text-center">No jobs found</div>
                </div>
            </div>
        </div>
    )
}
