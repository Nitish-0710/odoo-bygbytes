import { Search } from "lucide-react";
import { ReactNode } from "react";

interface TopbarProps {
  actions?: ReactNode;
}

const Topbar = ({ actions }: TopbarProps) => {
  return (
    <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-card">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <select className="text-sm border border-input rounded-lg px-3 py-2 bg-background text-foreground">
        <option>Group by</option>
      </select>
      <select className="text-sm border border-input rounded-lg px-3 py-2 bg-background text-foreground">
        <option>Filter</option>
      </select>
      <select className="text-sm border border-input rounded-lg px-3 py-2 bg-background text-foreground">
        <option>Sort by</option>
      </select>
      {actions}
    </div>
  );
};

export default Topbar;
