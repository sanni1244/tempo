'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  FetchManager,
  FetchJobs,
  FetchAction,
} from '@/app/components/routes';
import { Managerdetails, Job, Form } from '@/app/types/api';
import Link from 'next/link';

const dummyApplicants = [
  { id: 101, name: 'Alice Smith', email: 'alice.smith@example.com', status: 'Applied' },
  { id: 102, name: 'Bob Johnson', email: 'bob.johnson@example.com', status: 'Reviewed' },
  { id: 103, name: 'Charlie Brown', email: 'charlie.brown@example.com', status: 'Shortlisted' },
];

const JobDetailsPage = () => {
  const [selectedManager, setSelectedManager] = useState<Managerdetails | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'applicants' | 'forms'>('applicants');
  const [applicants, setApplicants] = useState(dummyApplicants);
  const [forms, setForms] = useState<Form[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const manager = await FetchManager();
      setSelectedManager(manager);
      const jobList = await FetchJobs();
      setJobs(jobList);

      // Assume jobId is the first job’s ID (or handle appropriately)
      const jobId = jobList[0]?.id;
      if (jobId) {
        const jobForms = await FetchAction(jobId);
        setForms(jobForms);
      }

      setError(null);
    } catch (err: any) {
      setError('Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (tab: 'applicants' | 'forms') => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <Link
          href="/jobs"
          className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block mr-1 align-text-top"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Job Applications
        </Link>
        <span className="text-gray-400 text-sm mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 inline-block mx-1 align-text-top"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <Link
          href="/jobs/senior-product-manager"
          className="text-gray-700 font-medium text-sm"
        >
          Senior Product Manager
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">Senior Product Manager</h1>
        <p className="text-gray-600 text-sm">Product manager role at XYZ Company</p>
      </div>

      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-4">
          <button
            onClick={() => handleTabChange('applicants')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 focus:outline-none font-medium text-sm ${activeTab === 'applicants'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            All Applicants
          </button>
          <button
            onClick={() => handleTabChange('forms')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 focus:outline-none font-medium text-sm ${activeTab === 'forms'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Forms
          </button>
        </nav>
      </div>

      {activeTab === 'applicants' && (
  <div>
    <h2 className="text-lg font-semibold text-green-900 mb-4">Applicants</h2>
    {applicants.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
              >
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800"
              >
                Status
              </th>
              <th scope="col" className="relative px-3 py-3.5">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-gray-50">
                <td className="px-3 py-3.5">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </td>
                <td className="px-3 py-3.5 text-sm text-gray-800 font-medium">
                  {applicant.name}
                </td>
                <td className="px-3 py-3.5 text-sm text-gray-600">
                  {applicant.email}
                </td>
                <td className="px-3 py-3.5 text-sm">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      applicant.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      applicant.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                      applicant.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                      applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                    {applicant.status}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-right text-sm font-medium">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-gray-500 italic">No applicants for this job yet.</p>
    )}
  </div>
)}

      {activeTab === 'forms' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Forms</h2>
            <Link href={`/jobs/${jobs[0]?.id}/forms/create`}>
              <h1 className="font-bold text-blue-600">Create New Form</h1>
            </Link>
          </div>

          {loading && <p className="text-gray-500">Loading forms...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {forms.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800"
                    >
                      Form Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800"
                    >
                      Date Sent
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800"
                    >
                      No of Responses
                    </th>
                    <th scope="col" className="relative px-3 py-3.5">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {forms.map((form, index) => (
                    <tr key={form.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3.5">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </td>
                      <td className="px-3 py-3.5 text-sm text-gray-500">
                        <Link href={`/jobs/${jobs[0]?.id}/forms/${form.id}`} className="font-medium text-gray-800 hover:underline">
                          {form.title}
                        </Link>
                      </td>
                      <td className="px-3 py-3.5 text-sm text-gray-500">
                        {new Date(form.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-3.5 text-sm text-gray-500">
                        {index === 0 ? '0' : '123'}
                      </td>
                      <td className="px-3 py-3.5 text-right text-sm font-medium">
                        <button className="text-gray-500 hover:text-gray-700">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && <p className="text-gray-500">No forms created yet.</p>
          )}
        </div>
      )}
    </div>
  );
};


export default JobDetailsPage;
