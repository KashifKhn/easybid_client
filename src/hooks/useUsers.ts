import {
  deleteUserFn,
  getAllUsers,
  getUserById,
  updateUserFn,
} from "@/app/_actions/User";
import { UpdateUser, UserResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUsers = () => {
  const queryClient = useQueryClient();
  const usersQuery = useQuery<UserResponse[], Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const useUserQuery = (userId: string) =>
    useQuery<UserResponse, Error>({
      queryKey: ["user", userId],
      queryFn: () => getUserById(userId),
    });

  const useUpdateUser = () =>
    useMutation<UserResponse, Error, { userId: string; data: UpdateUser }>({
      mutationFn: ({ userId, data }) => updateUserFn(userId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });

  const useDeleteUser = () =>
    useMutation<void, Error, string>({
      mutationFn: deleteUserFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });

  return {
    usersQuery,
    useUserQuery,
    useUpdateUser,
    useDeleteUser,
  };
};
