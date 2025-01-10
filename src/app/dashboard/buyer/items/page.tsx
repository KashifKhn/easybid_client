"use client";

import { ItemList } from "@/components/dashboard/ItemList";
import { GlobalErrorState } from "@/components/GlobalErrorState";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { useAuctions } from "@/hooks/useAuctions";
import { useAuth } from "@/hooks/useAuth";

export default function ItemsPage() {
  const { getAuctions } = useAuctions();
  const { user } = useAuth();
  const {
    data: auctions,
    isError,
    isLoading,
    error,
    refetch,
  } = getAuctions({ buyerId: user?.user.id, winner: "true" });

  const items = auctions?.map((auction) => auction.item);

  if (isLoading)
    return <GlobalLoadingState message="Loading items details..." />;
  if (isError)
    return (
      <GlobalErrorState
        title="Failed to fetch items"
        message={error?.message}
        onRetry={refetch}
      />
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Items</h1>
      </div>
      <ItemList items={items || []} userRole="BUYER" />
    </div>
  );
}
