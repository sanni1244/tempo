'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {api} from '@/app/lib/api';
import { Identity } from '@/types';

const EditIdentityForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const identityId = searchParams.get('id');

  const [formData, setFormData] = useState<Partial<Identity>>({
    identity: '',
    identityType: '',
    verificationStatus: '',
    managerId: '',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!identityId) {
      setError('No identity ID provided.');
      setLoading(false);
      return;
    }

    api.get(`/identities/${identityId}`)
      .then((res: { data: SetStateAction<Partial<Identity>>; }) => {
        setFormData(res.data as Partial<Identity>);
            })
            .catch((err: { response?: { data?: { message?: string } } }) => {
        setError(err.response?.data?.message || 'Failed to load identity');
            })
            .finally(() => {
        setLoading(false);
      });
  }, [identityId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      await api.put(`/identities/${identityId}`, formData);
      setSuccess(true);
      router.push('/managers'); // or redirect back to the manager's identity list
    } catch (err: any) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-500">Loading identity...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-lg text-red-600">{error}</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Identity</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="identity"
          type="text"
          placeholder="Identity"
          value={formData.identity}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <select
          name="identityType"
          value={formData.identityType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Select Type</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
          <option value="NIN">NIN</option>
        </select>

        <select
          name="verificationStatus"
          value={formData.verificationStatus}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="Verified">Verified</option>
          <option value="Unverified">Unverified</option>
        </select>

        <input
          name="managerId"
          type="text"
          placeholder="Manager ID"
          value={formData.managerId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={updating}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {updating ? 'Updating...' : 'Update Identity'}
        </button>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Identity updated successfully!</p>}
      </form>
    </div>
  );
};

export default EditIdentityForm;
