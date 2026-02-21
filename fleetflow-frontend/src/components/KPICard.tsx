import { ReactNode } from "react";

interface KPICardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

const KPICard = ({ label, value, icon }: KPICardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm flex items-center gap-4">
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
};

export default KPICard;
