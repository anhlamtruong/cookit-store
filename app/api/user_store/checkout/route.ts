import { NextResponse } from "next/server";
import prismaStore from "@/lib/service/prisma_store";
import { currentUser } from "@/lib/auth";
import { OrderStatus } from "@/lib/types/store_types";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { orders } = await req.json();

    if (!orders || orders.length === 0) {
      return new NextResponse("Orders data is required", { status: 400 });
    }
    // console.log("API TEST");
    // console.log(orders);
    const test = await Promise.all(
      orders.map(
        async ({
          storeId,
          totalAmount,
          orderItems,
          notes,
        }: {
          storeId: string;
          totalAmount: number;
          orderItems: any;
          notes: string;
        }) => {
          await prismaStore.order.create({
            data: {
              customerId: user.id,
              storeId,
              isPaid: false,
              status: OrderStatus.PLACED,
              totalAmount,
              notes,
              orderItems: {
                create: orderItems.map(
                  ({
                    menuId,
                    quantity,
                    unitPrice,
                  }: {
                    menuId: string;
                    quantity: number;
                    unitPrice: number;
                  }) => ({
                    menuId,
                    quantity,
                    unitPrice,
                  })
                ),
              },
            },
          });
        }
      )
    );
    // console.log(test);

    return NextResponse.json("Successfully Place", { status: 200 });
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
