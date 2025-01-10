"use client";

import { useRouter } from "next/navigation";
import { useAuctions } from "@/hooks/useAuctions";
import { UpdateAuction } from "@/types";
import { Loader2 } from "lucide-react";
import { AuctionForm } from "@/components/dashboard/AuctionForm";

export default function EditAuctionPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { getAuction, updateAuction, isUpdating } = useAuctions();
  const { data: auction, isLoading, isError, error } = getAuction(params.id);

  const handleUpdateAuction = async (data: UpdateAuction) => {
    try {
      await updateAuction({ id: params.id, data });
      router.push("/dashboard/seller/auctions");
    } catch (error) {
      console.error("Failed to update auction:", error);
    }
  };

  if (isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Auction</h1>
      <AuctionForm
        initialData={auction}
        onSubmit={handleUpdateAuction}
        isLoading={isUpdating}
      />
    </div>
  );
}
