import { Card } from "../../../../components";
import { C } from "../../../../constants/colors";

const ALERTS = [
  { label: "Low Stock",   value: "4 products", color: C.orange },
  { label: "Available",   value: "8 products", color: C.green  },
  { label: "Near Expiry", value: "5 products", color: C.red    },
];

export function InventoryAlert() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold text-sm mb-3" style={{ color: C.text, fontFamily: "Poppins, sans-serif" }}>
        Inventory Alert
      </h3>
      <div className="space-y-2">
        {ALERTS.map(item => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span style={{ color: C.muted }}>{item.label}</span>
            </div>
            <span className="font-semibold" style={{ color: item.color }}>{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
