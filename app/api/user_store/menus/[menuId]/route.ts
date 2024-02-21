import { currentUser } from "@/lib/auth";
import prismaStore from "@/lib/service/prisma_store";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { menuId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const menu = await prismaStore.menu.findUnique({
      where: {
        id: params.menuId,
      },
      include: {
        images: true,
        category: true,
        size: true,
      },
    });

    return NextResponse.json(menu);
  } catch (error) {
    console.log("[MENU_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
