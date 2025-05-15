'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getEmailById, deleteEmail } from '@/lib/api';

const EmailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [email, setEmail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getEmailById(id as string)
        .then((res) => setEmail(res.data))
        .catch(() => alert('Email not found'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteEmail(id as string);
      alert('Email deleted.');
      router.push('/client/emailactions');
    } catch (err) {
      console.error(err);
      alert('Error deleting email.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Email Detail</h1>
      <p><strong>Subject:</strong> {email.subject}</p>
      <p><strong>To:</strong> {email.to}</p>
      <p><strong>Status:</strong> {email.status}</p>
      <pre className="whitespace-pre-wrap mt-2 p-3 border">{email.body}</pre>
      <button className="mt-4 bg-red-500 text-white px-3 py-1" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EmailPage;
