import { useState, useEffect } from "react";
import { Card, SectionHeader, DataTable, StatusBadge } from "../../../../components";
import { C } from "../../../../constants/colors";
import { ordersService } from "../../../../services/orders.service";
import type { Order } from "../../../../types/order";

export function StaffRecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    ordersService.getRecent()
      .then(setOrders)
      .catch(() => {});
  }, []);

  return (
    <Card className="p-5">
      <SectionHeader title="Recent Orders" subtitle="Today's transactions" />
      <DataTable
        headers={["Order #", "Customer", "Status", "Date"]}
        rows={orders.map(o => [
          <span key="id"   className="font-mono text-xs"   style={{ color: C.muted }}>#{o.id}</span>,
          <span key="cust" className="font-medium text-sm" style={{ color: C.text  }}>{o.customer}</span>,
          <StatusBadge key="st" status={o.status} />,
          <span key="pu"   className="text-xs"             style={{ color: C.muted }}>
            {o.date}
          </span>,
        ])}
      />
    </Card>
  );
}