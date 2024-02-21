import prismaStore from "@/lib/service/prisma_store";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prismaStore.order.count({
    where: {
      storeId,
    },
  });

  return salesCount;
};
