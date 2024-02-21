import { Store } from "@/lib/types/store_types";

interface StoreCardContentProps {
  data: Store;
}

const StoreCardContent: React.FC<StoreCardContentProps> = ({ data }) => {
  console;
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className=" mix-blend-difference invert font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCardContent;
