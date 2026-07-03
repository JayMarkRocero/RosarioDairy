import { StaffKPICards }    from "./components/StaffKPICards";
import { StaffRecentOrders } from "./components/StaffRecentOrders";
import { InventoryAlert }    from "./components/InventoryAlert";
import { MiniSalesChart }    from "./components/MiniSalesChart";
import { Card }              from "../../../components";
import { C }                 from "../../../constants/colors";
import type { StaffPage }    from "./StaffSidebar";

// ─── Announcement Banner ──────────────────────────────────────────────────────
function AnnouncementBanner() {
  return (
    <div
      className="flex items-center gap-3 px-5 py-3 rounded-2xl text-sm"
      style={{ backgroundColor: C.navy + "08", border: `1px solid ${C.navy}15` }}
    >
      <span className="text-lg">📢</span>
      <div>
        <span className="font-semibold" style={{ color: C.navy }}>Reminder: </span>
        <span style={{ color: C.muted }}>
          Fresh Whole Milk expires in <strong>2 days</strong>. Prioritize selling batch BT-2024-001.
        </span>
      </div>
    </div>
  );
}

// ─── Shift Summary ────────────────────────────────────────────────────────────
function ShiftSummary() {
  const tasks = [
    { label: "Open POS session",        done: true  },
    { label: "Check low stock items",   done: true  },
    { label: "Process pending orders",  done: false },
    { label: "Submit end-of-day report",done: false },
  ];
  
}

interface Props { onNavigate: (page: StaffPage) => void }

export function StaffDashboard({ onNavigate }: Props) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="font-bold text-xl" style={{ color:C.text, fontFamily:"Poppins,sans-serif" }}>
          {greeting}, Juan! 👋
        </h2>
        <p className="text-sm mt-0.5" style={{ color:C.muted }}>Here's your dashboard for today.</p>
      </div>

      <AnnouncementBanner />

      <StaffKPICards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <StaffRecentOrders />
        </div>
        <div className="space-y-4">
          <InventoryAlert />
          <MiniSalesChart />
        </div>
      </div>
    </div>
  );
}
