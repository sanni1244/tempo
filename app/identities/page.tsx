'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import IdentitiesTable from '@/components/identities/IdentitiesTable';
import CreateIdentityModal, { CreateIdentityFormValues } from '@/components/identities/CreateIdentityModal';
import ViewIdentityModal from '@/components/identities/ViewIdentityModal';
import { mockIdentities } from '@/lib/data';
import { Identity, IdentityStatus } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function IdentitiesPage() {
  const router = useRouter();
  const [identities, setIdentities] = useState<Identity[]>(mockIdentities);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<IdentityStatus | 'All'>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const handleCreateIdentity = (data: CreateIdentityFormValues) => {
    const newIdentity: Identity = {
      id: identities.length + 1,
      type: data.type,
      value: data.value,
      status: 'Pending',
      dateCreated: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    
    setIdentities([...identities, newIdentity]);
    setIsCreateModalOpen(false);
  };
  
  const handleViewIdentity = (identity: Identity) => {
    setSelectedIdentity(identity);
    setIsViewModalOpen(true);
  };
  
  const filteredIdentities = identities.filter((identity) => {
    const matchesSearch = identity.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || identity.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout 
      title="Identities" 
      onCreateClick={() => setIsCreateModalOpen(true)}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex w-full max-w-sm items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search identities..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value as IdentityStatus | 'All')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Successful">Successful</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="sm:hidden"
          >
            Create Identity
          </Button>
        </div>
      </div>
      
      <IdentitiesTable
        identities={filteredIdentities}
        onViewIdentity={handleViewIdentity}
      />
      
      <CreateIdentityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateIdentity}
      />
      
      <ViewIdentityModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        identity={selectedIdentity}
      />
    </MainLayout>
  );
}
