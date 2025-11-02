import SideNav from "@/app/ui/dashboard/sidenav";
import TopBar from "@/app/ui/dashboard/topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-60 shrink-0">
        <SideNav />
      </div>

      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}