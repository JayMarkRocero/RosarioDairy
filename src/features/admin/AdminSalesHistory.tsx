import { BarChart2, Download, Printer } from "lucide-react";
import { Card, DataTable, Btn } from "../../components";
import { C } from "../../constants/colors";
import { salesService } from "../../services/sales.service";

const PAYMENT_STYLE: Record<string, { bg: string; color: string }> = {
  Cash:  { bg: C.green  + "15", color: C.green  },
  GCash: { bg: C.blue   + "15", color: C.blue   },
  Card:  { bg: "#9B59B6" + "15", color: "#9B59B6" },
};

export function AdminSalesHistory() {
  const records = salesService.getAll();

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg" style={{ color: C.text, fontFamily: "Poppins, sans-serif" }}>
            Sales History
          </h2>
          <p className="text-xs mt-0.5" style={{ color: C.muted }}>Complete transaction records</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary" size="sm" icon={<BarChart2 size={13} />}>Filter</Btn>
          <Btn variant="secondary" size="sm" icon={<Download size={13} />}>Export</Btn>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Today's Revenue", value: "₱22,400",  sub: "12 transactions"   },
          { label: "This Week",       value: "₱134,000", sub: "341 transactions"  },
          { label: "This Month",      value: "₱521,000", sub: "1,289 transactions"},
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

      <Card className="p-5">
        <DataTable
          headers={["Receipt #", "Customer", "Cashier", "Date", "Payment", "Total", "Actions"]}
          rows={records.map(s => {
            const pm = PAYMENT_STYLE[s.payment] ?? { bg: "#F5F5F5", color: C.muted };
            return [
              <span key="r"  className="font-mono text-xs"      style={{ color: C.muted }}>{s.receipt}</span>,
              <span key="c"  className="font-medium text-sm"    style={{ color: C.text  }}>{s.customer}</span>,
              <span key="ca" className="text-xs"                style={{ color: C.muted }}>{s.cashier}</span>,
              <span key="d"  className="text-xs"                style={{ color: C.muted }}>{s.date}</span>,
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
      </Card>
    </div>
  );
}
