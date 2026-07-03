import { allOrders, recentOrders } from "../constants/dummyData";
import type { Order } from "../types/order";

export const ordersService = {
  getAll: (): Order[]    => allOrders,
  getRecent: (): Order[] => recentOrders,
  getByStatus: (status: string): Order[] => allOrders.filter(o => o.status === status),
};
