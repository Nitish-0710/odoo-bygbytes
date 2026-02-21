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
  fuelCost: number;
  status: string;
}

const ExpensePage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    tripId: "",
    liters: "",
    costPerLiter: "",
  });

  const fetchTrips = async () => {
    const res = await api.get("/trips");
    setTrips(res.data);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleCreate = async () => {
    await api.post("/fuel", {
      tripId: Number(form.tripId),
      liters: Number(form.liters),
      costPerLiter: Number(form.costPerLiter),
    });

    setModalOpen(false);
    setForm({ tripId: "", liters: "", costPerLiter: "" });
    fetchTrips();
  };

  const columns: Column<Trip>[] = [
    { key: "id", header: "Trip ID" },
    { key: "origin", header: "Origin" },
    { key: "destination", header: "Destination" },
    { key: "fuelCost", header: "Fuel Cost" },
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
          title="Fuel & Expense Tracking"
          sections={[
            { title: "Fuel Logging", text: "Add fuel expense to any active trip." },
            { title: "Profit Impact", text: "Fuel and maintenance reduce trip profit automatically." },
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
            Add Fuel Expense
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        <DataTable columns={columns} data={trips} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Fuel Expense">
        <div className="space-y-3">

          <select
            value={form.tripId}
            onChange={(e) => setForm({ ...form, tripId: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Trip</option>
            {trips.map(t => (
              <option key={t.id} value={t.id}>
                Trip #{t.id} - {t.origin} → {t.destination}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Liters"
            value={form.liters}
            onChange={(e) => setForm({ ...form, liters: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Cost Per Liter"
            value={form.costPerLiter}
            onChange={(e) => setForm({ ...form, costPerLiter: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreate}
              className="flex-1 bg-primary text-white rounded-lg py-2 text-sm font-semibold"
            >
              Save
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

export default ExpensePage;