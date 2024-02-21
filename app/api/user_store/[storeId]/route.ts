import { NextResponse } from "next/server";
import prismaStore from "@/lib/service/prisma_store";
import { currentUser } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const store = await prismaStore.store.findUnique({
      where: { id: params.storeId },
      include: {
        billboards: true,
        menus: {
          include: {
            images: true,
          },
        },
        sizes: true,
        categories: true,
      },
    });

    if (store) {
      return NextResponse.json(store);
    } else {
      return new NextResponse("API ERROR", {
        status: 402,
        statusText: "No store found",
      } as ResponseInit);
    }
  } catch (error) {
    console.error("[STORE_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const userId = user.id;
    const body = await request.json();
    const { name, imageUrl } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const store = await prismaStore.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
        imageUrl: imageUrl ?? null,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORE_PATCH]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const userId = user.id;

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const store = await prismaStore.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORE_DELETE]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
