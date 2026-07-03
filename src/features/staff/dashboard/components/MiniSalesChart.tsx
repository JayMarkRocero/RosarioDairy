import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card } from "../../../../components";
import { C } from "../../../../constants/colors";
import { miniSalesData } from "../../../../constants/dummyData";

export function MiniSalesChart() {
  return (
    <Card className="p-4">
      <h3
        className="font-semibold text-sm mb-5"
        style={{ color: C.text, fontFamily: "Poppins, sans-serif" }}
      >
        Weekly Sales
      </h3>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart
          data={miniSalesData}
          margin={{ top: 10, right: 15, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.blue} stopOpacity={0.25} />
              <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke={C.border} strokeDasharray="3 3" />

          <XAxis
            dataKey="n"
            tick={{ fontSize: 11, fill: C.muted }}
            axisLine={false}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
          />

          <YAxis hide domain={["dataMin - 500", "dataMax + 500"]} />

          <Area
            type="monotone"
            dataKey="v"
            stroke={C.blue}
            strokeWidth={2.5}
            fill="url(#miniGrad)"
            dot={{ r: 3, fill: C.blue, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />

          <Tooltip
            formatter={(v: number) => [`₱${v.toLocaleString()}`, "Sales"]}
            contentStyle={{
              borderRadius: 10,
              fontSize: 12,
              border: `1px solid ${C.border}`,
              padding: "8px 12px",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}