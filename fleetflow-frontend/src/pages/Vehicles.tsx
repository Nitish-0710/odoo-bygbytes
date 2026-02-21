import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Topbar from "@/components/Topbar";
import DataTable, { Column } from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import Modal from "@/components/Modal";
import RightPanel from "@/components/RightPanel";
import { VEHICLE_TYPES } from "@/utils/constants";
import api from "@/services/api";

interface Vehicle {
  [key: string]: unknown; //
  id: number;
  registrationNumber: string;
  type: string;
  capacity: number;
  status: string;
}

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    registrationNumber: "",
    type: VEHICLE_TYPES[0],
    capacity: "",
  });

  // 🔥 Fetch vehicles
  const fetchVehicles = async () => {
    const res = await api.get("/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // 🔥 Add vehicle
  const handleSave = async () => {
    await api.post("/vehicles", {
      registrationNumber: form.registrationNumber,
      type: form.type,
      capacity: Number(form.capacity),
    });

    setModalOpen(false);
    setForm({ registrationNumber: "", type: VEHICLE_TYPES[0], capacity: "" });
    fetchVehicles();
  };

  const columns: Column<Vehicle>[] = [
    { key: "id", header: "ID" },
    { key: "registrationNumber", header: "Plate" },
    { key: "type", header: "Type" },
    { key: "capacity", header: "Capacity" },
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
          title="Vehicle Registry"
          sections={[
            { title: "Digital Garage", text: "All fleet vehicles are stored and managed here." },
            { title: "Live Tracking", text: "Status updates automatically when assigned to trips." },
          ]}
        />
      }
    >
      <Topbar
        actions={
          <button
            onClick={() => setModalOpen(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold"
          >
            New Vehicle
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        <DataTable columns={columns} data={vehicles} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Vehicle">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Plate Number</label>
            <input
              value={form.registrationNumber}
              onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              {VEHICLE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacity</label>
            <input
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-primary text-white rounded-lg py-2 text-sm font-semibold"
          >
            Save
          </button>
        </div>
      </Modal>
    </PageLayout>
  );
};

export default Vehicles;