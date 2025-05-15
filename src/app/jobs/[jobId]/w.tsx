// JobsPage.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import { FetchManager, FetchJobs } from '@/app/components/routes';
import { Managerdetails, Job } from '@/app/types/api';
import { api } from '@/lib/api';
import Create from '@/app/components/createbutton';
import Modal from '@/app/components/modal';

const JobsPage = () => {
    const [selectedManager, setSelectedManager] = useState<Managerdetails | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const manager = await FetchManager();
            setSelectedManager(manager);

            const jobList = await FetchJobs();
            setJobs(jobList);
            setError(null);
        } catch (err) {
            setError('Failed to load data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdateJob = (updatedJob: Job) => {
        setJobs((prev) =>
            prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
        );
        setEditingJob(null);
        setModal({ title: 'Success', message: 'Job updated successfully!' });
    };

    const handleDeleteJob = (jobId: string) => {
        if (!selectedManager) return;
        setJobs((prev) => prev.filter((j) => j.id !== jobId));

        api
            .delete(`/jobs/${jobId}`)
            .then(() => {
                setModal({ title: 'Deleted', message: 'Job deleted successfully.' });
            })
            .catch((err) => {
                setModal({ title: 'Error', message: 'Failed to delete job.' });
                console.error('Delete error:', err);
            });
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-4">
            <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text">
                Job Management
            </h1>

            {loading ? (
                <div className="flex justify-center py-10">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
                    </svg>
                </div>
            ) : error ? (
                <div className="text-red-600 text-center font-medium">{error}</div>
            ) : selectedManager && (
                <div className="mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">
                        {selectedManager.fullName}
                    </h2>

                    {jobs && jobs.length === 0 ? (
                        <div className="text-center text-gray-600">
                            No jobs found for manager <span className="font-semibold">{selectedManager?.id}</span>
                        </div>
                    ) : (
                        <ul className="space-y-6 mt-6">
                            {jobs.map((job) => (
                                <li key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <div>
                                        <p className="font-semibold text-gray-800 text-lg">{job.title}</p>
                                        <p className="text-gray-500">{job.description}</p>
                                        <p className="text-sm text-gray-600">Location: {job.city}, {job.state}, {job.country}</p>
                                        <p className="text-sm text-gray-600">Work Mode: {job.workMode}</p>
                                        <p className={`font-semibold text-sm ${job.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                            Status: {job.status}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Created: {new Date(job.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex space-x-4 mt-4 sm:mt-0">
                                        <button onClick={() => setEditingJob(job)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Edit</button>
                                        <button onClick={() => handleDeleteJob(job.id)} className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white">Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {editingJob && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                <h3 className="text-lg font-semibold mb-4">Edit Job</h3>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    api
                                        .patch(`/jobs/${editingJob.id}?managerId=${selectedManager.id}`, editingJob)
                                        .then((res) => handleUpdateJob(res.data))
                                        .catch((err) => {
                                            const isVerified = err.response?.status === 400;
                                            setModal({
                                                title: 'Update Failed',
                                                message: isVerified
                                                    ? 'You cannot edit this job.'
                                                    : 'Something went wrong.',
                                            });
                                        });
                                }}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            value={editingJob.title || ''}
                                            onChange={(e) => setEditingJob((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                                            className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <input
                                            type="text"
                                            value={editingJob.description || ''}
                                            onChange={(e) => setEditingJob((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                                            className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            value={editingJob.city || ''}
                                            onChange={(e) => setEditingJob((prev) => (prev ? { ...prev, city: e.target.value } : null))}
                                            className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            value={editingJob.state || ''}
                                            onChange={(e) => setEditingJob((prev) => (prev ? { ...prev, state: e.target.value } : null))}
                                            className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Country</label>
                                        <input
                                            type="text"
                                            value={editingJob.country || ''}
                                            onChange={(e) => setEditingJob((prev) => (prev ? { ...prev, country: e.target.value } : null))}
                                            className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Work Mode</label>
                                        <input
                                            type="text"
                                            value={editingJob.workMode || ''}
                                            onChange={(e) => setEditingJob((prev) => (prev ? { ...prev, workMode: e.target.value } : null))}
                                            className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <input
                                            type="text"
                                            value={editingJob.status || ''}
                                            onChange={(e) => setEditingJob((prev) => (prev ? { ...prev, status: e.target.value } : null))}
                                            className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button type="button" onClick={() => setEditingJob(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
                                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <Create onClick={() => setModal({ title: 'Create', message: 'Create job clicked!' })} />
            {modal && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}
        </div>
    );
};

export default JobsPage;