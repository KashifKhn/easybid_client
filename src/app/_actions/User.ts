import axiosIn from "@/lib/axios";
import { UpdateUser, UserResponse } from "@/types";
import axios from "axios";

export const getAllUsers = async (): Promise<UserResponse[]> => {
  const { data } = await axiosIn.get<UserResponse[]>("/users");
  return data;
};

export const getUserById = async (userId: string): Promise<UserResponse> => {
  const { data } = await axiosIn.get<UserResponse>(`/users/${userId}`);
  return data;
};

export const updateUserFn = async (
  userId: string,
  updateUserData: UpdateUser,
): Promise<UserResponse> => {
  console.log("user", updateUserData);
  try {
    const { data } = await axiosIn.put(`/users/${userId}`, updateUserData);

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

export const deleteUserFn = async (userId: string): Promise<void> => {
  try {
    await axiosIn.delete<UserResponse>(`/users/${userId}`);
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
