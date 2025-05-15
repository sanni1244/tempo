'use client';

import { useState } from 'react';
import { Identity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StatusBadge from './StatusBadge';
import { Eye } from 'lucide-react';

interface IdentitiesTableProps {
  identities: Identity[];
  onViewIdentity: (identity: Identity) => void;
}

export default function IdentitiesTable({
  identities,
  onViewIdentity,
}: IdentitiesTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Identity>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof Identity) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedIdentities = [...identities].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIndicator = (column: keyof Identity) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="rounded-lg border bg-white shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="w-16 cursor-pointer"
              onClick={() => handleSort('id')}
            >
              ID{getSortIndicator('id')}
            </TableHead>
            
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('type')}
            >
              Identity Type{getSortIndicator('type')}
            </TableHead>
            
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('value')}
            >
              Identity{getSortIndicator('value')}
            </TableHead>
            
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Verification Status{getSortIndicator('status')}
            </TableHead>
            
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('dateCreated')}
            >
              Date Created{getSortIndicator('dateCreated')}
            </TableHead>
            
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {sortedIdentities.map((identity) => (
            <TableRow key={identity.id} className="hover:bg-muted/50">
              <TableCell>{identity.id}</TableCell>
              <TableCell>{identity.type}</TableCell>
              <TableCell className="font-medium">{identity.value}</TableCell>
              <TableCell>
                <StatusBadge status={identity.status} />
              </TableCell>
              <TableCell>{identity.dateCreated}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewIdentity(identity)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
