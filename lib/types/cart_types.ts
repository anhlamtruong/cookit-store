export interface OrderItem {
  menuId: string;
  quantity: number;
  unitPrice: number;
}

export interface StoreOrder {
  storeId: string;
  totalAmount: number;
  orderItems: OrderItem[];
  notes: string;
}

// This type represents the accumulator structure in the reduce function
export interface OrdersAccumulator {
  [storeId: string]: StoreOrder;
}
