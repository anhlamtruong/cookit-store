import { Billboard } from "@/lib/types/store_types";

interface BillboardProps {
  data?: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${
            data?.imageUrl ?? "/store_user/FoodAndBeverage.png"
          }`,
        }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className=" mix-blend-difference invert font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data?.label ?? "There is no label"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
