'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FetchJobByQueryParam() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch job details based on the ID
      fetch(`/api/jobs/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch job');
          }
          return res.json();
        })
        .then((data) => {
          setJob(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (!id) return <p>Missing job ID in URL</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Job Details</h1>
      {job ? (
        <div>
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.description}</p>
          <div className="mt-4">
            <span className="font-semibold">Location: </span>
            {job.location}
          </div>
          <div className="mt-2">
            <span className="font-semibold">Salary: </span>
            {job.salary}
          </div>
        </div>
      ) : (
        <p>No job found for this ID.</p>
      )}
    </div>
  );
}

