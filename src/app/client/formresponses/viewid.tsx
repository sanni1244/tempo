'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {api} from '@/app/lib/api';
import { Identity } from '@/types';

const ViewIdentity = () => {
  const searchParams = useSearchParams();
  const identityId = searchParams.get('id');

  const [identity, setIdentity] = useState<Identity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!identityId) {
      setError('Missing identity ID in URL.');
      setLoading(false);
      return;
    }

    const fetchIdentity = async () => {
      try {
        const res = await api.get(`/identities/${identityId}`);
        setIdentity(res.data);
      } catch (err: any) {
        setError('Failed to load identity. ' + (err?.response?.data?.message || ''));
      } finally {
        setLoading(false);
      }
    };

    fetchIdentity();
  }, [identityId]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  if (!identity) {
    return <p className="text-center mt-10 text-gray-500">Identity not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-6 shadow rounded-lg border">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">View Identity</h1>

      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-600">ID:</span> {identity.id}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Identity:</span> {identity.identity}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Type:</span> {identity.identityType}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Status:</span>{' '}
          <span
            className={`font-bold ${
              identity.verificationStatus === 'Verified' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {identity.verificationStatus}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-600">Manager ID:</span> {identity.managerId}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Created At:</span>{' '}
          {new Date(identity.createdAt).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Updated At:</span>{' '}
          {new Date(identity.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ViewIdentity;

