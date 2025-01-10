import { AuctionResponse } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface AuctionListProps {
  auctions: AuctionResponse[];
  onDelete?: (id: string) => void;
  isDeleting?: string | null;
  userRole: "ADMIN" | "BUYER" | "SELLER";
}

export function AuctionList({
  auctions,
  onDelete,
  isDeleting,
  userRole,
}: AuctionListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Status</TableHead>

          {userRole !== "BUYER" && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {auctions.map((auction) => (
          <TableRow key={auction.id}>
            <TableCell>{auction.item.name}</TableCell>
            <TableCell>
              {new Date(auction.startTime).toLocaleString()}
            </TableCell>
            <TableCell>{new Date(auction.endTime).toLocaleString()}</TableCell>
            <TableCell>
              <Badge
                variant={auction.status === "ACTIVE" ? "default" : "secondary"}
              >
                {auction.status}
              </Badge>
            </TableCell>
            {userRole !== "BUYER" && (
              <TableCell>
                {(auction.status === "PENDING" ||
                  auction.status === "ACTIVE") && (
                  <Button asChild variant="outline" className="mr-2">
                    <Link
                      href={`/dashboard/seller/auctions/${auction.id}/edit`}
                    >
                      Edit
                    </Link>
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => onDelete?.(auction.id)}
                  disabled={isDeleting === auction.id}
                >
                  {isDeleting === auction.id ? (
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
