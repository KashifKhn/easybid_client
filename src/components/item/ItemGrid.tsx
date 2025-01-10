"use client";

import { ItemCard } from "./ItemCard";
import { useItems } from "@/hooks/useItems";

interface ItemGridProps {
  searchTerm: string;
  categories: string[];
}

export function ItemGrid({ searchTerm, categories }: ItemGridProps) {
  const { getItems } = useItems();
  const { data: items } = getItems({});

  const filteredItems = items?.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchLower) ||
      (item.description &&
        item.description.toLowerCase().includes(searchLower));
    const matchesCategory =
      categories.length === 0 || categories.includes(item.category.name);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems?.map((item) => <ItemCard key={item.id} item={item} />)}
    </div>
  );
}
