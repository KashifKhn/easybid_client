"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuctionResponse } from "@/types";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { GlobalErrorState } from "@/components/GlobalErrorState";
import { getAllAuctions } from "../_actions/Auction";
import { AuctionGrid } from "@/components/auction/AuctionGrid";
import { Card } from "@/components/ui/card";
import { CategoryFilter } from "@/components/CategoryFilter";

export default function AuctionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterd, setIsFilterd] = useState(false);

  const {
    data: auctions,
    isLoading: auctionsLoading,
    isError: auctionsError,
    error: auctionsErrorData,
    refetch,
  } = useQuery<AuctionResponse[]>({
    queryKey: ["auctions"],
    queryFn: getAllAuctions,
  });

  const filteredAuctions =
    auctions?.filter((auction) => {
      const matchesSearch =
        auction.item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.item.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        status === "" || status === "ALL" || auction.status === status;

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(auction.item.category.name);

      return matchesSearch && matchesStatus && matchesCategory;
    }) || [];

  const clearAllFilters = () => {
    setSearchTerm("");
    setStatus("");
    setSelectedCategories([]);
    setIsFilterd(false);
  };

  const handleCategoryChange = async (categories: string[]) => {
    setSelectedCategories(categories);
  };

  if (auctionsLoading)
    return <GlobalLoadingState message="Loading auctions..." />;

  if (auctionsError)
    return (
      <GlobalErrorState
        title="Failed to fetch auctions"
        message={auctionsErrorData?.message}
        onRetry={refetch}
      />
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Auctions</h1>
      <CategoryFilter onCategoriesChangeAction={handleCategoryChange} />
      <div className="my-4 grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Status</h3>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="ACTIVE" className="text-green-600">
                  Active
                </SelectItem>
                <SelectItem value="PENDING" className="text-yellow-600">
                  Pending
                </SelectItem>
                <SelectItem value="COMPLETED" className="text-blue-600">
                  Completed
                </SelectItem>
              </SelectContent>
            </Select>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>

          <div className="rounded-lg border bg-card">
            {isFilterd && (
              <div className="flex items-center justify-between p-4 border-b">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAuctions.length} results
                </p>
                <Button onClick={clearAllFilters} variant="ghost" size="sm">
                  Clear all filters
                </Button>
              </div>
            )}
            <AuctionGrid auctions={filteredAuctions} />
          </div>
        </div>
      </div>
    </div>
  );
}
