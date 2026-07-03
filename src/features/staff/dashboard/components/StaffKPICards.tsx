import { BarChart2, Check, ClipboardList, Package } from "lucide-react";
import { KPICard } from "../../../../components";
import { C } from "../../../../constants/colors";

const STAFF_KPIS = [
  { title: "Today's Sales",       value: "₱22,400", icon: <BarChart2 size={20}/>,    trend: "up"      as const, trendLabel: "+12.4%",  color: C.blue   },
  { title: "Transactions Today",  value: "34",       icon: <Check size={20}/>,        trend: "up"      as const, trendLabel: "+4",       color: C.green  },
  { title: "Pending Orders",      value: "3",        icon: <ClipboardList size={20}/>,trend: "neutral" as const, trendLabel: "3 open",   color: C.orange },
  { title: "Available Products",  value: "9 / 12",   icon: <Package size={20}/>,      trend: "neutral" as const, trendLabel: "In stock", color: C.navy   },
];

export function StaffKPICards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STAFF_KPIS.map(k => <KPICard key={k.title} {...k} />)}
    </div>
  );
}
