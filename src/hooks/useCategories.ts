import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "@/app/_actions/Category";
import { CategoryResponse, CreateCategory, UpdateCategory } from "@/types";

export const useCategories = () => {
  const queryClient = useQueryClient();
  const CategoriesQuery = ({ isActive }: { isActive?: "true" | "false" }) =>
    useQuery<CategoryResponse[]>({
      queryKey: ["categories"],
      queryFn: () => getCategories({ isActive }),
    });

  const useCategory = (id: string) =>
    useQuery<CategoryResponse>({
      queryKey: ["category", id],
      queryFn: () => getCategory(id),
    });

  const useCreateCategory = useMutation<
    CategoryResponse,
    unknown,
    CreateCategory
  >({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const useUpdateCategory = useMutation<
    CategoryResponse,
    Error,
    { categoryId: string; updateCategoryData: UpdateCategory }
  >({
    mutationFn: ({ categoryId, updateCategoryData }) =>
      updateCategory(categoryId, updateCategoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
    },
  });

  return {
    getCategories: CategoriesQuery,
    getCategory: useCategory,
    createCategory: useCreateCategory,
    updateCategory: useUpdateCategory,
  };
};
