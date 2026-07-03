import { useState } from "react";
import { Toaster } from "sonner";
import { RoleSelector } from "./RoleSelector";
import { AdminLayout }  from "../layouts/AdminLayout";
import { StaffLayout }  from "../layouts/StaffLayout";

type Role = "admin" | "staff" | null;

export default function App() {
  const [role, setRole] = useState<Role>(null);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: "Inter, sans-serif", fontSize: 13, borderRadius: 12 },
          duration: 3500,
        }}
        richColors
      />
      {!role           && <RoleSelector onSelect={setRole} />}
      {role === "admin" && <AdminLayout  onLogout={() => setRole(null)} />}
      {role === "staff" && <StaffLayout  onLogout={() => setRole(null)} />}
    </>
  );
}
