"use client";

import React, { useState } from "react";
import { AuctionResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { useBid } from "@/hooks/useBid";

interface BidFormProps {
  auction: AuctionResponse;
  userId: string;
}

export const PlaceBidForm: React.FC<BidFormProps> = ({ auction, userId }) => {
  const [bidAmount, setBidAmount] = useState("");

  const { usePlaceBid } = useBid();
  const { mutateAsync, isPending } = usePlaceBid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bidValue = parseFloat(bidAmount);
    if (
      auction.type === "FREE" &&
      (isNaN(bidValue) || bidValue <= calculateMinBid())
    ) {
      toast.error("Please enter a valid bid amount.", {
        position: "top-left",
      });
      return;
    }

    await mutateAsync({
      userId,
      auctionId: auction.id,
      amount: bidValue,
    });
  };

  const calculateMinBid = () => {
    let currentBid: number;

    if (auction.highestBid === null) {
      currentBid = auction.item.startingBid;
    } else {
      currentBid = auction.highestBid.amount;
    }

    if (auction.incrementType === "AMOUNT") {
      return currentBid + auction.incrementAmount;
    }

    if (auction.incrementType === "PERCENTAGE") {
      return currentBid * (1 + auction.incrementPercentage / 100);
    }

    return currentBid;
  };

  const minBid = calculateMinBid();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Your Bid</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bid-amount">Your Bid</Label>
            <Input
              id="bid-amount"
              type="number"
              value={bidAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setBidAmount(value);
                }
              }}
              placeholder={`Minimum bid: $${minBid.toFixed(2)}`}
              min={minBid}
              step="any"
              required={auction.type === "FREE"}
              disabled={isPending || auction.type === "FIXED"}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Placing Bid..." : "Place Bid"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
