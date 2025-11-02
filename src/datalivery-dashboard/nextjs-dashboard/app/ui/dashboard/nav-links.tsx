"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Ranking de Clientes", href: "/dashboard/ranking", icon: "🥇" },
  { name: "NPS", href: "/dashboard/nps", icon: "⭐" },
  { name: "Clusterização", href: "/dashboard/clusters", icon: "🎯" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => {
        const active = pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
              active
                ? "bg-[#F26A21] text-white"
                : "text-[#3A2F2A] hover:bg-[#f5d9c7]"
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-sm font-medium">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}