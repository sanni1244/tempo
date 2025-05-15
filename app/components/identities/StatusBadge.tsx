import { cn } from '@/lib/utils';
import { IdentityStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: IdentityStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        status === 'Successful' && 'bg-green-100 text-green-800',
        status === 'Pending' && 'bg-yellow-100 text-yellow-800',
        status === 'Failed' && 'bg-red-100 text-red-800'
      )}
    >
      {status}
    </span>
  );
}
