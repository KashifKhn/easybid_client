"use client";

import { GlobalErrorState } from "@/components/GlobalErrorState";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { AuctionList } from "@/components/dashboard/AuctionList";
import { useAuctions } from "@/hooks/useAuctions";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardAuctionsPage() {
  const { getAuctions } = useAuctions();
  const { user } = useAuth();
  const {
    data: auctions,
    isError,
    isLoading,
    error,
    refetch,
  } = getAuctions({ buyerId: user?.user.id });

  if (isLoading) {
    return <GlobalLoadingState message="Loading auctions details..." />;
  }

  if (isError) {
    return (
      <GlobalErrorState
        title="Failed to fetch auctions"
        message={error?.message}
        onRetry={refetch}
      />
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Auctions</h1>
      </div>
      <AuctionList auctions={auctions ? auctions : []} userRole="BUYER" />
    </div>
  );
}
