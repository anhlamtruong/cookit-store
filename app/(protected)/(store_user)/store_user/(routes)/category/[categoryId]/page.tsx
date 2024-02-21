"use client";

import { Container } from "@/app/(protected)/(store_user)/_components/container";
import Billboard from "@/app/(protected)/(store_user)/_components/ui/billboard";
import MenuCard from "@/app/(protected)/(store_user)/_components/ui/menu_cart";
import NoResults from "@/app/(protected)/(store_user)/_components/ui/new_results";
import LoadingCarrot from "@/components/ui/loading-carrot";
import {
  Category,
  Menu,
  Size,
  Image,
  Billboard as BillboardProp,
} from "@/lib/types/store_types";
import useAsyncDataFetcher from "@/hooks/store/useAsyncDataFetcher";
import useOrigin from "@/hooks/store/use_origin";
import qs from "query-string";
import MobileFilters from "./_component/mobile_filter";
import Filter from "./_component/filter";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  params,
  searchParams,
}) => {
  const url = "http://localhost:3001";
  const storeUrl = `${url}/api/user_store/menus`;
  const categoryUrl = `${url}/api/user_store/categories/${params.categoryId}`;
  const sizesUrl = `${url}/api/user_store/sizes`;
  const queryUrl = qs.stringifyUrl({
    url: storeUrl,
    query: {
      sizeId: searchParams.sizeId,
      categoryId: params.categoryId,
    },
  });
  const { data: menusData, isLoading } =
    useAsyncDataFetcher<
      (Menu & { images: Image[]; category: Category; size: Size })[]
    >(queryUrl);
  const { data: categoryData } = useAsyncDataFetcher<
    Category & { billboard: BillboardProp }
  >(categoryUrl);
  const { data: sizesData } = useAsyncDataFetcher<Size[]>(sizesUrl);

  return isLoading || !menusData ? (
    <LoadingCarrot></LoadingCarrot>
  ) : (
    <div className="bg-white">
      <Container>
        <Billboard data={categoryData?.billboard!} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizesData ?? []} />
            <div className="hidden lg:block">
              <Filter
                valueKey="sizeId"
                name="Portions"
                data={sizesData ?? []}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {menusData.length === 0 && (
                <NoResults message="Can't find any menus under this category X_X" />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {menusData.map((item) => (
                  <MenuCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
