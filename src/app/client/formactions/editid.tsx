'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditFormAction() {
  const router = useRouter();
  const { id } = router.query; // Get 'id' from URL query parameter
  const [formAction, setFormAction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    actionType: '',
  });

  useEffect(() => {
    if (id) {
      // Fetch form action details using the ID
      fetch(`/api/formactions/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch form action details');
          }
          return res.json();
        })
        .then((data) => {
          setFormAction(data);
          setFormData({
            title: data.title || '',
            description: data.description || '',
            actionType: data.actionType || '',
          });
          setLoading(false);
        })
        .catch((error) => {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
          setLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFormAction = {
      title: formData.title,
      description: formData.description,
      actionType: formData.actionType,
    };

    try {
      const res = await fetch(`/api/formactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormAction),
      });

      if (!res.ok) {
        throw new Error('Failed to update form action');
      }

      // Redirect to the form actions list page after successful update
      router.push('/form-actions');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  if (loading) return <p>Loading form action details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!formAction) return <p>No form action found with the provided ID.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Form Action</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="actionType" className="block text-sm font-medium text-gray-700">
            Action Type
          </label>
          <input
            type="text"
            id="actionType"
            name="actionType"
            value={formData.actionType}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
