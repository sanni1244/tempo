'use client';

import { useState, useCallback, useEffect } from 'react';
import { Template } from '@/app/types/api';
import { FetchManager, FetchIdentities, FetchTemplates } from '@/app/components/routes';
import Create from '@/app/components/createbutton';

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchTemplatesSuccess = useCallback((data: Template[]) => {
    // Ensure the data is an array
    if (Array.isArray(data)) {
      setTemplates(data);
    } else {
      setTemplates([]);
      setError('Failed to load templates.');
    }
  }, []);

  const handleFetchTemplatesError = useCallback((error: string) => {
    setError(error);
    setTemplates([]);
  }, []);

  const handleLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  useEffect(() => {
    setLoading(true);  // Start loading templates

    // Fetch templates using FetchTemplates
    FetchTemplates()
      .then(handleFetchTemplatesSuccess)
      .catch((err) => handleFetchTemplatesError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4/6 mx-auto mt-10">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800 bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
        Form Templates Management
      </h1>

      {loading ? (
        <div className="flex justify-center py-10" role="status" aria-label="Loading templates">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <div className="flex justify-center py-10">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      ) : templates.length === 0 ? (
        <div className="flex justify-center py-10">
          <p className="text-gray-500 text-lg">No templates found for this manager.</p>
        </div>
      ) : (
        <div>
          <label htmlFor="template-select" className="block text-lg font-medium text-gray-700 mb-2">
            Select a Template:
          </label>
          <select
            id="template-select"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => {
              const selectedId = e.target.value;
              const template = templates.find((t) => t.id === selectedId) || null;
              setSelectedTemplate(template);
            }}
          >
            <option value="">-- Select a Template --</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
          </select>

          {selectedTemplate && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedTemplate.title}</h3>
              <ul className="space-y-4">
                {selectedTemplate.groups.map((group, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <h4 className="text-lg font-semibold text-indigo-600 mb-2">{group.title}</h4>
                    <ul className="space-y-2">
                      {group.fields.map((field, fieldIndex) => (
                        <li key={fieldIndex} className="text-sm text-gray-700">
                          <label className="block font-medium text-gray-800 mb-1">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.type === 'radio' || field.type === 'checkbox' ? (
                            <div className="space-y-2">
                              {field.options?.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <input
                                    type={field.type}
                                    name={`field-${fieldIndex}`}
                                    value={option}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                  />
                                  <label className="text-sm text-gray-700">{option}</label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <input
                              type={field.type}
                              required={field.required}
                              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-4">
                Created: {new Date(selectedTemplate.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>
      )}
      <Create onClick={() => console.log('Create button clicked')} />
    </div>
  );
};

export default TemplatesPage;
