import { useEffect } from 'react';
import {api} from '@/app/lib/api';
import { Template } from '@/types';

interface FetchTemplatesProps {
  managerId: string;
  onFetchSuccess: (templates: Template[]) => void;
  onFetchError: (error: string) => void;
  onLoading: (loading: boolean) => void;
}

const FetchTemplates: React.FC<FetchTemplatesProps> = ({
  managerId,
  onFetchSuccess,
  onFetchError,
  onLoading,
}) => {
  useEffect(() => {
    if (!managerId) return;

    const fetchTemplates = async () => {
      onLoading(true);
      onFetchError('');

      try {
        const res = await api.get(`/form-templates?managerId=${managerId}`);
        onFetchSuccess(res.data); // Assuming response directly contains array of templates
      } catch (err: any) {
        console.error('Error fetching templates:', err);
        onFetchError('Failed to load templates.');
      } finally {
        onLoading(false);
      }
    };

    fetchTemplates();
  }, [managerId, onFetchSuccess, onFetchError, onLoading]);

  return null; // This component does not render anything itself
};

export default FetchTemplates;

