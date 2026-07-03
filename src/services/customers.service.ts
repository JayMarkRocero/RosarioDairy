import { customers } from "../constants/dummyData";
import type { Customer } from "../types/customer";

export const customersService = {
  getAll: (): Customer[] => customers,
  search: (q: string): Customer[] =>
    customers.filter(c =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.email.toLowerCase().includes(q.toLowerCase())
    ),
};
