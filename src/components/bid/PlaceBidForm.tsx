"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuctionResponse, BidResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { createBid } from "@/app/_actions/Bid";

interface BidFormProps {
  auction: AuctionResponse;
  userId: string;
}

export const PlaceBidForm: React.FC<BidFormProps> = ({ auction, userId }) => {
  const [bidAmount, setBidAmount] = useState("");
  const queryClient = useQueryClient();

  const bidMutation = useMutation<
    BidResponse,
    Error,
    { userId: string; auctionId: string; amount: number }
  >({
    mutationFn: createBid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auction", auction.id] });
      queryClient.invalidateQueries({ queryKey: ["bid", auction.id] });
      toast.success("Your bid has been placed successfully!", {
        position: "top-right",
      });
      setBidAmount("");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to place bid.", {
        position: "top-right",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bidValue = parseFloat(bidAmount);
    if (
      auction.type === "FREE" &&
      (isNaN(bidValue) || bidValue <= calculateMinBid())
    ) {
      toast.error("Please enter a valid bid amount.", {
        position: "top-right",
      });
      return;
    }

    bidMutation.mutate({
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
              disabled={bidMutation.isPending || auction.type === "FIXED"}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={bidMutation.isPending}
          >
            {bidMutation.isPending ? "Placing Bid..." : "Place Bid"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
