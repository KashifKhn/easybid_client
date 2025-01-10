import { AdminDashboardOverview } from "./AdminDashboardOverview";

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <AdminDashboardOverview />
    </div>
  );
}
