'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ViewFormAction() {
  const router = useRouter();
  const { id } = router.query; // Get 'id' from URL query parameter
  const [formAction, setFormAction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch form action details using the ID
      fetch(`/api/formactions/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch form action details');
          }
          return res.json();
        })
        .then((data) => {
          setFormAction(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading form action details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!formAction) return <p>No form action found with the provided ID.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Form Action Details</h1>
      <div>
        <p><strong>Title:</strong> {formAction.title}</p>
        <p><strong>Description:</strong> {formAction.description}</p>
        <p><strong>Action Type:</strong> {formAction.actionType}</p>
        {/* Add any other fields that are part of the form action */}
      </div>
    </div>
  );
}
