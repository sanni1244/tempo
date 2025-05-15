import { useEffect } from 'react';
import {api} from '@/app/lib/api';
import { Form } from '@/types';
 
interface FetchFormsProps {
  jobId: string;
  managerId: string;
  onFetchSuccess: (forms: Form[]) => void;
  onFetchError: (error: string) => void;
  onLoading: (loading: boolean) => void;
}

const FetchForms: React.FC<FetchFormsProps> = ({
  jobId,
  managerId,
  onFetchSuccess,
  onFetchError,
  onLoading,
}) => {
  useEffect(() => {
    if (!jobId || !managerId) return;

    const fetchForms = async () => {
      onLoading(true);
      onFetchError('');

      try {
        const res = await api.get(`/forms?jobId=${jobId}&managerId=${managerId}`);
        onFetchSuccess(res.data);
      } catch (err: any) {
        console.error('Error fetching forms:', err);
        onFetchError('Failed to load forms.');
      } finally {
        onLoading(false);
      }
    };

    fetchForms();
  }, [jobId, managerId, onFetchSuccess, onFetchError, onLoading]);

  return null; // Return null to indicate no rendering in this component
};

export default FetchForms;