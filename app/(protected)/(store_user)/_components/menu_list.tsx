"use client";

import NoResults from "./ui/new_results";
import MenuCard from "./ui/menu_cart";
import { Menu, Image } from "@/lib/types/store_types";

interface MenuListProps {
  title: string;
  items: (Menu & { images: Image[] })[];
}

const MenuList: React.FC<MenuListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <MenuCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
