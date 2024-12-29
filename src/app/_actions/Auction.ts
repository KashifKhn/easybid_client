"use server";

import axiosIn from "@/lib/axios";
import { AuctionResponse } from "@/types";

export const getAllAuctions = async (): Promise<AuctionResponse[]> => {
  const { data } = await axiosIn.get<AuctionResponse[]>("/auctions");
  return data;
};

export const getAuction = async (id: string): Promise<AuctionResponse> => {
  const { data } = await axiosIn.get<AuctionResponse>(`/auctions/${id}`);
  return data;
};
