"use client"
import React, { useState } from 'react';
import { PlusCircle, ChevronLeft, Trash2 } from 'lucide-react';
import FormSuccessModal from './formsuccess'
import Image from 'next/image';


type QuestionType = 'short_answer' | 'paragraph' | 'multiple_choice' | 'file_upload';

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  fileUpload?: File | null; // Optional property for file upload
}

const FormDesigner: React.FC = () => {
  const [showResponses, setShowResponses] = useState(false);
  const [formName, setFormName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: '',
      type: 'short_answer',
      options: [],
      required: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveForm = () => {
    // Your form submission logic here (e.g., API call)
    // After successful submission, open the modal
    setIsModalOpen1(true);
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      type: 'short_answer',
      options: [],
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, ...updates } : q
    ));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? {
        ...q,
        options: [...q.options, `Option ${q.options.length + 1}`]
      } : q
    ));
  };

  if (showResponses) {
    return (
      <div className="container mx-auto px-4 py-8">

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center">
            <button
              onClick={() => setShowResponses(false)}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              <span>Back to Form</span>
            </button>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Form Responses</h2>
            <div className="text-center py-8 text-gray-500">
              No responses yet. They will appear here when people submit your form.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-50 min-h-screen py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Designer Test Application
              </span>
            </div>
            <button
              className="bg-gray-800 hover:bg-gray-500 text-white text-sm font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSaveForm}
            >
              Save Form
            </button>

            {isModalOpen1 && <FormSuccessModal onClose={closeModal1} />}
          </div>

          {/* Main Content */}
          <div className="bg-white shadow overflow-hidden rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Designer Test Application
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Product manager role at XYZ Company
              </p>

              {/* Navigation Tabs */}
              <div className="mt-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-4 justify-center" aria-label="Tabs">
                  <a
                    href="#"
                    className="whitespace-nowrap py-4 px-1 border-b-2 border-grey-800 text-sm font-bold text-grey-700 focus:outline-none focus:border-grey-500"
                  >
                    Form
                  </a>
                  <a
                    href="#"
                    className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-200 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:border-gray-300"
                  >
                    Responses
                  </a>
                  <a
                    href="#"
                    className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-200 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:border-gray-300"
                  >
                    Email Action
                  </a>
                  <a
                    href="#"
                    className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-200 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:border-gray-300"
                  >
                    Freddie's Shortlist
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <br />
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h1 className="text-lg font-medium text-gray-800">New Form</h1>
              <button
                onClick={openModal}
                className="text-shadow-sm font-bold text-blue-600"
              >
                Use Template
              </button>
            </div>




            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white p-6 rounded-md shadow-xl">
                  <h2 className="text-lg font-semibold mb-4">Use Template</h2>
                  <div className="mb-4">
                    <label htmlFor="templateSelect" className="block text-gray-700 text-sm font-bold mb-2">
                      Select Form Template
                    </label>
                    <select
                      id="templateSelect"
                      className="shadow appearance-none border rounded w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option>Choose form template</option>
                      {/* Add your template options here */}
                      <option value="template1">Template 1</option>
                      <option value="template2">Template 2</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        // Handle loading the selected template
                        console.log('Load template clicked');
                        closeModal();
                      }}
                    >
                      Load template
                    </button>
                  </div>
                </div>
              </div>
            )}




            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Template Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the subject for this template"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Description
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the subject for this template"
                />
              </div>

              <div className="space-y-4">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your question"
                      />
                      <button
                        onClick={() => removeQuestion(question.id)}
                        className="ml-2 text-red-500 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestion(question.id, {
                          type: e.target.value as QuestionType,
                          options: e.target.value === 'multiple_choice' ? ['Option 1'] : []
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="short_answer">Short Answer</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="file_upload">File upload</option>

                      </select>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={question.required}
                          onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">Required</span>
                      </label>
                    </div>

                    {question.type === 'multiple_choice' && (
                      <div className="space-y-2">
                        {question.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="radio"
                              disabled
                              className="h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.options];
                                newOptions[index] = e.target.value;
                                updateQuestion(question.id, { options: newOptions });
                              }}
                              className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        ))}
                        {question.options.length < 5 && (
                          <button
                            onClick={() => addOption(question.id)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <PlusCircle size={14} />
                            <span>Add Option</span>
                          </button>
                        )}
                      </div>
                    )}

                    {question.type === 'paragraph' && (
                      <textarea
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                        placeholder="Long answer text"
                        rows={3}
                      />
                    )}

                    {question.type === 'short_answer' && (
                      <input
                        type="text"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                        placeholder="Short answer text"
                      />
                    )}

                    {question.type === 'file_upload' && (
                      <input
                        type="file"
                        onChange={(e) => updateQuestion(question.id, {
                          fileUpload: e.target.files?.[0] || null,
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addQuestion}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <PlusCircle size={18} />
                <span className="font-medium">Add Question</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
};

export default FormDesigner;