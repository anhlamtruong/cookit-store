"use client";

import React from "react";
import { Container } from "../../_components/container";
import useOrigin from "@/hooks/store/use_origin";
import useAsyncDataFetcher from "@/hooks/store/useAsyncDataFetcher";
import { ClimbingBoxLoader } from "react-spinners";
import ErrorComponent from "@/components/ui/error";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import StoreCardContent from "../../_components/ui/store_card_content";
import { useRouter } from "next/navigation";
import { Store } from "@/lib/types/store_types";

const MainStoreUserPage: React.FC = ({}) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { data, isLoading } = useAsyncDataFetcher<Store[]>(
    `${url}/api/user_store/stores`
  );

  return isLoading ? (
    <ClimbingBoxLoader></ClimbingBoxLoader>
  ) : !data ? (
    <ErrorComponent message="Don't have any store running ╰（‵□′）╯"></ErrorComponent>
  ) : (
    <Container>
      <div className=" p-10 grid grid-cols-2 gap-4">
        {data.map((store) => (
          <div key={store.id}>
            <Card
              onClick={() => {
                router.push(`store_user/${store.id}`);
              }}
              className=" transition-all hover:-translate-y-2"
            >
              <CardHeader>
                <CardTitle>{`${store.name}`}</CardTitle>
                <CardDescription>{store.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <StoreCardContent data={store}></StoreCardContent>
              </CardContent>
              <CardFooter className="text-sm tex">{`Created from: ${
                format(store.updateAt, "MMMM do, yyyy") ??
                format(store.createAt, "MMMM do, yyyy")
              }`}</CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};
export default MainStoreUserPage;
