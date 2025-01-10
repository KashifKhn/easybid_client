"use client";

import { UserList } from "@/components/dashboard/UserList";
import { GlobalErrorState } from "@/components/GlobalErrorState";
import { GlobalLoadingState } from "@/components/GlobalLoadingState";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";

const UserPage = () => {
  const { usersQuery, useDeleteUser } = useUsers();

  const { data: users, isLoading, isError, error, refetch } = usersQuery;

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { mutateAsync } = useDeleteUser();

  const handleDeleteUser = async (id: string) => {
    setDeletingId(id);
    try {
      await mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading)
    return <GlobalLoadingState message="Loading users details..." />;
  if (isError)
    return (
      <GlobalErrorState
        title="Failed to fetch users"
        message={error?.message}
        onRetry={refetch}
      />
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Items</h1>
      </div>
      <UserList
        users={users || []}
        isDeleting={deletingId}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default UserPage;
