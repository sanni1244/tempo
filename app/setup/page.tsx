import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SetupPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!name || !email) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Prepare data to send to the server
    const requestData = {
      name,
      email,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Navigate to another page on successful setup
      await router.push('/success'); // Redirect to success page or any other page as needed

    } catch (error) {
      console.error('Setup error:', error);
      setErrorMessage('An error occurred while setting up. Please try again later.');
    }
  };

  return (
    <div className="setup-container">
      <h1>Setup Your Profile</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit">Save Setup</button>
      </form>
    </div>
  );
};

export default SetupPage;
