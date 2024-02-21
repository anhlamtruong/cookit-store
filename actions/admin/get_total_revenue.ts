import prismaStore from "@/lib/service/prisma_store";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismaStore.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          menu: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.menu.price * (item?.quantity ?? 1);
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
