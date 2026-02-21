import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Topbar from "@/components/Topbar";
import DataTable, { Column } from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import Modal from "@/components/Modal";
import RightPanel from "@/components/RightPanel";
import api from "@/services/api";

interface Trip {
  [key: string]: unknown;
  id: number;
  origin: string;
  destination: string;
  revenue: number;
  status: string;
  vehicleId: number;
  driverId: number;
}

interface Vehicle {
  id: number;
  registrationNumber: string;
}

interface Driver {
  id: number;
  name: string;
}

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    origin: "",
    destination: "",
    revenue: "",
    vehicleId: "",
    driverId: "",
  });

  const fetchTrips = async () => {
    const res = await api.get("/trips");
    setTrips(res.data);
  };

  const fetchVehicles = async () => {
    const res = await api.get("/vehicles");
    setVehicles(res.data);
  };

  const fetchDrivers = async () => {
    const res = await api.get("/drivers");
    setDrivers(res.data);
  };

  useEffect(() => {
    fetchTrips();
    fetchVehicles();
    fetchDrivers();
  }, []);

  const handleSave = async () => {
    await api.post("/trips", {
      origin: form.origin,
      destination: form.destination,
      revenue: Number(form.revenue),
      vehicleId: Number(form.vehicleId),
      driverId: Number(form.driverId),
    });

    setModalOpen(false);
    setForm({ origin: "", destination: "", revenue: "", vehicleId: "", driverId: "" });
    fetchTrips();
  };

  const columns: Column<Trip>[] = [
    { key: "id", header: "ID" },
    { key: "origin", header: "Origin" },
    { key: "destination", header: "Destination" },
    { key: "revenue", header: "Revenue" },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <PageLayout
      rightPanel={
        <RightPanel
          title="Trip Dispatcher"
          sections={[
            { title: "Dispatch Flow", text: "Assign vehicle and driver to create a trip." },
            { title: "Lifecycle", text: "Trips move from Scheduled → Completed." },
          ]}
        />
      }
    >
      <Topbar
        actions={
          <button
            onClick={() => setModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            New Trip
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        <DataTable columns={columns} data={trips} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Trip">
        <div className="space-y-3">

          <input
            placeholder="Origin"
            value={form.origin}
            onChange={(e) => setForm({ ...form, origin: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            placeholder="Destination"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Revenue"
            value={form.revenue}
            onChange={(e) => setForm({ ...form, revenue: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={form.vehicleId}
            onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.registrationNumber}
              </option>
            ))}
          </select>

          <select
            value={form.driverId}
            onChange={(e) => setForm({ ...form, driverId: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Driver</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="w-full bg-primary text-white rounded-lg py-2 text-sm font-semibold"
          >
            Create Trip
          </button>
        </div>
      </Modal>
    </PageLayout>
  );
};

export default Trips;