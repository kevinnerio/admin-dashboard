'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { insertCustomers } from '../actions';

export function AddClientModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await insertCustomers(formData);
            setOpen(false); // Close modal after success
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Client Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <input
            type="phone_number"
            name="primary_phone_number"
            placeholder="(123)456-7890"
            className="border p-2 rounded"
            required
          />
          <input
            type="notes"
            name="notes"
            placeholder="Add some notes here."
            className="border p-2 rounded"
            required
          />
          <input
            type="current_address"
            name="current_address"
            placeholder="123 Current Address St., City, State, Zip"
            className="border p-2 rounded"
            required
          />
          <select
            name="status"
            defaultValue="active"
            className="border p-2 rounded"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
