import { UseMutationResult } from "@tanstack/react-query";

export type UserRole = "BUYER" | "SELLER" | "ADMIN";

export type AuctionStatus = "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELED";

export type AuctionType = "FIXED" | "FREE";

export type IncrementType = "AMOUNT" | "PERCENTAGE" | "NONE";

export interface Register {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Login {
  email: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phoneNumber?: string;
  bio?: string;
}

export interface UserResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  email: string;
  address: string | null;
  phoneNumber: string | null;
  bio: string | null;
  role: UserRole;
}

export interface AuthResponse {
  user: UserResponse;
  isAuthenticated: boolean | true;
  accessToken: string;
  refreshToken: string;
}

export interface CategoryResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  description: string;
  isActive: boolean;
}

export interface CreateItem {
  name: string;
  description: string;
  startingBid: number;
  buyNowPrice: number;
  userId: string;
  categoryId: string;
}

export interface UpdateItem {
  name?: string;
  description?: string;
  startingBid?: number;
  buyNowPrice?: number;
  categoryId?: string;
}

export interface ItemFormData extends CreateItem {
  files: File[];
}

export interface ItemImage {
  id: string;
  itemId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ItemResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  description: string;
  startingBid: number;
  buyNowPrice: number;
  user: UserResponse;
  category: CategoryResponse;
  images: ItemImage[];
}

export interface CreateAuction {
  itemId: string;
  startTime: string;
  endTime: string;
  type: AuctionType;
  status: AuctionStatus;
  incrementType: IncrementType;
  incrementAmount: number;
  incrementPercentage: number;
}

export interface UpdateAuction {
  startTime?: string;
  endTime?: string;
  type?: AuctionType;
  status?: AuctionStatus;
  incrementType?: IncrementType;
  incrementAmount?: number;
  incrementPercentage?: number;
}

export interface AuctionResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  item: ItemResponse;
  highestBid: BidResponse;
  startTime: string;
  endTime: string;
  type: AuctionType;
  status: AuctionStatus;
  incrementType: IncrementType;
  incrementAmount: number;
  incrementPercentage: number;
}

export interface placeBid {
  userId: string;
  auctionId: string;
  amount?: number;
}

export interface BidResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: UserResponse;
  auction: AuctionResponse;
  amount: number;
}

export interface AuthContextType {
  user: AuthResponse | null;
  login: UseMutationResult<AuthResponse, Error, Login, unknown>;
  register: UseMutationResult<AuthResponse, Error, Register, unknown>;
  logout: () => void;
}
