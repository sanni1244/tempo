'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ViewIdentity() {
  const router = useRouter();
  const { id } = router.query; // Get 'id' from URL query parameter
  const [identity, setIdentity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch identity details using the ID
      fetch(`/api/identities/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch identity details');
          }
          return res.json();
        })
        .then((data) => {
          setIdentity(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading identity details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Identity Details</h1>
      {identity ? (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Name: {identity.name}</h2>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Description:</h3>
            <p>{identity.description}</p>
          </div>
          {/* You can add more fields as needed */}
        </div>
      ) : (
        <p>No identity data found</p>
      )}
    </div>
  );
}
