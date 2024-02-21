"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/store/user/user_cart";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  const { totalItemsCount } = useCart();
  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/store_user/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingCart size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {totalItemsCount()}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
