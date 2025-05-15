import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

interface Identity {
  id: string;
  name: string;
  email: string;
  // Add more properties relevant to the identity as needed
}

interface IdentityPageProps {
  identity: Identity | null;
}

const IdentityPage: React.FC<IdentityPageProps> = ({ identity }) => {
  const router = useRouter();
  const { id } = router.query;

  // Display a loading message while fetching data
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Handle case when identity is not found
  if (!identity) {
    return <div>Identity not found</div>;
  }

  return (
    <div>
      <h1>Identity Details</h1>
      <p>ID: {identity.id}</p>
      <p>Name: {identity.name}</p>
      <p>Email: {identity.email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

// Fetch data on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  let identity: Identity | null = null;

  try {
    const res = await fetch(`https://api.example.com/identities/${id}`);
    if (res.ok) {
      identity = await res.json();
    }
  } catch (error) {
    console.error("Error fetching identity:", error);
  }

  // Pass data to the page via props
  return {
    props: {
      identity,
    },
  };
};

export default IdentityPage;
