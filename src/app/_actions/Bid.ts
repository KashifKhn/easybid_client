"use server";

import axiosIn from "@/lib/axios";
import { BidResponse, PlaceBid } from "@/types";
import axios from "axios";

export const getBidsFn = async ({
  auctionId,
  userId,
}: {
  auctionId?: string;
  userId?: string;
}): Promise<BidResponse[]> => {
  const params = new URLSearchParams();
  if (auctionId) params.append("auctionId", auctionId);
  if (userId) params.append("userId", userId);

  const { data } = await axiosIn.get<BidResponse[]>(`/bids`, {
    params,
  });
  return data;
};

export const placeBidFn = async (bidData: PlaceBid): Promise<BidResponse> => {
  try {
    const { data } = await axiosIn.post<BidResponse>("/bids", bidData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      const statusCode = error.response?.status;
      throw new Error(`Error ${statusCode}: ${errorMessage}`);
    } else {
      throw new Error("An unexpected error occurred while placing the bid.");
    }
  }
};
