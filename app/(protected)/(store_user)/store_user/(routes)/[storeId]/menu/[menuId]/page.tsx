"use client";

import { Container } from "@/app/(protected)/(store_user)/_components/container";
import Gallery from "@/app/(protected)/(store_user)/_components/gallery";
import InfoMenu from "@/app/(protected)/(store_user)/_components/info_menu";
import MenuList from "@/app/(protected)/(store_user)/_components/menu_list";
import LoadingCarrot from "@/components/ui/loading-carrot";

import useAsyncDataFetcher from "@/hooks/store/useAsyncDataFetcher";
import useOrigin from "@/hooks/store/use_origin";
import { Category, Menu, Size, Image } from "@/lib/types/store_types";
import { BeatLoader } from "react-spinners";

export const revalidate = 0;

interface MenuPageProps {
  params: {
    menuId: string;
    storeId: string;
  };
}

const MenuPage: React.FC<MenuPageProps> = ({ params }) => {
  const url = "http://localhost:3001";
  const { data, isLoading } = useAsyncDataFetcher<
    Menu & { images: Image[]; category: Category; size: Size }
  >(`${url}/api/user_store/menus/${params.menuId}`);

  const { data: relatedMenus, isLoading: relatedMenusLoading } =
    useAsyncDataFetcher<(Menu & { images: Image[] })[]>(
      `${url}/api/user_store/${params.storeId}/menus`
    );

  const images = data?.images;

  return isLoading ? (
    <LoadingCarrot></LoadingCarrot>
  ) : (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={images ?? []} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <InfoMenu data={data!} />
            </div>
          </div>
          <hr className="my-10" />
          {relatedMenusLoading ? (
            <BeatLoader></BeatLoader>
          ) : (
            <MenuList title="Related Items" items={relatedMenus ?? []} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default MenuPage;
