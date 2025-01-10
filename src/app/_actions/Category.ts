"use server";

import axiosIn from "@/lib/axios";
import { CategoryResponse, CreateCategory, UpdateCategory } from "@/types";
import axios from "axios";

export const getCategories = async ({
  isActive,
}: {
  isActive?: "true" | "false";
}): Promise<CategoryResponse[]> => {
  const params = new URLSearchParams();
  if (isActive) params.append("isActive", isActive);

  const { data } = await axiosIn.get<CategoryResponse[]>("/categories", {
    params,
  });
  return data;
};

export const getCategory = async (
  categoryId: string,
): Promise<CategoryResponse> => {
  const { data } = await axiosIn.get<CategoryResponse>(
    `/categories/${categoryId}`,
  );
  return data;
};

export const createCategory = async (
  category: CreateCategory,
): Promise<CategoryResponse> => {
  try {
    const { data } = await axiosIn.post<CategoryResponse>(
      "/categories",
      category,
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

export const updateCategory = async (
  categoryId: string,
  category: UpdateCategory,
): Promise<CategoryResponse> => {
  try {
    const { data } = await axiosIn.patch<CategoryResponse>(
      `categories/${categoryId}`,
      category,
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
