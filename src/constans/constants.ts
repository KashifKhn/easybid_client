import { AuctionStatus, AuctionType, IncrementType } from "@/types";
import { Gavel, Home, Package, ShoppingBag, User, Users } from "lucide-react";

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const NUMBER_FILES = 10;

export const auctionTypeOptions: { value: AuctionType; label: string }[] = [
  { value: "FIXED", label: "Fixed" },
  { value: "FREE", label: "Free" },
];

export const auctionStatusOptions: { value: AuctionStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "ACTIVE", label: "Active" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELED", label: "Canceled" },
];

export const incrementTypeOptions: { value: IncrementType; label: string }[] = [
  { value: "AMOUNT", label: "Amount" },
  { value: "PERCENTAGE", label: "Percentage" },
  { value: "NONE", label: "None" },
];

export const getNavItems = (role: "SELLER" | "BUYER" | "ADMIN") => {
  const roleBaseNav = {
    SELLER: [
      {
        title: "Dashboard",
        href: "/dashboard/seller/",
        icon: Home,
      },
      {
        title: "My Items",
        href: "/dashboard/seller/items",
        icon: Package,
      },
      {
        title: "My Auctions",
        href: "/dashboard/seller/auctions",
        icon: Gavel,
      },
      {
        title: "Profile",
        href: "/dashboard/seller/profile",
        icon: User,
      },
    ],
    BUYER: [
      {
        title: "Dashboard",
        href: "/dashboard/buyer/",
        icon: Home,
      },
      {
        title: "My Win Items",
        href: "/dashboard/buyer/items",
        icon: Package,
      },
      {
        title: "My Auctions",
        href: "/dashboard/buyer/auctions",
        icon: Gavel,
      },
      {
        title: "My Bids",
        href: "/dashboard/buyer/bids",
        icon: ShoppingBag,
      },
      {
        title: "Profile",
        href: "/dashboard/buyer/profile",
        icon: User,
      },
    ],
    ADMIN: [
      {
        title: "Dashboard",
        href: "/dashboard/admin/",
        icon: Home,
      },
      {
        title: "Auctions",
        href: "/dashboard/admin/auctions",
        icon: Gavel,
      },
      {
        title: "Categories",
        href: "/dashboard/admin/categories",
        icon: Package,
      },
      {
        title: "Items",
        href: "/dashboard/admin/items",
        icon: Package,
      },
      {
        title: "Users",
        href: "/dashboard/admin/users",
        icon: Users,
      },
    ],
  };

  return roleBaseNav[role];
};
