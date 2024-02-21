import { currentUser } from "@/lib/auth";
import prismaStore from "@/lib/service/prisma_store";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const menus = await prismaStore.menu.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(menus);
  } catch (error) {
    console.log("[MENUS_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
