"use client";
import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ResponsesTable from '@/app/jobs/[jobId]/forms/[formId]/responses/page';
import {formConfig} from '@/app/jobs/[jobId]/forms/[formId]/form';

const DynamicFormBuilder = () => {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobId;
  const formId = params?.formId;

  const [formData, setFormData] = useState<any[]>(formConfig);
  const [activeTab, setActiveTab] = useState('form');

  // Group Management
  const handleGroupChange = (groupIndex: number, updatedGroup: any) => {
    const newGroups = [...formData[0].groups];
    newGroups[groupIndex] = updatedGroup;
    setFormData([{ ...formData[0], groups: newGroups }]);
  };

  const handleAddGroup = () => {
    const newGroup = {
      id: `group-${Date.now()}`, // Simple ID generation
      title: `Group ${formData[0].groups.length + 1}`,
      sortOrder: formData[0].groups.length + 1,
      fields: []
    };
    setFormData([{ ...formData[0], groups: [...formData[0].groups, newGroup] }]);
  };

  const handleDeleteGroup = (groupIndex: number) => {
    const newGroups = formData[0].groups.filter((_: any, index: number) => index !== groupIndex);
    setFormData([{ ...formData[0], groups: newGroups }]);
  };

  // Field Management
  const handleAddField = (groupIndex: number) => {
    const newField = {
      id: `field-${Date.now()}`, // Simple ID generation
      label: `Field ${formData[0].groups[groupIndex].fields.length + 1}`,
      type: 'text', // Default type
      required: false,
      applicantFieldMapping: 'none',
      value: ''
    };
    const newGroups = [...formData[0].groups];
    newGroups[groupIndex] = {
      ...newGroups[groupIndex],
      fields: [...newGroups[groupIndex].fields, newField]
    };
    setFormData([{ ...formData[0], groups: newGroups }]);
  };

  const handleFieldChange = (groupIndex: number, fieldIndex: number, updatedField: any) => {
    const newFields = [...formData[0].groups[groupIndex].fields];
    newFields[fieldIndex] = updatedField;
    const newGroups = [...formData[0].groups];  // Copy the entire groups array
    newGroups[groupIndex] = { ...newGroups[groupIndex], fields: newFields }; // Update the specific group
    setFormData([{ ...formData[0], groups: newGroups }]); // Update the formData
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    // Here, you would typically send the formData to your backend API
    // using fetch or a library like axios.
    alert('Form data saved! (Check console for data)');
  };

  return (
    <div>
  {activeTab === 'form' && (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dynamic Form Builder</h1>
      {formData[0]?.groups?.map((group: any, groupIndex: number) => (
        <div key={group.id} className="mb-8 p-6 border border-gray-300 rounded-md bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{group.title}</h2>
          {group.fields?.map((field: any, fieldIndex: number) => {
            const inputProps = {
              value: field.value,
              onChange: (e: any) => {
                let newValue;
                if (field.type === 'checkbox') {
                  newValue = e.target.checked;
                } else if (field.type === 'tags') {
                  newValue = e.target.value.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '');
                } else {
                  newValue = e.target.value;
                }

                handleFieldChange(groupIndex, fieldIndex, {
                  ...field,
                  value: newValue,
                });
              },
              placeholder: `Enter ${field.label}`,
              type: field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text',
              id: field.id,
              checked: field.type === 'checkbox' ? field.value : undefined,
              className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 shadow-sm",
            };

            let inputElement;

            switch (field.type) {
              case 'text':
              case 'email':
              case 'tel':
              case 'date':
              case 'number':
                inputElement = <input {...inputProps} />;
                break;
              case 'textarea':
                inputElement = <textarea {...inputProps} rows={3} />;
                break;
              case 'select':
                inputElement = (
                  <select
                    value={field.value}
                    onChange={(e) => handleFieldChange(groupIndex, fieldIndex, { ...field, value: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 shadow-sm"
                  >
                    {field.options?.map((option: string, optionIndex: number) => (
                      <option key={optionIndex} value={option}>{option}</option>
                    ))}
                  </select>
                );
                break;
              case 'radio':
                inputElement = (
                  <div className="flex flex-col gap-3">
                    {field.options?.map((option: string, optionIndex: number) => (
                      <div key={optionIndex} className="flex items-center">
                        <input
                          type="radio"
                          id={`${field.id}-option-${optionIndex}`}
                          name={field.id}
                          value={option}
                          checked={field.value === option}
                          onChange={(e) => handleFieldChange(groupIndex, fieldIndex, { ...field, value: e.target.value })}
                          className="mr-2 focus:ring-indigo-200 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label htmlFor={`${field.id}-option-${optionIndex}`} className="text-gray-700">{option}</label>
                      </div>
                    ))}
                  </div>
                );
                break;
              case 'checkbox':
                inputElement = (
                  <div className="flex items-center">
                    <input {...inputProps} className="mr-2 focus:ring-indigo-200 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor={field.id} className="text-gray-700">{field.label}</label>
                  </div>
                );
                break;
              case 'tags':
                inputElement = (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {Array.isArray(field.value) &&
                        field.value.map((tag: string, index: number) => (
                          <div
                            key={index}
                            className="bg-indigo-100 rounded-full px-3 py-1 text-sm font-medium text-indigo-700 flex items-center"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newTags = (field.value as string[]).filter((_, i) => i !== index);
                                handleFieldChange(groupIndex, fieldIndex, { ...field, value: newTags });
                              }}
                              className="ml-1 text-indigo-400 hover:text-indigo-600 focus:outline-none"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add tag and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim() !== '') {
                          const newTag = (e.target as HTMLInputElement).value.trim();
                          const newTags = Array.isArray(field.value) ? [...field.value, newTag] : [newTag];
                          handleFieldChange(groupIndex, fieldIndex, { ...field, value: newTags });
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 shadow-sm"
                    />
                  </div>
                );
                break;
              default:
                inputElement = <p className="text-red-500">Unsupported field type: {field.type}</p>;
            }

            return (
              <div key={field.id} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.id}>
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {inputElement}
                <div className="mt-2">
                  <label htmlFor={`${field.id}-type`} className="block text-gray-500 text-xs font-semibold mb-1">Field Type</label>
                  <select
                    id={`${field.id}-type`}
                    value={field.type}
                    onChange={(e) => handleFieldChange(groupIndex, fieldIndex, { ...field, type: e.target.value })}
                    className="block w-full p-2 border border-gray-300 rounded-md text-sm text-gray-500 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 shadow-sm"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="number">Number</option>
                    <option value="textarea">Textarea</option>
                    <option value="date">Date</option>
                    <option value="select">Select</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="tags">Tags</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    const newFields = group.fields.filter((_: any, index: number) => index !== fieldIndex);
                    handleGroupChange(groupIndex, { ...group, fields: newFields });
                  }}
                  className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                >
                  Delete Field
                </button>
              </div>
            );
          })}
          <div className="mt-4">
            <button onClick={() => handleAddField(groupIndex)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm mr-2">Add Field</button>
            <button onClick={() => handleDeleteGroup(groupIndex)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Delete Group</button>
          </div>
        </div>
      ))}
      <div className="mt-6">
        <button onClick={handleAddGroup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mr-3">Add Group</button>
        <button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline">Save Form</button>
      </div>
    </div>
  )}
</div>
  );
};

export default DynamicFormBuilder;