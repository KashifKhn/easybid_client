"use server";

import axiosIn from "@/lib/axios";
import { CategoryResponse } from "@/types";

export const getCategories = async (): Promise<CategoryResponse[]> => {
  const { data } = await axiosIn.get<CategoryResponse[]>("/categories");
  return data;
};
