"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const role = user?.user.role;

  useEffect(() => {
    if (role === "ADMIN") router.push("/dashboard/admin");
    else if (role === "SELLER") router.push("/dashboard/seller");
    else if (role === "BUYER") router.push("/dashboard/buyer");
    else router.push("/auth/signin");
  }, [role, router]);

  return null;
}
