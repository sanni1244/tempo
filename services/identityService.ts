// services/identityService.ts

interface Identity {
  id: string;
  name: string;
  email: string;
  // Add more properties if necessary
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to fetch an identity by ID
export const fetchIdentityById = async (id: string): Promise<Identity | null> => {
  try {
    const response = await fetch(`${apiUrl}/identities/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching identity with ID ${id}: ${response.statusText}`);
    }
    const data: Identity = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Handle error case
  }
};

// Function to create a new identity
export const createIdentity = async (identity: Omit<Identity, 'id'>): Promise<Identity | null> => {
  try {
    const response = await fetch(`${apiUrl}/identities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(identity),
    });
    if (!response.ok) {
      throw new Error(`Error creating identity: ${response.statusText}`);
    }
    const data: Identity = await response
