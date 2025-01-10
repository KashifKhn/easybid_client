import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalLoadingState } from "../GlobalLoadingState";
import { GlobalErrorState } from "../GlobalErrorState";
import { useBid } from "@/hooks/useBid";
import { useAuctions } from "@/hooks/useAuctions";

const TopBidCard = ({ auctionId }: { auctionId: string }) => {
  const { useBidQuery } = useBid();
  const {
    data: bids,
    isLoading,
    isError,
    error,
    refetch,
  } = useBidQuery({ auctionId });

  const { getAuction } = useAuctions();
  const { data: auction } = getAuction(auctionId);

  return (
    <Card>
      <CardHeader>
        {auction?.status === "ACTIVE" && <CardTitle>Top 10 Bids</CardTitle>}
        {auction?.status === "COMPLETED" && (
          <CardTitle>
            Winner{" "}
            <span className="font-bold text-xl text-green-800">
              {auction.highestBid.user.name}
            </span>
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {isLoading && (
          <GlobalLoadingState
            isFullScreen={false}
            message="Loading bid details..."
          />
        )}

        {isError && (
          <GlobalErrorState
            title="Failed to fetch Bids"
            message={error?.message || "An error occurred."}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && bids?.length ? (
          <ul className="space-y-2">
            {bids.slice(0, 10).map((bid, index) => (
              <li key={bid.id} className="flex justify-between items-center">
                <p className="flex gap-2">
                  <span>{index + 1}</span>
                  <span>{bid.user.name}</span>
                </p>
                <span className="font-semibold">${bid.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          !isLoading &&
          !isError && (
            <p className="text-sm text-gray-500">No bids available.</p>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default TopBidCard;
