import { getBidsFn, placeBidFn } from "@/app/_actions/Bid";
import { BidResponse, PlaceBid } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBid = () => {
  const queryClient = useQueryClient();
  const useBidQuery = ({
    auctionId,
    userId,
  }: {
    auctionId?: string;
    userId?: string;
  }) =>
    useQuery<BidResponse[], Error>({
      queryKey: ["bids"],
      queryFn: () => getBidsFn({ auctionId, userId }),
      staleTime: 0,
    });

  const usePlaceBid = useMutation<BidResponse, Error, PlaceBid>({
    mutationFn: placeBidFn,
    onSuccess: (_data, variables) => {
      const { auctionId } = variables;
      queryClient.invalidateQueries({
        queryKey: ["bids"],
      });
      queryClient.invalidateQueries({
        queryKey: ["auctions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["auction", auctionId],
      });
    },
  });

  return {
    useBidQuery,
    usePlaceBid,
  };
};
