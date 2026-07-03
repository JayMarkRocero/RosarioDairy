import { Card, SectionHeader } from "../../../../components";
import { C } from "../../../../constants/colors";
import { bestSellers } from "../../../../constants/dummyData";

export function BestSellersChart() {
  const maxSales = bestSellers[0].sales;

  return (
    <Card className="p-5 h-full flex flex-col">
      <SectionHeader title="Best Selling Products" subtitle="Top 10 this month" />

      <div className="space-y-2">
        {bestSellers.slice(0, 6).map((item, i) => (
          <div key={item.product}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: i < 3 ? C.blue : C.muted }}
                >
                  {i + 1}
                </span>
                <span style={{ color: C.text }}>{item.product}</span>
              </span>
              <span className="font-medium" style={{ color: C.muted }}>
                {item.sales.toLocaleString()} units
              </span>
            </div>
            <div className="h-1.5 rounded-full" style={{ backgroundColor: C.border }}>
              <div
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: `${(item.sales / maxSales) * 100}%`,
                  backgroundColor: i < 3 ? C.blue : C.muted,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
