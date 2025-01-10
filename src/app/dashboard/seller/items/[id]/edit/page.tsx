"use client";

import { ItemForm } from "@/components/dashboard/ItemForm";
import { useItems } from "@/hooks/useItems";
import { ItemFormData } from "@/types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: itemId } = use(params);
  const router = useRouter();
  const { getItems, updateItem, isUpdating } = useItems();
  const { data: items } = getItems({});
  const [initialData, setInitialData] = useState<
    Partial<ItemFormData> | undefined
  >(undefined);

  console.log("item", items);

  useEffect(() => {
    const item = items?.find((item) => item.id === itemId);
    if (item) {
      setInitialData({
        name: item.name,
        description: item.description,
        startingBid: item.startingBid,
        buyNowPrice: item.buyNowPrice,
        categoryId: item.category.id,
        userId: item.user.id,
        files: [],
      });
    }
  }, [items, itemId]);

  const handleSubmit = async (data: ItemFormData) => {
    try {
      updateItem({ id: itemId, updateData: data });
      toast.success("your item has been successfully updated.", {
        position: "top-right",
      });
      router.push("/dashboard/seller/items");
    } catch (error) {
      console.log("edit item ", error);

      toast.error("Failed to update item. Please try again.", {
        position: "top-right",
      });
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Item</h1>
      <ItemForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/items")}
        isLoading={isUpdating}
      />
    </div>
  );
}
