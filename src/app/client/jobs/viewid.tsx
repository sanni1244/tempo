'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ViewJobById() {
  const router = useRouter();
  const { id } = router.query; // Get 'id' from URL query parameter
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch job details from an API using the ID
      fetch(`/api/jobs/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch job details');
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

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!job) return <p>No job found with the provided ID.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Job Details</h1>
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
        <div className="mt-4">
          <span className="font-semibold">Date Posted: </span>
          {new Date(job.postedAt).toLocaleDateString()}
        </div>
        <div className="mt-4">
          <span className="font-semibold">Contact: </span>
          {job.contactEmail}
        </div>
      </div>
    </div>
  );
}

