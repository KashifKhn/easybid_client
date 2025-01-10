import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateItem, UpdateItem, ItemResponse } from "@/types";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "@/app/_actions/Item";

export const useItems = () => {
  const queryClient = useQueryClient();

  const useItemsQuery = ({
    auctioned,
    userId,
  }: {
    auctioned?: "true" | "false";
    userId?: string;
  }) =>
    useQuery<ItemResponse[], Error>({
      queryKey: ["items", { auctioned, userId }],
      queryFn: () => getItems({ auctioned, userId }),
    });

  const useItemQuery = (id: string) =>
    useQuery<ItemResponse, Error>({
      queryKey: ["auction", id],
      queryFn: () => getItem(id),
    });

  const createItemMutation = useMutation<
    ItemResponse,
    Error,
    CreateItem & { files?: File[] }
  >({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const updateItemMutation = useMutation<
    ItemResponse,
    Error,
    { id: string; updateData: Partial<UpdateItem> & { files?: File[] } }
  >({
    mutationFn: ({ id, updateData }) => updateItem(id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const deleteItemMutation = useMutation<void, Error, string>({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return {
    getItems: useItemsQuery,
    getItem: useItemQuery,
    createItem: createItemMutation.mutateAsync,
    updateItem: updateItemMutation.mutateAsync,
    isCreating: createItemMutation.isPending,
    isUpdating: updateItemMutation.isPending,
    deleteItem: deleteItemMutation,
  };
};
