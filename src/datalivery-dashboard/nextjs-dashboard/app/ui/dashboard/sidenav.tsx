"use client";

import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import DataliveryLogo from "@/app/ui/datalivery-logo";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <div
      className="flex h-full flex-col px-4 py-6 border-r"
      style={{ backgroundColor: "#EFE9DD", color: "#3A2F2A" }}
    >
      <Link href="/" className="mb-6 flex items-center">
        <DataliveryLogo />
      </Link>

      <div className="flex flex-col gap-2 flex-1">
        <NavLinks />

        <div className="flex-1" />

        <form>
          <button
            className="flex w-full items-center gap-2 rounded-md p-3 text-sm font-medium transition"
            style={{
              backgroundColor: "#F26A21",
              color: "white",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f48441")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F26A21")}
          >
            <PowerIcon className="w-5" />
            Sair
          </button>
        </form>
      </div>
    </div>
  );
}