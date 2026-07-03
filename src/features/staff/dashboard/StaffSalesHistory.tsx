import { useMemo, useState } from "react";
import { BarChart2, Search, Printer } from "lucide-react";
import { Card, DataTable, Btn } from "../../../components";
import { C } from "../../../constants/colors";
import { salesService } from "../../../services/sales.service";

const PAYMENT_STYLE: Record<string, { bg: string; color: string }> = {
  Cash:  { bg: C.green  + "15", color: C.green  },
  GCash: { bg: C.blue   + "15", color: C.blue   },
  Card:  { bg: "#9B59B6" + "15", color: "#9B59B6" },
};

export function StaffSalesHistory() {
  const records = salesService.getAll();

  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState("All");
  const [date, setDate] = useState("");

  const paymentOptions = useMemo(() => {
    const unique = Array.from(new Set(records.map(r => r.payment)));
    return ["All", ...unique];
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter(s => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        s.receipt.toLowerCase().includes(q) ||
        s.customer.toLowerCase().includes(q);
      const matchesPayment = payment === "All" || s.payment === payment;
      const matchesDate = !date || new Date(s.date).toDateString() === new Date(date).toDateString();
      return matchesSearch && matchesPayment && matchesDate;
    });
  }, [records, search, payment, date]);

  return (
    <div className="p-6 flex flex-col h-full gap-4 overflow-hidden">
      {/* Header - fixed */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h3 style={{ color: C.muted }}>Your transaction records</h3>
        </div>
      </div>

      {/* Stat cards - fixed */}
      <div className="grid grid-cols-3 gap-4 flex-shrink-0">
        {[
          { label: "Today",     value: "₱22,400",  sub: "34 transactions"  },
          { label: "This Week", value: "₱134,000", sub: "341 transactions" },
          { label: "My Sales",  value: "₱89,200",  sub: "226 by me"        },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <div className="font-bold text-xl" style={{ color: C.blue, fontFamily: "Poppins, sans-serif" }}>
              {s.value}
            </div>
            <div className="font-medium text-sm mt-1" style={{ color: C.text }}>{s.label}</div>
            <div className="text-xs mt-0.5" style={{ color: C.muted }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Table card - grows to fill remaining space, scrolls internally */}
      <Card className="p-5 flex flex-col flex-1 min-h-0">
        {/* Filter bar - fixed inside card */}
        <div className="flex flex-wrap items-center gap-3 mb-4 flex-shrink-0">
          <div
            className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border w-72"
            style={{ borderColor: C.border }}
          >
            <Search size={14} style={{ color: C.muted }} />
            <input
              className="bg-transparent outline-none text-sm flex-1"
              placeholder="Search receipt or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ color: C.text }}
            />
          </div>

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="text-sm rounded-lg px-3 py-2 border bg-gray-50 outline-none"
            style={{ borderColor: C.border, color: C.text }}
          >
            {paymentOptions.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-sm rounded-lg px-3 py-2 border bg-gray-50 outline-none"
            style={{ borderColor: C.border, color: C.text }}
          />

          <span className="text-xs ml-auto" style={{ color: C.muted }}>
            {filteredRecords.length} of {records.length} transactions
          </span>
        </div>

        {/* Scrollable table area */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <DataTable
            headers={["Receipt #", "Customer", "Date", "Payment", "Total", "Receipt"]}
            rows={filteredRecords.map(s => {
              const pm = PAYMENT_STYLE[s.payment] ?? { bg: "#F5F5F5", color: C.muted };
              return [
                <span key="r" className="font-mono text-xs" style={{ color: C.muted }}>{s.receipt}</span>,
                <span key="c" className="font-medium text-sm" style={{ color: C.text }}>{s.customer}</span>,
                <span key="d" className="text-xs" style={{ color: C.muted }}>{s.date}</span>,
                <span
                  key="p"
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: pm.bg, color: pm.color }}
                >
                  {s.payment}
                </span>,
                <span key="t" className="font-semibold text-sm" style={{ color: C.text }}>
                  ₱{s.total.toLocaleString()}
                </span>,
                <button
                  key="pr"
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: C.muted }}
                >
                  <Printer size={13} />
                </button>,
              ];
            })}
          />

          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-sm" style={{ color: C.muted }}>
              No transactions match your filters.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}