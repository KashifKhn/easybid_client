"use client";

import { BidList } from "@/components/dashboard/BidList";
import { GlobalErrorState } from "@/components/GlobalErrorState";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { useAuth } from "@/hooks/useAuth";
import { useBid } from "@/hooks/useBid";
import React from "react";

const BidPage = () => {
  const { user } = useAuth();
  const { useBidQuery } = useBid();
  const {
    data: bids,
    isLoading,
    isError,
    error,
    refetch,
  } = useBidQuery({ userId: user?.user.id });

  if (isLoading) return <GlobalLoadingState message="Loading bids..." />;
  if (isError)
    return (
      <GlobalErrorState
        title="Failed to fetch bids"
        message={error?.message}
        onRetry={refetch}
      />
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Bids</h1>
      </div>
      <BidList bids={bids || []} />
    </div>
  );
};

export default BidPage;
