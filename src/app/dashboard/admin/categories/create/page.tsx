"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CreateCategory } from "@/types";
import { useCategories } from "@/hooks/useCategories";
import { CategoryForm } from "@/components/dashboard/CategoryForm";

export default function CreateCategoryPage() {
  const router = useRouter();
  const { createCategory } = useCategories();
  const { mutateAsync, isPending } = createCategory;

  const handleSubmit = async (data: CreateCategory) => {
    try {
      await mutateAsync(data);
      toast.success("Category created successfully!");
      router.push("/dashboard/admin/categories");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
      <CategoryForm isLoading={isPending} onSubmit={handleSubmit} />
    </div>
  );
}
