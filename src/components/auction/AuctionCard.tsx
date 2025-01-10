import { AuctionResponse } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface AuctionCardProps {
  auction: AuctionResponse;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
  const { item, startTime, endTime, status } = auction;

  return (
    <Card className="relative">
      {status !== "CANCELED" && (
        <Badge className="absolute top-2 right-2 z-10">{status}</Badge>
      )}
      {status === "CANCELED" && (
        <Badge className="absolute bg-destructive top-2 right-2 z-10">
          {status}
        </Badge>
      )}
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-4">
          <Image
            src={item.images[0]?.url || "/placeholder.png"}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <p className="text-sm mb-2">{item.description}</p>
        <p className="font-semibold">Starting Bid: ${item.startingBid}</p>
        {status === "ACTIVE" && auction.highestBid && (
          <p className="text-sm">Current Bid: ${auction.highestBid.amount}</p>
        )}
        {status === "COMPLETED" && auction.highestBid && (
          <>
            <p className="text-sm">Wining Bid: ${auction.highestBid.amount}</p>
            <p className="text-sm">Winner: {auction.highestBid.user.name}</p>
          </>
        )}
        <p className="text-sm">
          {status === "ACTIVE"
            ? `Ends: ${new Date(endTime).toLocaleString()}`
            : `Started: ${new Date(startTime).toLocaleString()}`}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/auctions/${auction.id}`}>
            {status === "ACTIVE" ? "Place Bid" : "View Details"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
