"use client";

import { GlobalErrorState } from "@/components/GlobalErrorState";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { AuctionList } from "@/components/dashboard/AuctionList";
import { useAuctions } from "@/hooks/useAuctions";
import { useState } from "react";

export default function DashboardAuctionsPage() {
  const { getAuctions, deleteAuction } = useAuctions();
  const {
    data: auctions,
    isError,
    isLoading,
    error,
    refetch,
  } = getAuctions({});
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteAuction = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteAuction(id);
    } finally {
      setDeletingId(null);
    }
  };

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
      <AuctionList
        auctions={auctions ? auctions : []}
        onDelete={handleDeleteAuction}
        isDeleting={deletingId}
      />
    </div>
  );
}
