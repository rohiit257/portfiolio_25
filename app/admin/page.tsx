import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata = {
  title: "Admin | Portfolio",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard />
    </main>
  );
}
