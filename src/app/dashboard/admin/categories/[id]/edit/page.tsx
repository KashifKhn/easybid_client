"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { UpdateCategory } from "@/types";
import { CategoryForm } from "@/components/dashboard/CategoryForm";
import { useCategories } from "@/hooks/useCategories";

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: categoryId } = use(params);
  const router = useRouter();
  const { getCategory, updateCategory } = useCategories();
  const { data: category } = getCategory(categoryId);
  const { mutateAsync, isPending } = updateCategory;

  const handleSubmit = async (data: UpdateCategory) => {
    try {
      await mutateAsync({ categoryId: categoryId, updateCategoryData: data });
      toast.success("Category updated successfully!");
      router.push("/dashboard/admin/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category. Please try again.");
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Edit Category: {category.name}
      </h1>
      <CategoryForm
        initialData={category}
        onSubmit={handleSubmit}
        isLoading={isPending}
      />
    </div>
  );
}
