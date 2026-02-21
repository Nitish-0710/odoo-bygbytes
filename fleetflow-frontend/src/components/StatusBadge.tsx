const statusStyles: Record<string, string> = {
  "On Trip": "bg-status-active/15 text-status-active",
  "Active": "bg-status-active/15 text-status-active",
  "Completed": "bg-status-info/15 text-status-info",
  "Idle": "bg-status-warning/15 text-status-warning",
  "In Shop": "bg-status-danger/15 text-status-danger",
  "Draft": "bg-muted text-muted-foreground",
  "Dispatched": "bg-status-info/15 text-status-info",
  "Cancelled": "bg-status-danger/15 text-status-danger",
  "Pending": "bg-status-warning/15 text-status-warning",
  "In Progress": "bg-status-info/15 text-status-info",
  "Approved": "bg-status-active/15 text-status-active",
  "Rejected": "bg-status-danger/15 text-status-danger",
  "On Duty": "bg-status-active/15 text-status-active",
  "Taking Break": "bg-status-warning/15 text-status-warning",
  "Suspended": "bg-status-danger/15 text-status-danger",
  "Valid": "bg-status-active/15 text-status-active",
  "Expired": "bg-status-danger/15 text-status-danger",
};

const StatusBadge = ({ status }: { status: string }) => {
  const style = statusStyles[status] || "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
