export type OrderStatus = "Completed" | "Pending" | "Processing" | "Ready" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  status: OrderStatus;
  staff: string;
  pickup: string;
  total: number;
}
