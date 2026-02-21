import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Topbar from "@/components/Topbar";
import KPICard from "@/components/KPICard";
import DataTable, { Column } from "@/components/DataTable";
import RightPanel from "@/components/RightPanel";
import { DollarSign, TrendingUp, Gauge } from "lucide-react";
import api from "@/services/api";

interface Summary {
  totalRevenue: number;
  totalFuelCost: number;
  totalMaintenanceCost: number;
  totalProfit: number;
}

interface Row {
  [key: string]: unknown;
  metric: string;
  value: string;
}

const Analytics = () => {
  const [summary, setSummary] = useState<Summary | null>(null);

  const fetchSummary = async () => {
    const res = await api.get("/analytics/summary");
    setSummary(res.data);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (!summary) return null;

  const roi =
    summary.totalRevenue > 0
      ? ((summary.totalProfit / summary.totalRevenue) * 100).toFixed(2)
      : "0";

  const utilization = summary.totalRevenue > 0 ? "Live" : "0%";

  const financialTable: Row[] = [
    { metric: "Total Revenue", value: `KES ${summary.totalRevenue}` },
    { metric: "Fuel Cost", value: `KES ${summary.totalFuelCost}` },
    { metric: "Maintenance Cost", value: `KES ${summary.totalMaintenanceCost}` },
    { metric: "Net Profit", value: `KES ${summary.totalProfit}` },
  ];

  const columns: Column<Row>[] = [
    { key: "metric", header: "Metric" },
    { key: "value", header: "Value" },
  ];

  return (
    <PageLayout
      rightPanel={
        <RightPanel
          title="Financial Analytics"
          sections={[
            { title: "Revenue Tracking", text: "Live revenue from all trips." },
            { title: "Cost Monitoring", text: "Fuel and maintenance expenses aggregated." },
            { title: "ROI", text: "Return on Investment calculated from live data." },
          ]}
        />
      }
    >
      <Topbar />

      <div className="flex-1 overflow-auto p-6 space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            label="Total Fuel Cost"
            value={`KES ${summary.totalFuelCost}`}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <KPICard
            label="Fleet ROI"
            value={`${roi}%`}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <KPICard
            label="Utilization"
            value={utilization}
            icon={<Gauge className="w-5 h-5" />}
          />
        </div>

        <DataTable columns={columns} data={financialTable} />

      </div>
    </PageLayout>
  );
};

export default Analytics;