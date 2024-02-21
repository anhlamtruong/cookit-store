"use client";

import { ShoppingCart } from "lucide-react";

import useCart from "@/hooks/store/user/user_cart";
import Currency from "./ui/currency";
import { Button } from "@/components/ui/button";
import { Category, Menu, Size, Image } from "@/lib/types/store_types";

interface InfoMenuProps {
  data: Menu & { images: Image[]; category?: Category; size?: Size };
}

const InfoMenu: React.FC<InfoMenuProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data?.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Portion:</h3>
          <div>{`${data?.size?.quantity} ${data?.size?.name} `}</div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default InfoMenu;
