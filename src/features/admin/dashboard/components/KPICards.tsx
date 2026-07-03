import { useState } from "react";
import { BarChart2, TrendingUp, ClipboardList, Users, Package, AlertTriangle } from "lucide-react";
import { Modal } from "../../../../components";
import { C } from "../../../../constants/colors";
import type { Trend } from "../../../../types/common";

interface KPIConfig {
  title: string; value: string; icon: React.ReactNode;
  trend: Trend; trendLabel: string; color: string;
  detail: string; change: string;
}

const KPI_CONFIG: KPIConfig[] = [
  { title:"Today's Sales",        value:"₱22,400",  icon:<BarChart2 size={20}/>,    trend:"up",     trendLabel:"+12.4%", color:C.blue,   detail:"34 transactions completed today",       change:"vs ₱19,900 yesterday"   },
  { title:"Monthly Revenue",      value:"₱521,000", icon:<TrendingUp size={20}/>,   trend:"up",     trendLabel:"+8.1%",  color:C.green,  detail:"1,289 orders across 247 customers",    change:"vs ₱481,900 last month" },
  { title:"Total Orders",         value:"1,289",    icon:<ClipboardList size={20}/>,trend:"up",     trendLabel:"+5.3%",  color:C.navy,   detail:"3 pending · 1 processing · 4 ready",  change:"vs 1,224 last month"    },
  { title:"Total Customers",      value:"247",      icon:<Users size={20}/>,        trend:"up",     trendLabel:"+3.2%",  color:"#9B59B6",detail:"7 new customers this month",           change:"vs 239 last month"      },
  { title:"Products in Inventory",value:"12",       icon:<Package size={20}/>,      trend:"neutral",trendLabel:"Stable", color:C.orange, detail:"4 categories · 1,200+ units total",   change:"No change from last week"},
  { title:"Low Stock Alerts",     value:"4",        icon:<AlertTriangle size={20}/>,trend:"down",   trendLabel:"Alert",  color:C.red,    detail:"Fresh Whole Milk, Mozzarella, Cheddar…",change:"Restock required ASAP"   },
];

function KPIDetailModal({ kpi, onClose }: { kpi: KPIConfig; onClose: ()=>void }) {
  return (
    <Modal open onClose={onClose} title={kpi.title} subtitle={kpi.detail} size="sm">
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4 p-5 rounded-2xl" style={{backgroundColor:kpi.color+"10"}}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{backgroundColor:kpi.color+"20"}}>
            <span style={{color:kpi.color}}>{kpi.icon}</span>
          </div>
          <div>
            <div className="text-3xl font-bold" style={{color:kpi.color,fontFamily:"Poppins,sans-serif"}}>{kpi.value}</div>
            <div className="text-xs mt-1" style={{color:C.muted}}>{kpi.change}</div>
          </div>
        </div>
        <div className="p-3 rounded-xl text-sm" style={{backgroundColor:C.bg,color:C.muted}}>{kpi.detail}</div>
      </div>
    </Modal>
  );
}

export function KPICards() {
  const [activeKPI, setActiveKPI] = useState<KPIConfig | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {KPI_CONFIG.map(k => (
          <button
            key={k.title}
            onClick={() => setActiveKPI(k)}
            className="bg-white rounded-2xl p-5 shadow-sm text-left group transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ border:`1px solid ${C.border}` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{backgroundColor:k.color+"18"}}>
                <span style={{color:k.color}}>{k.icon}</span>
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5 ${
                k.trend==="up" ? "text-green-700 bg-green-50" :
                k.trend==="down"? "text-red-600 bg-red-50" : "text-gray-500 bg-gray-100"
              }`}>
                {k.trendLabel}
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight"
              style={{color:C.text,fontFamily:"Poppins,sans-serif"}}>{k.value}</div>
            <div className="text-xs mt-0.5" style={{color:C.muted}}>{k.title}</div>
          </button>
        ))}
      </div>

      {activeKPI && <KPIDetailModal kpi={activeKPI} onClose={()=>setActiveKPI(null)}/>}
    </>
  );
}
