"use client";
export const revalidate = 0;
import React from "react";
import { Container } from "../../../_components/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Billboard from "../../../_components/ui/billboard";
import useAsyncDataFetcher from "@/hooks/store/useAsyncDataFetcher";
import useOrigin from "@/hooks/store/use_origin";

import LoadingCarrot from "@/components/ui/loading/loading-carrot";

import Autoplay from "embla-carousel-autoplay";
import MenuList from "../../../_components/menu_list";
import {
  Billboard as BillboardProps,
  Menu,
  Store,
  Image,
  Category,
  Size,
} from "@/lib/types/store_types";
function StorePage({ params }: { params: { storeId: string } }) {
  const url = "http://localhost:3001";
  const { data, isLoading } = useAsyncDataFetcher<
    Store & {
      billboards: BillboardProps[];
      menus: (Menu & { images: Image[] })[];
      categories: Category[];
      sizes: Size[];
    }
  >(`${url}/api/user_store/${params.storeId}`);
  const billboards = data?.billboards;
  const menus = data?.menus;

  return isLoading || !data ? (
    <LoadingCarrot></LoadingCarrot>
  ) : (
    <Container>
      <div className="space-y-10 pb-10">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {billboards?.map((billboard, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2">
                <Billboard data={billboard}></Billboard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <MenuList title="Featured Menus" items={menus ?? []} />
        </div>
      </div>
    </Container>
  );
}
export default StorePage;
