"use client";

import { useItems } from "@/hooks/useItems";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ItemList } from "@/components/dashboard/ItemList";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { GlobalErrorState } from "@/components/GlobalErrorState";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function ItemsPage() {
  const { getItems, deleteItem } = useItems();
  const { user } = useAuth();
  const {
    data: items,
    isLoading,
    isError,
    error,
    refetch,
  } = getItems({ userId: user?.user.id });
  const { mutateAsync } = deleteItem;

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteItem = async (id: string) => {
    setDeletingId(id);
    try {
      await mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

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
        <Button asChild>
          <Link href="/dashboard/seller/items/create">Add New Item</Link>
        </Button>
      </div>
      <ItemList
        items={items ? items : []}
        isDeleting={deletingId}
        onDelete={handleDeleteItem}
        userRole="SELLER"
      />
    </div>
  );
}
