"use client";

import { useRouter } from "next/navigation";
import { useAuctions } from "@/hooks/useAuctions";
import { CreateAuction, UpdateAuction } from "@/types";
import { AuctionForm } from "@/components/dashboard/AuctionForm";

export default function CreateAuctionPage() {
  const router = useRouter();
  const { createAuction, isCreating } = useAuctions();

  const handleCreateAuction = async (data: CreateAuction | UpdateAuction) => {
    try {
      const createData = data as CreateAuction;
      await createAuction(createData);
      router.push("/dashboard/seller/auctions");
    } catch (error) {
      console.error("Failed to create auction:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Auction</h1>
      <AuctionForm onSubmit={handleCreateAuction} isLoading={isCreating} />
    </div>
  );
}
