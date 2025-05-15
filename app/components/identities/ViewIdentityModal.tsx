'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Identity } from '@/lib/types';
import StatusBadge from './StatusBadge';
import { ClipboardCopy } from 'lucide-react';

interface ViewIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  identity: Identity | null;
}

export default function ViewIdentityModal({
  isOpen,
  onClose,
  identity,
}: ViewIdentityModalProps) {
  if (!identity) return null;

  const handleCopyValue = () => {
    if (identity) {
      navigator.clipboard.writeText(identity.value);
    }
  };

  const renderVerificationDetails = () => {
    if (identity.type === 'Domain') {
      return (
        <div className="mt-4 space-y-2 rounded-md bg-gray-50 p-3 text-sm">
          <p className="font-medium">DNS Verification:</p>
          <div className="flex items-center justify-between rounded-sm bg-gray-100 p-2 font-mono text-xs">
            <code>TXT _example-verify.{identity.value}</code>
            <Button variant="ghost" size="sm" onClick={handleCopyValue}>
              <ClipboardCopy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    } else if (identity.type === 'Email') {
      return (
        <div className="mt-4 space-y-2 rounded-md bg-gray-50 p-3 text-sm">
          <p className="font-medium">Email Verification:</p>
          <p>A verification email has been sent to {identity.value}</p>
          <Button variant="outline" size="sm" className="mt-2">
            Resend Verification
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Identity Details</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Identity Type</p>
              <p className="font-medium">{identity.type}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <StatusBadge status={identity.status} />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Date Created</p>
              <p className="font-medium">{identity.dateCreated}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ID</p>
              <p className="font-medium">{identity.id}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Identity Value</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="break-all font-medium">{identity.value}</p>
              <Button variant="ghost" size="sm" onClick={handleCopyValue}>
                <ClipboardCopy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {renderVerificationDetails()}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
