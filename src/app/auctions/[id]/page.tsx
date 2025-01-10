"use client";

import { GlobalErrorState } from "@/components/GlobalErrorState";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { use } from "react";
import { AuctionDetail } from "@/components/auction/AuctionDetail";
import TopBidCard from "@/components/bid/TopBidCard";
import { PlaceBidForm } from "@/components/bid/PlaceBidForm";
import { useAuctions } from "@/hooks/useAuctions";
import { useAuth } from "@/hooks/useAuth";

export default function AuctionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getAuction } = useAuctions();
  const { data: auction, isLoading, isError, error, refetch } = getAuction(id);
  const { user } = useAuth();
  if (isLoading)
    return <GlobalLoadingState message="Loading auction details..." />;
  if (isError)
    return (
      <GlobalErrorState
        title="Failed to fetch auction details"
        message={error?.message}
        onRetry={refetch}
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
          {auction.status === "ACTIVE" && user?.user.role === "BUYER" && (
            <div className="space-y-8">
              <PlaceBidForm
                auction={auction}
                userId={user?.user.id as string}
              />
            </div>
          )}

          {(auction.status === "COMPLETED" || auction.status === "ACTIVE") && (
            <div className="mt-16">
              <TopBidCard auctionId={auction.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
