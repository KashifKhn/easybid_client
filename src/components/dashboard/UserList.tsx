import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserResponse } from "@/types";
import { Loader2 } from "lucide-react";

interface UserListProps {
  users: UserResponse[];
  onDelete?: (id: string) => void;
  isDeleting?: string | null;
}

export function UserList({ users, onDelete, isDeleting }: UserListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Join At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => onDelete?.(user.id)}
                disabled={isDeleting === user.id}
              >
                {isDeleting === user.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
