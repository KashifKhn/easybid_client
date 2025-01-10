"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateUser } from "@/types/";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const { useUpdateUser } = useUsers();
  const { mutateAsync, isPending } = useUpdateUser();
  const router = useRouter();

  const handleSubmit = async (data: UpdateUser) => {
    try {
      await mutateAsync({ userId: user?.user.id || "", data });

      toast.success("your Profile has been successfully updated.", {
        position: "top-right",
      });
      router.push("/dashboard/seller/items");
    } catch (error) {
      console.log("edit profile ", error);
      if (error instanceof Error) {
        toast.error("Failed to update profile" + error?.message, {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-20 w-20 cursor-pointer">
              <AvatarFallback>{user?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Remove Image</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>
      </div>

      <ProfileForm
        userData={user?.user}
        onSubmit={handleSubmit}
        isLoading={isPending}
      />
    </div>
  );
}
