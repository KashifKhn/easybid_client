"use server";

import axiosIn from "@/lib/axios";
import { AuctionResponse, CreateAuction, UpdateAuction } from "@/types";
import axios from "axios";

export const getAllAuctions = async ({
  itemId,
  userId,
  buyerId,
  winner,
}: {
  itemId?: string;
  userId?: string;
  buyerId?: string;
  winner?: "false" | "true";
}): Promise<AuctionResponse[]> => {
  const params = new URLSearchParams();
  if (itemId) params.append("itemId", itemId);
  if (userId) params.append("userId", userId);
  if (buyerId) params.append("buyerId", buyerId);
  if (winner) params.append("winner", winner);

  const { data } = await axiosIn.get<AuctionResponse[]>("/auctions", {
    params,
  });
  return data;
};

export const getAuction = async (id: string): Promise<AuctionResponse> => {
  const { data } = await axiosIn.get<AuctionResponse>(`/auctions/${id}`);
  return data;
};

export const createAuction = async (
  auctionData: CreateAuction,
): Promise<AuctionResponse> => {
  try {
    console.log("end time ", auctionData.endTime);
    console.log("start time ", auctionData.startTime);
    const { data } = await axiosIn.post<AuctionResponse>(
      "/auctions",
      auctionData,
    );
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

export const updateAuction = async (
  id: string,
  auctionData: UpdateAuction,
): Promise<AuctionResponse> => {
  try {
    const { data } = await axiosIn.patch<AuctionResponse>(
      `/auctions/${id}`,
      auctionData,
    );
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

export const deleteAuction = async (id: string): Promise<void> => {
  const { data } = await axiosIn.delete<void>(`/auctions/${id}`);
  return data;
};
