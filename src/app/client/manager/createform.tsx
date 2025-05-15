// components/forms/ManagerForm.tsx
import { api } from '@/app/lib/api';
import React, { useState } from 'react';

const ManagerForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        companyName: '',
        companyDescription: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };

        try {
            const response = await api.post('/managers', dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Manager created:', response.data);
            alert('Manager created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create manager');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block font-medium">Full Name</label>
                <input
                    className="w-full p-2 border rounded"
                    type="text"
                    name="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Email</label>
                <input
                    className="w-full p-2 border rounded"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Company Name</label>
                <input
                    className="w-full p-2 border rounded"
                    type="text"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Company Description</label>
                <textarea
                    className="w-full p-2 border rounded"
                    name="companyDescription"
                    placeholder="Enter company description"
                    value={formData.companyDescription}
                    onChange={handleChange}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};

export default ManagerForm;
