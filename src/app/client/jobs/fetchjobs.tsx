// JobsClient.tsx
'use client';
import { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { api } from '@/app/lib/api';
import { Job } from '@/types';
import Modal from '@/app/components/modal';

export interface JobsClientProps {
  managerId: string | null;
  onFetchSuccess: (data: Job[]) => void;
  onFetchError: (error: string | null) => void; 
  onLoading: (loading: boolean) => void;
  onJobSelect: (job: Job | null) => void;
}

const JobsClient: React.FC<JobsClientProps> = ({
  managerId,
  onFetchSuccess,
  onFetchError,
  onLoading,
  onJobSelect,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingState, setLoadingState] = useState(false);
  const [localErrorState, setLocalErrorState] = useState<string | null>(null); // Local error state for the modal
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseErrorModal = useCallback(() => {
    setShowErrorModal(false);
    setLocalErrorState(null);
  }, []);

  useEffect(() => {
    if (!managerId) {
      setJobs([]);
      onFetchSuccess([]);
      onLoading(false);
      onFetchError(null); // Still call with null when no manager is selected
      return;
    }

    const fetchJobs = async () => {
      setLoadingState(true);
      setLocalErrorState(null);
      onLoading(true);
      onFetchError(null); // Reset error when starting a new fetch

      try {
        const res = await api.get(`/jobs?managerId=${managerId}`);
        setJobs(res.data);
        onFetchSuccess(res.data);
      } catch (err: any) {
        console.error('Error fetching jobs:', err);
        const errorMessage = 'Failed to load jobs.';
        setLocalErrorState(errorMessage);
        setShowErrorModal(true);
        onFetchError(errorMessage); // Call the parent's callback with the error message
        setJobs([]);
      } finally {
        setLoadingState(false);
        onLoading(false);
      }
    };

    fetchJobs();
  }, [managerId, onFetchSuccess, onFetchError, onLoading, handleCloseErrorModal]); // Added handleCloseErrorModal to dependency array (though likely not strictly needed here)

  return (
    <div className="mt-4 relative">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Available Jobs</h3>
      {loadingState ? (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-50 z-10">
        {/* Loading spinner remains */}
        <svg
        className="animate-spin h-10 w-10 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        > 
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
        </svg>
      </div>
      ) : jobs.length > 0 ? (
      <select
        className="w-full border border-gray-300 rounded-md p-2"
        onChange={(e) => {
        const selectedJob = jobs.find((job) => job.id === e.target.value);
        onJobSelect(selectedJob || null);
        }}
      >
        <option value="" disabled>
        Select a job
        </option>
        {jobs.map((job) => (
        <option key={job.id} value={job.id}>
          {job.title}
        </option>
        ))}
      </select>
      ) : (
      !localErrorState && <p className="text-gray-500">No jobs available for the selected manager.</p>
      )}

      {showErrorModal && localErrorState && (
      <Modal
        title="Error Loading Jobs"
        message={localErrorState}
        onClose={handleCloseErrorModal}
      />
      )}
    </div>
  );
};

export default JobsClient;