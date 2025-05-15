"use client";
import React, { useState, ReactNode, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import ResponsesTable from '@/app/jobs/[jobId]/forms/[formId]/responses/page';
import FormPage from '@/app/jobs/[jobId]/forms/[formId]/page';
import { CheckCircleIcon, LinkIcon, TrashIcon } from '@heroicons/react/20/solid';
import { FetchResponses, FetchAction } from '@/app/components/routes'
import { Form, FormField } from '@/app/types/api'


const EmailActionContent = () => (
    <div className="p-4">
        <h4 className="text-lg font-semibold mb-2">Email Action Settings</h4>
        <p className="text-gray-600">Configure automated email responses here.</p>
    </div>
);

const FreddieShortlistContent = () => (
    <div className="p-4">
        <h4 className="text-lg font-semibold mb-2">Freddie's Shortlist</h4>
        <p className="text-gray-600">View and manage shortlisted candidates here.</p>
    </div>
);

interface LayoutPageProps {
    children: ReactNode;
}

const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'form' | 'responses' | 'email' | 'freddie'>('form');
    const [activeForm, setactiveForm] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true)

    const handleTabChange = (tab: 'form' | 'responses' | 'email' | 'freddie') => {
        setActiveTab(tab);
        // Update the URL to reflect the active tab (optional, for better navigation)
        // router.push(`/jobs/${params.jobId}/forms/${params.formId}/${tab}`);
    };

    const currentPath = usePathname();
    const isFormPage = currentPath.includes('/forms/');

    const jobId = params?.jobId;
    const formId = params?.formId as string

    useEffect(() => {
        const loadResponses = async () => {
            if (!formId) return
            try {
                const data = await FetchAction(formId)
                setactiveForm(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadResponses()
    }, [formId])

    const getFormTitle = () => {
        if (activeForm.length === 0) {

            return "Form Name"; // Default title if no forms are loaded
        }
            console.log(activeForm)

        const matchingForm = activeForm.find(form => form.id === formId);
        return matchingForm ? matchingForm.title : "Form Name"; // Show title if found, default if not
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <a href="../" className="text-gray-500 hover:text-gray-700">
                        <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </a>
                    <a href="../" className="text-gray-500 text-sm hover:underline">Forms</a>
                    <svg
                        className="h-4 w-4 mx-2 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-gray-700 font-medium text-sm">
                        {getFormTitle()}
                    </span>
                </div>
                {isFormPage && (
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" aria-hidden="true" />
                            Active
                        </span>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => {
                                const formLink = `${window.location.origin}/apply/jobs/${params.jobId}/forms/${params.formId}`;
                                navigator.clipboard.writeText(formLink);
                                alert('Form link copied to clipboard!');
                            }}
                        >
                            <LinkIcon className="h-5 w-5 mr-2 -ml-1 text-white" aria-hidden="true" />
                            Copy Form Link
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-red-100 px-2.5 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        >
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                )}
                {!isFormPage && (
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Another Action
                    </button>
                )}
            </div>

            {/* Main Content */}
            <div className="bg-white shadow overflow-hidden rounded-md">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        {getFormTitle()}
                    </h3>
                    {isFormPage && (
                        <div className="mt-6 border-b border-gray-200">
                            <nav className="-mb-px flex space-x-4 justify-center" aria-label="Tabs">
                                <button
                                    onClick={() => handleTabChange('form')}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 focus:outline-none ${activeTab === 'form'
                                        ? 'border-grey-800 text-sm font-bold text-grey-700'
                                        : 'border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Form
                                </button>
                                <button
                                    onClick={() => handleTabChange('responses')}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 focus:outline-none ${activeTab === 'responses'
                                        ? 'border-grey-800 text-sm font-bold text-grey-700'
                                        : 'border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Responses
                                </button>
                                <button
                                    onClick={() => handleTabChange('email')}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 focus:outline-none ${activeTab === 'email'
                                        ? 'border-grey-800 text-sm font-bold text-grey-700'
                                        : 'border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Email Action
                                </button>
                                <button
                                    onClick={() => handleTabChange('freddie')}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 focus:outline-none ${activeTab === 'freddie'
                                        ? 'border-grey-800 text-sm font-bold text-grey-700'
                                        : 'border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Freddie's Shortlist
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            {/* Tab Content / Children */}
            <div className="mt-6">
                {isFormPage && activeTab === 'form' && <FormPage />}
                {isFormPage && activeTab === 'responses' && <ResponsesTable />}
                {isFormPage && activeTab === 'email' && <EmailActionContent />}
                {isFormPage && activeTab === 'freddie' && <FreddieShortlistContent />}
                {!isFormPage && children}
            </div>
        </div>
    );
};

export default LayoutPage;

