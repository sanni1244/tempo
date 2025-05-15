'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getIdentityById } from '@/app/lib/api';
import { Loader2 } from 'lucide-react';

export default function FetchApplicantPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

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
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Applicant Details</h1>
      <div className="space-y-4">
        <p><strong>Name:</strong> {applicant.name}</p>
        <p><strong>Email:</strong> {applicant.email}</p>
        <p><strong>Phone:</strong> {applicant.phone}</p>
        <p><strong>Job Title:</strong> {applicant.jobTitle}</p>
      </div>
    </div>
  );
}
