"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { theme } from "@/styles/theme";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav
      style={{ backgroundColor: theme.colors.primary, color: "white" }}
      className="shadow-md fixed w-full z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">EasyBid</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/items"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === "/items" ? "border-white text-white" : "border-transparent text-white/70 hover:text-white hover:border-white/70"}`}
              >
                All Items
              </Link>
              <Link
                href="/auctions"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === "/auctions" ? "border-white text-white" : "border-transparent text-white/70 hover:text-white hover:border-white/70"}`}
              >
                Auctions
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <>
              <Link href={`/admin/dashboard`}>
                <Button variant="secondary">Dashboard</Button>
              </Link>
              <Button
                variant="ghost"
                className="text-white hover:text-white/90 ml-4"
              >
                Logout
              </Button>
            </>
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-white hover:text-white/90"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="secondary">Get Started</Button>
              </Link>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
