'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getIdentityById, updateIdentity } from '@/app/lib/api';
import { Loader2 } from 'lucide-react';

export default function EditApplicantPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
  });
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      if (!id) return;
      try {
        const res = await getIdentityById(id);
        const data = res.data;
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          jobTitle: data.jobTitle || '',
        });
      } catch (err) {
        console.error('Error fetching applicant:', err);
      } finally {
        setInitializing(false);
      }
    };

    fetchApplicant();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateIdentity(id as string, form);
      router.push('/applicants');
    } catch (err) {
      console.error('Error updating applicant:', err);
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading applicant...</span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Applicant</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="border p-2 rounded"
        />
        <input
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="border p-2 rounded"
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
          {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
          Save Changes
        </button>
      </form>
    </div>
  );
}
