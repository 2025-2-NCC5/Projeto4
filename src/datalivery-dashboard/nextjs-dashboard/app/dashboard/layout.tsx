import SideNav from "../ui/dashboard/sidenav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#EFE9DD] text-[#3A2F2A]">
      <div className="w-64 bg-white shadow-md">
        <SideNav />
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>
    </div>
  );
}