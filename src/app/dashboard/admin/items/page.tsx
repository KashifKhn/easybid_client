"use client";

import { ItemList } from "@/components/dashboard/ItemList";
import { GlobalErrorState } from "@/components/GlobalErrorState";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { useItems } from "@/hooks/useItems";

export default function ItemsPage() {
  const { getItems } = useItems();
  const { data: items, isLoading, isError, error, refetch } = getItems({});

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
      <ItemList items={items ? items : []} userRole="ADMIN" />
    </div>
  );
}
