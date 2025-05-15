'use client'

import {useRouter} from 'next/navigation'
import {useAuth} from '@/context/AuthContext'
import {useQuery} from '@tanstack/react-query'
import {JobDto} from '@/types/api'
import {api} from '@/services/apiClient'

export default function JobsPage() {
    const {manager} = useAuth()
    const router = useRouter()

    const {data: jobs, isLoading, isError} = useQuery<JobDto[]>({
        queryKey: ['jobs', manager?.id],
        enabled: !!manager?.id,
        queryFn: async () => {
            const res = await api.get('/jobs', {
                params: {managerId: manager!.id},
            })
            return res.data
        },
    })

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Job Applications</h1>
                <button
                    onClick={() => router.push('/jobs/new')}
                    className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
                >
                    Create New Job
                </button>
            </div>

            {isLoading ? (
                <p className="text-gray-500 text-sm">Loading jobs...</p>
            ) : isError ? (
                <p className="text-red-500 text-sm">Failed to load jobs.</p>
            ) : jobs?.length === 0 ? (
                <p className="text-gray-400 text-sm">No jobs found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs?.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => router.push(`/jobs/${job.id}`)}
                            className="border p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition"
                        >
                            <h2 className="font-semibold text-gray-900">{job.title}</h2>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{job.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
