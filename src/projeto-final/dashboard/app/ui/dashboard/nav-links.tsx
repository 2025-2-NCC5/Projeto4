"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon, UsersIcon, ChartBarIcon, MegaphoneIcon, QuestionMarkCircleIcon, QueueListIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { LinkIcon } from "@heroicons/react/20/solid";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Ações por Segmento", href: "/dashboard/segment-actions", icon: MegaphoneIcon },
  { name: "Ranking", href: "/dashboard/ranking", icon: UsersIcon },
  { name: "NPS", href: "/dashboard/nps", icon: ChartBarIcon },
  { name: "Chatbot", href: "/dashboard/chat", icon: ChatBubbleLeftRightIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ name, href, icon: Icon }) => {
        const active = pathname === href;
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
