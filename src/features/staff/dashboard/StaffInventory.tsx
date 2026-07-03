import { useMemo, useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { Card, DataTable, StatusBadge } from "../../../components";
import { C } from "../../../constants/colors";
import { inventoryService } from "../../../services/inventory.service";

export function StaffInventory() {
  const items = inventoryService.getAll();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  // Build category list dynamically from the data
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map(p => p.cat)));
    return ["All", ...unique];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.cat === category;
      const matchesLowStock = !lowStockOnly || p.low;
      return matchesSearch && matchesCategory && matchesLowStock;
    });
  }, [items, search, category, lowStockOnly]);

  return (
    <div className="p-6 flex flex-col h-full gap-4 overflow-hidden">
      {/* Header + notice - fixed */}
      <div className="flex-shrink-0 space-y-4">
        <div>
        </div>

        {/* Read-only notice */}
        <div
          className="p-3 rounded-xl flex items-center gap-3 text-sm"
          style={{ backgroundColor: C.orange + "15", border: `1px solid ${C.orange}30`, color: C.orange }}
        >
          <AlertTriangle size={16} />
          <span>You have read-only access to inventory. Contact an administrator for edits.</span>
        </div>
      </div>

      {/* Single card: filter bar fixed at top, table scrolls below */}
      <Card className="p-5 flex flex-col flex-1 min-h-0">
        {/* Filter bar - fixed inside card */}
        <div className="flex flex-wrap items-center gap-3 mb-4 flex-shrink-0">
          {/* Search */}
          <div
            className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border w-72"
            style={{ borderColor: C.border }}
          >
            <Search size={14} style={{ color: C.muted }} />
            <input
              className="bg-transparent outline-none text-sm flex-1"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ color: C.text }}
            />
          </div>

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-sm rounded-lg px-3 py-2 border bg-gray-50 outline-none"
            style={{ borderColor: C.border, color: C.text }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Low stock toggle */}
          <button
            onClick={() => setLowStockOnly(prev => !prev)}
            className="flex items-center gap-2 text-sm rounded-lg px-3 py-2 border transition-colors"
            style={{
              borderColor: lowStockOnly ? C.orange : C.border,
              backgroundColor: lowStockOnly ? C.orange + "15" : "transparent",
              color: lowStockOnly ? C.orange : C.muted,
            }}
          >
            <AlertTriangle size={14} />
            Low Stock Only
          </button>

          {/* Results count */}
          <span className="text-xs ml-auto" style={{ color: C.muted }}>
            {filteredItems.length} of {items.length} products
          </span>
        </div>

        {/* Scrollable table area */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <DataTable
            headers={["Product", "Category", "Available Qty", "Expiry Date", "Status"]}
            rows={filteredItems.map(p => [
              <span key="name" className="font-medium text-sm" style={{ color: C.text }}>{p.name}</span>,
              <span
                key="cat"
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: C.blue + "15", color: C.blue }}
              >
                {p.cat}
              </span>,
              <div key="stock" className="flex items-center gap-2">
                <span className="font-medium text-sm" style={{ color: p.low ? C.red : C.text }}>{p.stock}</span>
                {p.low && <AlertTriangle size={11} style={{ color: C.orange }} />}
              </div>,
              <span key="exp" className="text-xs" style={{ color: C.muted }}>{p.expiry}</span>,
              <StatusBadge key="st" status={p.low ? "Low" : "Active"} />,
            ])}
          />

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-sm" style={{ color: C.muted }}>
              No products match your filters.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}