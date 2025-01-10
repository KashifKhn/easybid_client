import { AuctionResponse } from "@/types";
import { AuctionCard } from "../auction/AuctionCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface AuctionSectionProps {
  title: string;
  auctions: AuctionResponse[];
}

export const AuctionSection: React.FC<AuctionSectionProps> = ({
  title,
  auctions,
}) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 ">
          <h2 className="text-3xl font-bold mb-8">{title}</h2>
          <Button variant={"link"}>
            <Link
              href="/auctions/"
              className="flex gap-2 text-center items-center justify-center"
            >
              Explore All Auctions <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions
            .slice(0, 3)
            ?.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
        </div>
      </div>
    </section>
  );
};
