import { salesHistory } from "../constants/dummyData";
import type { SaleRecord } from "../types/common";

export const salesService = {
  getAll: (): SaleRecord[]   => salesHistory,
  getByDate: (date: string)  => salesHistory.filter(s => s.date === date),
  getByPayment: (method: string) => salesHistory.filter(s => s.payment === method),
};
