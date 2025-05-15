'use client';

import { useEffect, useState } from 'react';
import { getEmailById, deleteEmail } from '@/lib/api'; // adjust import if needed
import { useRouter, useSearchParams } from 'next/navigation';

interface Email {
  id: string;
  subject: string;
  body: string;
  status: string;
  to: string;
  createdAt: string;
}

const EmailDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailId = searchParams.get('id'); // or get from dynamic route
  const [email, setEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (emailId) fetchEmail(emailId);
  }, [emailId]);

  const fetchEmail = async (id: string) => {
    try {
      const { data } = await getEmailById(id);
      setEmail(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch email.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!email) return;
    const confirmed = window.confirm('Are you sure you want to delete this email?');
    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteEmail(email.id);
      alert('Email deleted successfully.');
      router.push('/client/emailactions'); // or wherever appropriate
    } catch (err) {
      console.error(err);
      alert('Failed to delete email.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !email) return <p>{error || 'Email not found.'}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Email Details</h1>
      <p><strong>Subject:</strong> {email.subject}</p>
      <p><strong>To:</strong> {email.to}</p>
      <p><strong>Status:</strong> {email.status}</p>
      <p><strong>Sent At:</strong> {new Date(email.createdAt).toLocaleString()}</p>
      <hr className="my-4" />
      <div>
        <h2 className="text-xl font-semibold">Body</h2>
        <div className="border p-3 mt-2 bg-gray-50 whitespace-pre-wrap">
          {email.body}
        </div>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete Email'}
      </button>
    </div>
  );
};

export default EmailDetail;
