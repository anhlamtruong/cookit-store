"use client";

import axios from "axios";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import useCart from "@/hooks/store/user/user_cart";
import Currency from "@/app/(protected)/(store_user)/_components/ui/currency";
import { Button } from "@/components/ui/button";
import useOrigin from "@/hooks/store/use_origin";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MoonLoader } from "react-spinners";
import { OrdersAccumulator } from "@/lib/types/cart_types";
import { number } from "zod";

const Summary = () => {
  // const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const url = "http://localhost:3001";
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * Number(item?.quantity ?? 1);
  }, 0);

  const onCheckout = async () => {
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
      toast.warning(
        "Something went wrong 😢, Please refresh the page and try again"
      );
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
