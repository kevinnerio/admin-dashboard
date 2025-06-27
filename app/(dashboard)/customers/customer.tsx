import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectCustomers } from '@/lib/db';
import { deleteCustomers } from '../actions';

export function Customers({ customers }: { customers: SelectCustomers }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{customers.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {customers.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {customers.createdAt.toLocaleDateString("en-US")}
      </TableCell>
        <TableCell>
          <Badge variant="outline" className="capitalize">
            {customers.email}
          </Badge>
        </TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteCustomers}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </TableRow>
  );
}
