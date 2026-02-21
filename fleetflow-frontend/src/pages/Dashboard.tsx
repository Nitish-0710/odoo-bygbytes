import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Topbar from "@/components/Topbar";
import KPICard from "@/components/KPICard";
import DataTable, { Column } from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import RightPanel from "@/components/RightPanel";
import { Truck, AlertTriangle, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

interface Trip {
  [key: string]: unknown;
  id: number;
  origin: string;
  destination: string;
  status: string;
  Vehicle?: {
    registrationNumber: string;
  };
  Driver?: {
    name: string;
  };
}

interface Vehicle {
  id: number;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchData = async () => {
    const tripRes = await api.get("/trips");
    const vehicleRes = await api.get("/vehicles");

    setTrips(tripRes.data);
    setVehicles(vehicleRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeFleet = vehicles.filter(v => v.status === "OnTrip").length;
  const maintenanceAlert = vehicles.filter(v => v.status === "InMaintenance").length;
  const pendingTrips = trips.filter(t => t.status === "Scheduled").length;

  const columns: Column<Trip>[] = [
    { key: "id", header: "Trip ID" },
    {
      key: "vehicle",
      header: "Vehicle",
      render: (row) => row.Vehicle?.registrationNumber || "-"
    },
    {
      key: "driver",
      header: "Driver",
      render: (row) => row.Driver?.name || "-"
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <PageLayout
      rightPanel={
        <RightPanel
          title="Fleet Overview"
          sections={[
            { title: "Active Fleet", text: "Vehicles currently on trip." },
            { title: "Maintenance", text: "Vehicles flagged for maintenance." },
            { title: "Pending Trips", text: "Trips scheduled but not completed." }
          ]}
        />
      }
    >
      <Topbar
        actions={
          <>
            <button
              onClick={() => navigate("/trips")}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              New Trip
            </button>
            <button
              onClick={() => navigate("/vehicles")}
              className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              New Vehicle
            </button>
          </>
        }
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard label="Active Fleet" value={activeFleet} icon={<Truck className="w-5 h-5" />} />
          <KPICard label="Maintenance Alert" value={maintenanceAlert} icon={<AlertTriangle className="w-5 h-5" />} />
          <KPICard label="Pending Trips" value={pendingTrips} icon={<Package className="w-5 h-5" />} />
        </div>

        <DataTable columns={columns} data={trips} />
      </div>
    </PageLayout>
  );
};

export default Dashboard;