import { useEffect, useState } from 'react';
import { getEmailActionById, getEmailsForAction } from './api';
import { useRouter } from 'next/router';

const EmailActionDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [emailAction, setEmailAction] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchEmailActionDetails(id as string);
      fetchEmailsForAction(id as string);
    }
  }, [id]);

  const fetchEmailActionDetails = async (id: string) => {
    try {
      const { data } = await getEmailActionById(id);
      setEmailAction(data);
    } catch (error) {
      console.error('Error fetching email action details:', error);
    }
  };

  const fetchEmailsForAction = async (id: string) => {
    try {
      const { data } = await getEmailsForAction(id);
      setEmails(data);
    } catch (error) {
      console.error('Error fetching emails for action:', error);
    }
  };

  return (
    <div>
      <h1>Email Action Details</h1>
      {emailAction && (
        <div>
          <p>Template: {emailAction.template}</p>
          <p>Recipients: {emailAction.recipients}</p>
        </div>
      )}

      <h2>Emails Sent for this Action</h2>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            <p>Subject: {email.subject}</p>
            <p>Status: {email.status}</p>
            {/* Add more email details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailActionDetailsPage;
