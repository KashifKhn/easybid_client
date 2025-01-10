"use client";

import { GlobalErrorState } from "@/components/GlobalErrorState";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { ItemDetail } from "@/components/item/ItemDetails";
import { useAuctions } from "@/hooks/useAuctions";
import { useItems } from "@/hooks/useItems";
import { use } from "react";

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { getItem } = useItems();
  const { data: item, isLoading, isError, error, refetch } = getItem(id);
  const { getAuctions } = useAuctions();
  const { data: auctions, isLoading: auctionsLoading } = getAuctions({
    itemId: id,
  });

  if (isLoading || auctionsLoading) {
    return <GlobalLoadingState message="Loading Item details..." />;
  }
  if (isError) {
    return (
      <GlobalErrorState
        title="Failed to fetch Item details"
        message={error?.message}
        onRetry={() => refetch()}
      />
    );
  }

  if (!item || !auctions) {
    return (
      <GlobalErrorState
        title="Item not found"
        message="The requested Item could not be found."
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ItemDetail item={item} auctions={auctions} />
    </div>
  );
}
