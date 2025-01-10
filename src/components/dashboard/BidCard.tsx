import { TableCell, TableRow } from "@/components/ui/table";
import { useAuctions } from "@/hooks/useAuctions";
import { BidResponse } from "@/types";

interface ItemListProps {
  bid: BidResponse;
}

export function BidCard({ bid }: ItemListProps) {
  console.log("bis ", bid);

  const { getAuction } = useAuctions();
  const { data: auction } = getAuction(bid.auction.id);
  return (
    <TableRow key={bid?.id}>
      <TableCell>{auction?.item?.name || "item were Deleted"}</TableCell>
      <TableCell>${bid?.amount}</TableCell>
      <TableCell>{new Date(bid.createdAt).toLocaleString()}</TableCell>
    </TableRow>
  );
}
