import { currentUser } from "@/lib/auth";
import prismaStore from "@/lib/service/prisma_store";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categories = await prismaStore.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
