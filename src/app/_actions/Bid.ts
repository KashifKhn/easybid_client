"use server";

import axiosIn from "@/lib/axios";
import { BidResponse, placeBid } from "@/types";
import axios from "axios";

export const getBidByAuctions = async (
  auctionId: string,
): Promise<BidResponse[]> => {
  const { data } = await axiosIn.get<BidResponse[]>(
    `/bids?auctionId=${auctionId}`,
  );
  return data;
};

export const createBid = async (bidData: placeBid): Promise<BidResponse> => {
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
