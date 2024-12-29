export type UserRole = "BUYER" | "SELLER" | "ADMIN";

export type AuctionStatus = "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELED";

export type AuctionType = "FIXED" | "FREE";

export type IncrementType = "AMOUNT" | "PERCENTAGE" | "NONE";

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: UserRole;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phoneNumber?: string;
  role?: UserRole;
}

export interface UserResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: UserRole;
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
