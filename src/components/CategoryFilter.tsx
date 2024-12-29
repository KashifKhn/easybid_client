"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CategoryResponse } from "@/types";
import { getCategories } from "@/app/_actions/Category";
import { Button } from "./ui/button";

interface CategoryFilterProps {
  onCategoriesChangeAction: (categories: string[]) => Promise<void>;
}

export function CategoryFilter({
  onCategoriesChangeAction,
}: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<CategoryResponse[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const toggleCategory = async (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    await onCategoriesChangeAction(newCategories);
  };

  const clearCategories = async () => {
    setSelectedCategories([]);
    await onCategoriesChangeAction([]);
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories</div>;
  if (!categories) return null;

  return (
    <>
      <div className="flex items-center justify-between my-4">
        {selectedCategories.length > 0 && (
          <button
            onClick={clearCategories}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Clear all
          </button>
        )}
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-center justify-center mx-auto w-max space-x-2">
          {categories.map((category) => (
            <Button
              variant="outline"
              key={category.id}
              onClick={() => toggleCategory(category.name)}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium transition-colors",
                selectedCategories.includes(category.name)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary/80 text-secondary",
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
