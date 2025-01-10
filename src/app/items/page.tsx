"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ItemGrid } from "@/components/item/ItemGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Search } from "lucide-react";

export default function ItemsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoriesChange = async (categories: string[]) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Items</h1>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 w-full rounded-full "
            />
          </div>
        </div>
        <div className=" p-4 rounded-lg">
          <CategoryFilter onCategoriesChangeAction={handleCategoriesChange} />
        </div>
      </div>
      <ItemGrid searchTerm={searchTerm} categories={selectedCategories} />
    </div>
  );
}
