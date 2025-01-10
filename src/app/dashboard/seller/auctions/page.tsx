"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuctions } from "@/hooks/useAuctions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { GlobalErrorState } from "@/components/GlobalErrorState";
import { AuctionList } from "@/components/dashboard/AuctionList";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardAuctionsPage() {
  const { getAuctions, deleteAuction } = useAuctions();
  const { user } = useAuth();
  const {
    data: auctions,
    isError,
    isLoading,
    error,
    refetch,
  } = getAuctions({ userId: user?.user.id });
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
        <Button asChild>
          <Link href="/dashboard/seller/auctions/create">
            <Plus className="mr-2 h-4 w-4" /> Create New Auction
          </Link>
        </Button>
      </div>
      <AuctionList
        auctions={auctions ? auctions : []}
        userRole="SELLER"
        onDelete={handleDeleteAuction}
        isDeleting={deletingId}
      />
    </div>
  );
}
