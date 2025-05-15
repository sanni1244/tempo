'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {api} from '@/app/lib/api';
import { Identity } from '@/types';

const FetchIdentity = () => {
  const searchParams = useSearchParams();
  const identityId = searchParams.get('id');

  const [identity, setIdentity] = useState<Identity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!identityId) {
      setError('No identity ID provided in query.');
      setLoading(false);
      return;
    }

    const fetchIdentity = async () => {
      try {
        const response = await api.get(`/identities/${identityId}`);
        setIdentity(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch identity');
      } finally {
        setLoading(false);
      }
    };

    fetchIdentity();
  }, [identityId]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Identity Details</h2>

      <div className="space-y-3">
        <p><strong>ID:</strong> {identity?.id}</p>
        <p><strong>Identity:</strong> {identity?.identity}</p>
        <p><strong>Type:</strong> {identity?.identityType}</p>
        <p><strong>Status:</strong> {identity?.verificationStatus}</p>
        <p><strong>Manager ID:</strong> {identity?.managerId}</p>
        <p><strong>Created:</strong> {new Date(identity?.createdAt || '').toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(identity?.updatedAt || '').toLocaleString()}</p>
      </div>
    </div>
  );
};

export default FetchIdentity;

