import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Topbar from "@/components/Topbar";
import DataTable, { Column } from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import Modal from "@/components/Modal";
import RightPanel from "@/components/RightPanel";
import api from "@/services/api";

interface Driver {
  [key: string]: unknown;
  id: number;
  name: string;
  licenseNumber: string;
  licenseExpiry: string;
  category: string;
  status: string;
}

const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    licenseNumber: "",
    licenseExpiry: "",
    category: "Heavy",
  });

  const fetchDrivers = async () => {
    const res = await api.get("/drivers");
    setDrivers(res.data);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSave = async () => {
    await api.post("/drivers", form);
    setModalOpen(false);
    setForm({ name: "", licenseNumber: "", licenseExpiry: "", category: "Heavy" });
    fetchDrivers();
  };

  const columns: Column<Driver>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "licenseNumber", header: "License#" },
    { key: "licenseExpiry", header: "Expiry" },
    { key: "category", header: "Category" },
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
          title="Driver Profiles"
          sections={[
            { title: "Compliance", text: "Drivers must have valid licenses to operate." },
            { title: "Categories", text: "Heavy drivers operate trucks. Light drivers operate vans/cars." },
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
            New Driver
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        <DataTable columns={columns} data={drivers} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Driver">
        <div className="space-y-3">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            placeholder="License Number"
            value={form.licenseNumber}
            onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={form.licenseExpiry}
            onChange={(e) => setForm({ ...form, licenseExpiry: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="Heavy">Heavy</option>
            <option value="Light">Light</option>
          </select>

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

export default Drivers;