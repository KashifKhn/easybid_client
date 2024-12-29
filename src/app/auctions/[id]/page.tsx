"use client";

import { getAuction } from "@/app/_actions/Auction";
import { GlobalErrorState } from "@/components/GlobalErrorState";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { AuctionResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuctionDetail } from "@/components/auction/AuctionDetail";
import TopBidCard from "@/components/bid/TopBidCard";
import { PlaceBidForm } from "@/components/bid/PlaceBidForm";

export default function AuctionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    data: auction,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<AuctionResponse, Error>({
    queryKey: ["auction", id],
    queryFn: () => getAuction(id),
  });

  if (isLoading)
    return <GlobalLoadingState message="Loading auction details..." />;
  if (isError)
    return (
      <GlobalErrorState
        title="Failed to fetch auction details"
        message={error?.message}
        onRetry={() => refetch()}
      />
    );

  if (!auction)
    return (
      <GlobalErrorState
        title="Auction not found"
        message="The requested auction could not be found."
      />
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <AuctionDetail auction={auction} />
        </div>
        <div>
          <div className="space-y-8">
            <PlaceBidForm
              auction={auction}
              userId={"522613bf-1f8f-4fb6-9026-c8c49257f808"}
            />
          </div>
          <div className="mt-16">
            <TopBidCard auctionId={auction.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
