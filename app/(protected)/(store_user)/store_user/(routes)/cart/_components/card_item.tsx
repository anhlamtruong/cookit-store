import Image from "next/image";

import { Minus, Plus, X } from "lucide-react";

import useCart from "@/hooks/store/user/user_cart";
import IconButton from "@/app/(protected)/(store_user)/_components/ui/icon_button";
import Currency from "@/app/(protected)/(store_user)/_components/ui/currency";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Image as ImageMenu,
  Size,
  Category,
} from "@/lib/types/store_types";

interface CartItemProps {
  data: Menu & {
    images: ImageMenu[];
    size?: Size;
    category?: Category;
    quantity?: number;
    unitPrice?: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onIncrease = () => {
    cart.increaseQuantity(data.id);
  };
  const onDecrease = () => {
    cart.decreaseQuantity(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          sizes="100"
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data?.size?.name ?? " No Portion Size "}
            </p>
          </div>
          <Currency value={data.price} />
        </div>
        <div className="flex gap-3 items-center justify-center">
          <Button onClick={onDecrease} size={"icon"}>
            <Minus></Minus>
          </Button>
          <p>Quantity: {data.quantity}</p>
          <Button onClick={onIncrease} size={"icon"}>
            <Plus></Plus>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
