import { Header } from "@/src/app/(dashboard)/_components/header";
import { Sidebar } from "@/src/components/layout/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-16 flex h-[calc(100vh-4rem)] ">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="container border mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
