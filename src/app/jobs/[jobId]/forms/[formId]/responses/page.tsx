'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FetchResponses } from '@/app/components/routes'
import { ApplicantResponse } from '@/app/types/api'

export default function ResponsesTable() {
  const params = useParams()
  const router = useRouter()
  const formId = params?.formId as string

  const [responses, setResponses] = useState<ApplicantResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadResponses = async () => {
      if (!formId) return
      try {
        const data = await FetchResponses(formId)
        setResponses(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadResponses()
  }, [formId])

  const getValue = (fields: any[], label: string) =>
    fields.find(field => field.label.toLowerCase() === label.toLowerCase())?.value || '—'

  if (loading) return <p className="text-center py-6">Loading responses...</p>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-md border border-gray-300 overflow-hidden">
        <div className="px-4 py-3 bg-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{responses.length} Responses</h2>
          <button className="text-shadow-xs text-sm font-bold text-blue-600">
            Send Email to all applicants
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Years of experience</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responses.map((response, index) => {
                const fields = response.responses
                const applicantId = response.applicantId
                return (
                  <tr
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => router.push(`/applicants/${applicantId}`)}
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" onClick={e => e.stopPropagation()} />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{getValue(fields, 'Full Name')}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{getValue(fields, 'Email Address')}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{getValue(fields, 'Current/Most Recent Position')}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{getValue(fields, 'Current Location')}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{getValue(fields, 'Years of Experience')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-100 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing 1 to {responses.length} of {responses.length} Rows
          </div>
          <div className="space-x-2">
            <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded">Previous</button>
            <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
