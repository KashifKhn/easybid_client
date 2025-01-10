import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BidResponse } from "@/types";
import { BidCard } from "./BidCard";

interface ItemListProps {
  bids: BidResponse[];
}

export function BidList({ bids }: ItemListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Auction Item Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Place time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bids.map((bid) => (
          <BidCard key={bid.id} bid={bid} />
        ))}
      </TableBody>
    </Table>
  );
}
