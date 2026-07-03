import { Card, SectionHeader, DataTable, StatusBadge } from "../../../../components";
import { C } from "../../../../constants/colors";
import { ordersService } from "../../../../services/orders.service";

export function StaffRecentOrders() {
  const orders = ordersService.getRecent();

  return (
    <Card className="p-5">
      <SectionHeader title="Recent Orders" subtitle="Today's transactions" />
      <DataTable
        headers={["Order #", "Customer", "Status", "Pickup Time"]}
        rows={orders.map(o => [
          <span key="id"   className="font-mono text-xs"   style={{ color: C.muted }}>{o.id}</span>,
          <span key="cust" className="font-medium text-sm" style={{ color: C.text  }}>{o.customer}</span>,
          <StatusBadge key="st" status={o.status} />,
          <span key="pu"   className="text-xs"             style={{ color: C.muted }}>
            {o.pickup.split(",")[1]}
          </span>,
        ])}
      />
    </Card>
  );
}
