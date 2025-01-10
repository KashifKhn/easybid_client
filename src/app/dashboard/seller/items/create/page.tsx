"use client";

import { useItems } from "@/hooks/useItems";
import { useRouter } from "next/navigation";
import { ItemForm } from "@/components/dashboard/ItemForm";
import { ItemFormData } from "@/types";
import toast from "react-hot-toast";

export default function CreateItemPage() {
  const router = useRouter();
  const { createItem, isCreating } = useItems();

  const handleSubmit = async (data: ItemFormData) => {
    try {
      await createItem(data);
      toast.success("Your item has been successfully created.", {
        position: "top-right",
      });
      router.push("/dashboard/seller/items");
    } catch (err) {
      console.log("createItem Error ", err);
      toast.error("Failed to create item. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Item</h1>
      <ItemForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/items")}
        isLoading={isCreating}
      />
    </div>
  );
}
