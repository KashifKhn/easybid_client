import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuctionResponse, CreateAuction, UpdateAuction } from "@/types";
import {
  createAuction,
  deleteAuction,
  getAllAuctions,
  getAuction,
  updateAuction,
} from "@/app/_actions/Auction";

export const useAuctions = () => {
  const queryClient = useQueryClient();

  const useAuctionsQuery = ({
    itemId,
    userId,
    buyerId,
    winner,
  }: {
    itemId?: string;
    userId?: string;
    buyerId?: string;
    winner?: "false" | "true";
  }) =>
    useQuery<AuctionResponse[], Error>({
      queryKey: ["auctions", { itemId, userId, buyerId, winner }],
      queryFn: () => getAllAuctions({ itemId, userId, buyerId, winner }),
      refetchInterval: 6000,
      staleTime: 0,
    });

  const useAuctionQuery = (id: string) =>
    useQuery<AuctionResponse, Error>({
      queryKey: ["auction", id],
      queryFn: () => getAuction(id),
      refetchInterval: 6000,
      staleTime: 0,
    });

  const createAuctionMutation = useMutation<
    AuctionResponse,
    Error,
    CreateAuction
  >({
    mutationFn: createAuction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const updateAuctionMutation = useMutation<
    AuctionResponse,
    Error,
    { id: string; data: UpdateAuction }
  >({
    mutationFn: ({ id, data }) => updateAuction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
    },
  });

  const deleteAuctionMutation = useMutation<void, Error, string>({
    mutationFn: deleteAuction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
    },
  });

  return {
    getAuctions: useAuctionsQuery,
    getAuction: useAuctionQuery,
    createAuction: createAuctionMutation.mutateAsync,
    updateAuction: updateAuctionMutation.mutateAsync,
    deleteAuction: deleteAuctionMutation.mutateAsync,
    isCreating: createAuctionMutation.isPending,
    isUpdating: updateAuctionMutation.isPending,
    isDeleting: deleteAuctionMutation.isPending,
  };
};
