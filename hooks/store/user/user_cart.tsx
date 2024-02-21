import { create } from "zustand";
import { toast } from "sonner";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Category,
  Menu,
  Size,
  Image as ImageMenu,
  OrderItem,
} from "@/lib/types/store_types";

interface CartStore {
  items: (Menu & {
    images: ImageMenu[];
    size?: Size;
    category?: Category;
    quantity?: number;
    unitPrice?: number;
  })[];
  addItem: (
    data: Menu & {
      images: ImageMenu[];
      size?: Size;
      category?: Category;
      quantity?: number;
      unitPrice?: number;
    }
  ) => void;
  removeItem: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  increaseQuantity: (id: string) => void;
  removeAll: () => void;
  totalItemsCount: () => number;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (
        data: Menu & {
          images: ImageMenu[];
          size?: Size;
          category?: Category;
          quantity?: number;
          unitPrice?: number;
        }
      ) => {
        let currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.id === data.id
        );

        if (existingIndex !== -1) {
          // If item already exists, increment its quantity
          currentItems[existingIndex].quantity! += data.quantity ?? 1;
          set({ items: [...currentItems] });
          toast.success("Item quantity updated in cart.");
        } else {
          // Add new item if it doesn't exist in the cart
          const newItem = {
            ...data,
            quantity: data.quantity ?? 1,
            unitPrice: Number(data.price),
          };
          set({ items: [...currentItems, newItem] });
          toast.success("Item added to cart.");
        }
      },
      increaseQuantity: (id: string) => {
        const currentItems = get().items;
        const itemIndex = currentItems.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          currentItems[itemIndex].quantity! += 1;
          set({ items: [...currentItems] });
          toast.success("Item quantity increased.");
        }
      },

      decreaseQuantity: (id: string) => {
        let currentItems = get().items;
        const itemIndex = currentItems.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          if (currentItems[itemIndex].quantity! > 1) {
            currentItems[itemIndex].quantity! -= 1;
            set({ items: [...currentItems] });
            toast.success("Item quantity decreased.");
          } else {
            // Remove item from cart if quantity is less than or equal to 1
            currentItems = currentItems.filter((item) => item.id !== id);
            set({ items: currentItems });
            toast.success("Item removed from cart.");
          }
        }
      },
      totalItemsCount: () => {
        const items = get().items;
        return items.reduce((total, item) => total + (item.quantity ?? 1), 0);
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
