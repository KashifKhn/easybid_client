"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getNavItems } from "@/constans/constants";
import { useAuth } from "@/hooks/useAuth";

interface DashboardSidebarProps {
  open: boolean;
}

export function DashboardSidebar({ open }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return;
  }

  const navItems = getNavItems(user?.user.role);

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "min-h-screen bg-muted border-r transition-all duration-300 ease-in-out",
          open ? "w-64" : "w-[70px]",
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "flex h-14 items-center border-b px-4",
              open ? "justify-start" : "justify-center",
            )}
          >
            {open ? (
              <Link href="/" className="font-bold">
                EasyBid
              </Link>
            ) : (
              <Link href="/" className="font-bold text-2xl">
                EB
              </Link>
            )}
          </div>
          <ScrollArea className="flex-1">
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const NavItem = (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", {
                      "bg-secondary hover:bg-secondary": isActive,
                    })}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={cn("h-4 w-4", open ? "mr-2" : "mr-0")}
                      />
                      {open && item.title}
                    </Link>
                  </Button>
                );

                return open ? (
                  NavItem
                ) : (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                );
              })}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  );
}
