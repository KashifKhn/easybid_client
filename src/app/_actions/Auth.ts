"use server";

import axiosIn from "@/lib/axios";
import { AuthResponse, Login, Register } from "@/types";
import axios from "axios";

export const registerFn = async (data: Register): Promise<AuthResponse> => {
  try {
    const res = await axiosIn.post<AuthResponse>("/auth/register", data);
    return res.data;
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

export const loginFn = async (data: Login): Promise<AuthResponse> => {
  try {
    const res = await axiosIn.post<AuthResponse>("/auth/login", data);
    return res.data;
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
