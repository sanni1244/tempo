'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getIdentityById } from '@/app/lib/api';
import { Loader2 } from 'lucide-react';

export default function ViewApplicantPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [applicant, setApplicant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      if (!id) return;
      try {
        const res = await getIdentityById(id);
        setApplicant(res.data);
      } catch (err) {
        console.error('Error fetching applicant:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading applicant...</span>
      </div>
    );
  }

  if (!applicant) {
    return <p className="text-center">No applicant found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Applicant Details</h1>
      <div className="space-y-6">
        <div>
          <p className="font-medium">Name:</p>
          <p>{applicant.name}</p>
        </div>
        <div>
          <p className="font-medium">Email:</p>
          <p>{applicant.email}</p>
        </div>
        <div>
          <p className="font-medium">Phone:</p>
          <p>{applicant.phone}</p>
        </div>
        <div>
          <p className="font-medium">Job Title:</p>
          <p>{applicant.jobTitle}</p>
        </div>
        <div>
          <p className="font-medium">Status:</p>
          <p>{applicant.status}</p>
        </div>
      </div>
    </div>
  );
}
