"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  MegaphoneIcon,
  UsersIcon,
  SparklesIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

const links = [
  { name: "Visão Geral", href: "/dashboard", icon: HomeIcon },
  { name: "Performance", href: "/dashboard/performance", icon: MegaphoneIcon },
  { name: "Clientes", href: "/dashboard/clientes", icon: UsersIcon },
  { name: "Campanhas", href: "/dashboard/campanhas", icon: SparklesIcon },
  { name: "Satisfação", href: "/dashboard/satisfacao", icon: ChartBarIcon },
  { name: "Relatórios", href: "/dashboard/relatorios", icon: DocumentChartBarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ name, href, icon: Icon }) => {
  const isRootDashboard = href === "/dashboard";
  const active = isRootDashboard
    ? pathname === "/dashboard"
    : pathname.startsWith(href) && pathname !== "/dashboard";

  return (
    <Link
      key={href}
      href={href}
      className={
        active
          ? "flex items-center gap-2 px-3 py-2 rounded-md bg-[#F26A21] text-white font-medium"
          : "flex items-center gap-2 px-3 py-2 rounded-md text-[#3A2F2A] hover:bg-[#f2d7bf] transition font-medium"
      }
    >
      <Icon className="w-5" />
      {name}
    </Link>
  );
})}

    </nav>
  );
}
