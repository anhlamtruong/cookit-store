"use client";
import Link from "next/link";
import { Container } from "./container";
import MainNav from "./main_navigation_bar";

import useAsyncDataFetcher from "@/hooks/store/useAsyncDataFetcher";

import NavbarActions from "./navigation_bar_action";
import { Category } from "@/lib/types/store_types";

export const revalidate = 0;

const NavigationBar = () => {
  const url = "http://localhost:3001";
  const { data, isLoading, error } = useAsyncDataFetcher<Category[]>(
    `${url}/api/user_store/categories`
  );
  console.log(data);

  const categories = data;
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/store_user" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories!} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default NavigationBar;
