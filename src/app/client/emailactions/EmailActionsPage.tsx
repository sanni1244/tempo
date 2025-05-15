import { useState, useEffect } from 'react';
import { createEmailAction, getEmailActions } from './api';

const EmailActionsPage = () => {
  const [jobId, setJobId] = useState<string>(''); // Replace with a specific Job ID if needed
  const [emailActions, setEmailActions] = useState<any[]>([]);
  const [formData, setFormData] = useState({ template: '', recipients: '' });

  useEffect(() => {
    if (jobId) {
      fetchEmailActions(jobId);
    }
  }, [jobId]);

  const fetchEmailActions = async (jobId: string) => {
    try {
      const { data } = await getEmailActions(jobId);
      setEmailActions(data);
    } catch (error) {
      console.error('Error fetching email actions:', error);
    }
  };

  const handleCreateEmailAction = async () => {
    try {
      const { data } = await createEmailAction(formData);
      console.log('Email Action Created:', data);
      fetchEmailActions(jobId);
    } catch (error) {
      console.error('Error creating email action:', error);
    }
  };

  return (
    <div>
      <h1>Email Actions</h1>
      <div>
        <label htmlFor="jobId">Job ID:</label>
        <input
          id="jobId"
          type="text"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
        />
      </div>

      <div>
        <h2>Create New Email Action</h2>
        <input
          type="text"
          placeholder="Template"
          value={formData.template}
          onChange={(e) => setFormData({ ...formData, template: e.target.value })}
        />
        <input
          type="text"
          placeholder="Recipients"
          value={formData.recipients}
          onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
        />
        <button onClick={handleCreateEmailAction}>Create Email Action</button>
      </div>

      <h2>Email Actions List</h2>
      <ul>
        {emailActions.map((action) => (
          <li key={action.id}>
            <div>
              <p>Template: {action.template}</p>
              <p>Recipients: {action.recipients}</p>
              <a href={`/emailactions/${action.id}`}>View Details</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailActionsPage;
