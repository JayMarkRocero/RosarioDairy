import { allInventory, fefoItems, categoriesList } from "../constants/dummyData";
import type { InventoryItem, FEFOItem, Category } from "../types/inventory";

export const inventoryService = {
  getAll: (): InventoryItem[]  => allInventory,
  getFEFO: (): FEFOItem[]      => fefoItems,
  getCategories: (): Category[] => categoriesList,
  getLowStock: ()               => allInventory.filter(i => i.low),
  getNearExpiry: ()             => fefoItems.filter(i => i.days <= 7),
};
