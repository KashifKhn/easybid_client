"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CategoryList } from "@/components/dashboard/CategoryList";
import { useCategories } from "@/hooks/useCategories";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { GlobalErrorState } from "@/components/GlobalErrorState";

export default function CategoriesPage() {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const { getCategories } = useCategories();
  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch,
  } = getCategories({});

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreate = () => {
    router.push("/dashboard/admin/categories/create");
  };

  if (isLoading) {
    return <GlobalLoadingState message="Loading Categories..." />;
  }

  if (isError) {
    return (
      <GlobalErrorState
        title="Failed to fetch Categories"
        message={error?.message}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={handleCreate}>Create New Category</Button>
      </div>
      <CategoryList
        categories={categories ? categories : []}
        onDelete={handleDelete}
        isDeleting={deletingId}
        userRole="ADMIN"
      />
    </div>
  );
}
