'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IdentityType } from '@/lib/types';

interface CreateIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateIdentityFormValues) => void;
}

const createIdentitySchema = z.object({
  type: z.enum(['Domain', 'Email']),
  value: z.string().min(1, 'Identity value is required'),
});

export type CreateIdentityFormValues = z.infer<typeof createIdentitySchema>;

export default function CreateIdentityModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateIdentityModalProps) {
  const form = useForm<CreateIdentityFormValues>({
    resolver: zodResolver(createIdentitySchema),
    defaultValues: {
      type: 'Domain',
      value: '',
    },
  });

  const handleSubmit = (data: CreateIdentityFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Identity</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identity Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select identity type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Domain">Domain</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identity Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        form.watch('type') === 'Domain' 
                          ? 'example.com' 
                          : 'email@example.com'
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Create Identity
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
