interface CartItemInfoProps {
  menu: Record<string, any>;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({ menu }) => {
  return (
    <div>
      <div className="flex justify-between">
        <p className=" text-sm font-semibold text-black">{menu.name}</p>
      </div>

      <div className="mt-1 flex text-sm">
        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
          {menu.size}
        </p>
      </div>
      <p className="mt-1 text-sm font-medium text-gray-900">{menu.price}</p>
    </div>
  );
};

export default CartItemInfo;
