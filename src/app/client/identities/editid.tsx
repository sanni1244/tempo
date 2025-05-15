'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditIdentity() {
  const router = useRouter();
  const { id } = router.query; // Get 'id' from URL query parameter
  const [identity, setIdentity] = useState<any>({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch identity details using the ID
      fetch(`/api/identities/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch identity details');
          }
          return res.json();
        })
        .then((data) => {
          setIdentity(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIdentity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update identity details
    fetch(`/api/identities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(identity),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update identity');
        }
        return res.json();
      })
      .then((data) => {
        alert('Identity updated successfully');
        router.push(`/identities/view?id=${id}`); // Redirect to view the updated identity
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (loading) return <p>Loading identity details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Identity</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={identity.name}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md"
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
            value={identity.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Update Identity
        </button>
      </form>
    </div>
  );
}
