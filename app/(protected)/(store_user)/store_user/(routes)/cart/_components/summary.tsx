"use client";

import axios, { AxiosError } from "axios";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import useCart from "@/hooks/store/user/user_cart";
import Currency from "@/app/(protected)/(store_user)/_components/ui/currency";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MoonLoader } from "react-spinners";
import { OrdersAccumulator } from "@/lib/types/cart_types";
import { useAuthModal } from "@/app/auth/(hooks)/useAuthModal";
import { useCurrentUser } from "@/hooks/authenticate/use_current_user";

const Summary = () => {
  const items = useCart((state) => state.items);
  const authModal = useAuthModal();
  const user = useCurrentUser();
  const removeAll = useCart((state) => state.removeAll);
  const url = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * Number(item?.quantity ?? 1);
  }, 0);

  const onCheckout: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();

    setLoading(true);
    try {
      // Correctly type the accumulator using OrdersAccumulator
      const orders = items.reduce<OrdersAccumulator>((acc, item) => {
        const { storeId, id: menuId, quantity, unitPrice } = item;
        if (!acc[storeId]) {
          acc[storeId] = {
            storeId,
            totalAmount: 0,
            orderItems: [],
            notes: note,
          };
        }
        acc[storeId].orderItems.push({
          menuId,
          quantity: quantity ?? 1,
          unitPrice: unitPrice ?? 1,
        });
        acc[storeId].totalAmount += (quantity ?? 1) * (unitPrice ?? 1);
        return acc;
      }, {});
      const ordersArray = Object.values(orders);

      const res = await axios.post(`${url}/api/user_store/checkout`, {
        orders: ordersArray,
        userId: user?.id,
      });

      if (res.status === 200) {
        setLoading(false);
        toast.success("Order was successfully placed.");
        removeAll();
        router.back();
      } else {
        setLoading(false);
        toast.warning(res.statusText);
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        if (axiosError.response.status === 401) {
          authModal.onOpen();
          toast.warning("Please login and try again");
        }
      } else {
        toast.warning(
          "Something went wrong 😢, Please refresh the page and try again"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
        <div className="grid w-full gap-1.5">
          <Label className=" opacity-70" htmlFor="note">
            Any note?
          </Label>
          <Textarea
            disabled={loading}
            onChange={handleNoteChange}
            placeholder="Type your note here."
            id="note"
          ></Textarea>
        </div>
      </div>

      <Button
        onClick={onCheckout}
        disabled={items.length === 0 || loading}
        className="w-full mt-6"
      >
        {loading ?? <MoonLoader></MoonLoader>}
        Place Your Order 🍗
      </Button>
    </div>
  );
};

export default Summary;
