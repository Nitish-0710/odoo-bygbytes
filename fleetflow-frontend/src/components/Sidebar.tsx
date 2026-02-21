import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Truck,
  Route,
  Wrench,
  Receipt,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Vehicle Registry", path: "/vehicles", icon: Truck },
  { label: "Trip Dispatcher", path: "/trips", icon: Route },
  { label: "Maintenance", path: "/maintenance", icon: Wrench },
  { label: "Trip & Expense", path: "/expense", icon: Receipt },
  { label: "Performance", path: "/drivers", icon: Users },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <aside className="w-60 bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold text-sidebar-accent-foreground tracking-tight">
          Fleet Flow
        </h1>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="px-3 pb-4">
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
