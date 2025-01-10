import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryResponse } from "@/types";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryListProps {
  categories: CategoryResponse[];
  onDelete?: (id: string) => void;
  isDeleting?: string | null;
  userRole: "ADMIN" | "BUYER" | "SELLER";
}

export function CategoryList({
  categories,
  onDelete,
  isDeleting,
  userRole,
}: CategoryListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>
              <Badge variant={category.isActive ? "default" : "secondary"}>
                {category.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {userRole === "ADMIN" && (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link
                        href={`/dashboard/admin/categories/${category.id}/edit`}
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete?.(category.id)}
                      disabled={isDeleting === category.id}
                    >
                      {isDeleting === category.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
