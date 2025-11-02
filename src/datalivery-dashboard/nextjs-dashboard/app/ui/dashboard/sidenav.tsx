"use client";

import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import DataliveryLogo from "@/app/ui/datalivery-logo";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col px-4 py-6 border-r bg-[#EFE9DD] text-[#3A2F2A]">

      {/* Logo maior */}
      <Link href="/" className="mb-8 flex items-center justify-center">
        <div className="w-44">
          <DataliveryLogo />
        </div>
      </Link>

      {/* Links */}
      <div className="flex flex-col gap-2 flex-1">
        <NavLinks />
        <div className="flex-1" />

        {/* Botão Sair */}
        <button
          type="button"
          onClick={() => window.location.href = "/"}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md bg-[#F26A21] text-white hover:bg-[#f48441] transition font-medium"
        >
          <PowerIcon className="w-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
