import { NextResponse } from "next/server";
import prismaStore from "@/lib/service/prisma_store";

export async function GET(req: Request) {
  try {
    const sizes = await prismaStore.size.findMany();

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
