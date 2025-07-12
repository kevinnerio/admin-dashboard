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
import { SelectClients } from '@/lib/db';
import { deleteClients } from '../actions';

export function Clients({ clients }: { clients: SelectClients }) {
  return (
    <TableRow>
      <TableCell className="font-small">{clients.name}</TableCell>
      <TableCell className="font-small">{clients.email}</TableCell>
      <TableCell className="font-small">{clients.primary_phone_number}</TableCell>
      <TableCell className="font-small">{clients.notes}</TableCell>
      <TableCell className="font-small">{clients.current_address}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {clients.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {clients.createdAt.toLocaleDateString("en-US")}
      </TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteClients}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </TableRow>
  );
}
