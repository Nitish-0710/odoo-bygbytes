import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Topbar from "@/components/Topbar";
import DataTable, { Column } from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import Modal from "@/components/Modal";
import RightPanel from "@/components/RightPanel";
import api from "@/services/api";

interface MaintenanceLog {
  [key: string]: unknown;
  id: number;
  description: string;
  cost: number;
  createdAt: string;
  Vehicle?: {
    registrationNumber: string;
  };
}

interface Vehicle {
  id: number;
  registrationNumber: string;
}

const Maintenance = () => {
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    vehicleId: "",
    description: "",
    cost: "",
  });

  const fetchData = async () => {
    const logRes = await api.get("/maintenance");
    const vehicleRes = await api.get("/vehicles");

    setLogs(logRes.data);
    setVehicles(vehicleRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    await api.post("/maintenance", {
      vehicleId: Number(form.vehicleId),
      description: form.description,
      cost: Number(form.cost),
    });

    setModalOpen(false);
    setForm({ vehicleId: "", description: "", cost: "" });
    fetchData();
  };

  const columns: Column<MaintenanceLog>[] = [
    { key: "id", header: "ID" },
    {
      key: "vehicle",
      header: "Vehicle",
      render: (row) => row.Vehicle?.registrationNumber || "-"
    },
    { key: "description", header: "Issue/Service" },
    { key: "cost", header: "Cost" },
    {
      key: "status",
      header: "Status",
      render: () => <StatusBadge status="Completed" />
    },
  ];

  return (
    <PageLayout
      rightPanel={
        <RightPanel
          title="Maintenance Logs"
          sections={[
            { title: "Logging Repairs", text: "Track vehicle servicing and repairs." },
            { title: "Cost Tracking", text: "Maintenance automatically updates vehicle costs." },
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
            Create New Service
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        <DataTable columns={columns} data={logs} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Service Log">
        <div className="space-y-3">

          <select
            value={form.vehicleId}
            onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Vehicle</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>
                {v.registrationNumber}
              </option>
            ))}
          </select>

          <input
            placeholder="Issue/Service"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Cost"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreate}
              className="flex-1 bg-primary text-white rounded-lg py-2 text-sm font-semibold"
            >
              Create
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 border rounded-lg py-2 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
};

export default Maintenance;