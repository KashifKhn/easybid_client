import { AuctionResponse } from "@/types";
import { AuctionCard } from "./AuctionCard";

interface AuctionGridProps {
  auctions: AuctionResponse[];
}

export function AuctionGrid({ auctions }: AuctionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
}
