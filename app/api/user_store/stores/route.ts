import prismaStore from "@/lib/service/prisma_store";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const stores = await prismaStore.store.findMany();

    return NextResponse.json(stores);
  } catch (error) {
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error : GET STORES",
    } as ResponseInit);
  }
}
