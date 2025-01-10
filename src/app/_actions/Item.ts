"use server";

import axiosIn from "@/lib/axios";
import { CreateItem, ItemResponse, UpdateItem } from "@/types";
import axios from "axios";

export const getItems = async ({
  auctioned,
  userId,
}: {
  auctioned?: "true" | "false";
  userId?: string;
}): Promise<ItemResponse[]> => {
  const params = new URLSearchParams();
  if (auctioned) params.append("auctioned", auctioned);
  if (userId) params.append("userId", userId);
  const { data } = await axiosIn.get<ItemResponse[]>("/items", {
    params,
  });
  return data;
};

export const getItem = async (id: string): Promise<ItemResponse> => {
  const { data } = await axiosIn.get<ItemResponse>(`/items/${id}`);
  return data;
};

export const createItem = async (
  itemData: CreateItem & { files?: File[] },
): Promise<ItemResponse> => {
  try {
    const formData = new FormData();

    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    formData.append("startingBid", itemData.startingBid.toString());
    formData.append("buyNowPrice", itemData.buyNowPrice.toString());
    formData.append("userId", itemData.userId);
    formData.append("categoryId", itemData.categoryId);

    if (itemData.files) {
      itemData.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    const { data } = await axiosIn.post<ItemResponse>("/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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

export const updateItem = async (
  id: string,
  updateData: Partial<UpdateItem> & { files?: File[] },
): Promise<ItemResponse> => {
  try {
    const formData = new FormData();

    if (updateData.name) formData.append("name", updateData.name);
    if (updateData.description)
      formData.append("description", updateData.description);
    if (updateData.startingBid !== undefined) {
      formData.append("startingBid", updateData.startingBid.toString());
    }
    if (updateData.buyNowPrice !== undefined) {
      formData.append("buyNowPrice", updateData.buyNowPrice.toString());
    }
    if (updateData.categoryId)
      formData.append("categoryId", updateData.categoryId);

    if (updateData.files) {
      updateData.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    }

    const { data } = await axiosIn.patch<ItemResponse>(
      `/items/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
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
      throw new Error("An unexpected error occurred while updating the bid.");
    }
  }
};

export const deleteItem = async (itemId: string): Promise<void> => {
  try {
    await axiosIn.delete(`/items/${itemId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      const statusCode = error.response?.status;
      throw new Error(`Error ${statusCode}: ${errorMessage}`);
    } else {
      throw new Error("An unexpected error occurred while updating the bid.");
    }
  }
};
