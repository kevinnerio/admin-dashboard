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
      <TableCell className="font-medium">{clients.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {clients.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {clients.createdAt.toLocaleDateString("en-US")}
      </TableCell>
        <TableCell>
          <Badge variant="outline" className="capitalize">
            {clients.email}
          </Badge>
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
