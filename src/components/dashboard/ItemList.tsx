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
import { ItemResponse } from "@/types";
import { Loader2 } from "lucide-react";

interface ItemListProps {
  items: ItemResponse[];
  onDelete?: (id: string) => void;
  isDeleting?: string | null;
  userRole: "ADMIN" | "BUYER" | "SELLER";
}

export function ItemList({
  items,
  onDelete,
  isDeleting,
  userRole,
}: ItemListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Starting Bid</TableHead>
          <TableHead>Buy Now Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>${item.startingBid}</TableCell>
            <TableCell>${item.buyNowPrice}</TableCell>
            <TableCell>{item.category.name}</TableCell>
            {userRole !== "BUYER" && (
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link href={`/dashboard/seller/items/${item.id}/edit`}>
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onDelete?.(item.id)}
                  disabled={isDeleting === item.id}
                >
                  {isDeleting === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
