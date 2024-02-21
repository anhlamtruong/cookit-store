// Interfaces.ts

export type StoreStatus = "ACTIVE" | "INACTIVE";
export type OrderStatus = "PLACED" | "PAID" | "CANCELLED" | "COMPLETED";

export interface Store {
  id: string;
  name: string;
  userId: string;
  description?: string;
  imageUrl?: string;
  status: StoreStatus;
  chefId: string;
  createAt: Date;
  updateAt: Date;
}

export interface Billboard {
  id: string;
  storeId: string;
  label: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  storeId: string;
  billboardId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chef {
  id: string;
  userId: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  profilePictures: ProfilePicture[];
}

export interface Menu {
  id: string;
  storeId: string;
  name: string;
  chefId: string;
  title?: string;
  description?: string;
  pickupDate?: Date;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: Image[];
}

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  isPaid: boolean;
  phone: string;
  address: string;
  orderDate: Date;
  totalAmount: number;
  notes?: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuId: string;
  quantity?: number;
  unitPrice: number;
}

export interface Size {
  id: string;
  storeId: string;
  name: string;
  quantity: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: string;
  menuId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfilePicture {
  id: string;
  chefId: string;
  description?: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
