import prismaStore from "@/lib/service/prisma_store";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismaStore.menu.count({
    where: {
      storeId,
    },
  });

  return stockCount;
};
