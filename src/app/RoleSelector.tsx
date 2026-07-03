import { ChevronRight, UserCog, Users } from "lucide-react";
import { C } from "../constants/colors";

type Role = "admin" | "staff";

interface Props {
  onSelect: (role: Role) => void;
}

const ROLES: { role: Role; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
  {
    role:  "admin",
    label: "Administrator",
    icon:  <UserCog size={36} className="text-white" />,
    desc:  "Full access to dashboard, inventory, analytics, reports & user management",
    color: C.navy,
  },
  {
    role:  "staff",
    label: "Staff",
    icon:  <Users size={36} className="text-white" />,
    desc:  "Access to point of sale, orders, inventory view & sales history",
    color: C.blue,
  },
];

export function RoleSelector({ onSelect }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: C.bg }}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
          style={{ backgroundColor: C.navy }}
        >
          RD
        </div>
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: C.navy, fontFamily: "Poppins, sans-serif" }}
          >
            Rosario Dairy
          </h1>
          <p className="text-sm" style={{ color: C.muted }}>Management System</p>
        </div>
      </div>

      {/* Role cards */}
      <div className="flex gap-6">
        {ROLES.map(r => (
          <button
            key={r.role}
            onClick={() => onSelect(r.role)}
            className="group flex flex-col items-center gap-4 bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-all w-64"
            style={{ border: `1px solid ${C.border}` }}
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105 transform duration-200"
              style={{ backgroundColor: r.color }}
            >
              {r.icon}
            </div>
            <div className="text-center">
              <h2
                className="font-bold text-lg"
                style={{ color: C.text, fontFamily: "Poppins, sans-serif" }}
              >
                {r.label}
              </h2>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: C.muted }}>
                {r.desc}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium mt-1" style={{ color: r.color }}>
              Enter as {r.label} <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs mt-10" style={{ color: C.muted }}>
        Rosario Dairy Management System &copy; {new Date().getFullYear()} — FEFO + SARIMA Analytics
      </p>
    </div>
  );
}
