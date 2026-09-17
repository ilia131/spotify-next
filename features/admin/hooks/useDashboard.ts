"use client";

import { useState } from "react";

import {
  useGetAdminUsersQuery,
  useToggleUserActiveMutation,
} from "@/redux/services/admin/adminUsersApi";

export function useDashboard() {
  const [page, setPage] = useState(1);

  const usersQuery = useGetAdminUsersQuery({
    page,
  });

  const [
    toggleUserActive,
    {
      isLoading: isTogglingUser,
    },
  ] = useToggleUserActiveMutation();

  const users = usersQuery.data?.results ?? [];

  const totalUsers = usersQuery.data?.count ?? 0;

  const handleToggleUserActive = async (id: number) => {
    try {
      await toggleUserActive(id).unwrap();
    } catch (error) {
      console.error(
        "Failed to toggle user status:",
        error
      );
    }
  };

  const goToNextPage = () => {
    if (usersQuery.data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (usersQuery.data?.previous) {
      setPage((prev) => Math.max(1, prev - 1));
    }
  };

  return {
    users,
    totalUsers,

    page,

    hasNextPage: Boolean(usersQuery.data?.next),
    hasPreviousPage: Boolean(
      usersQuery.data?.previous
    ),

    isLoading: usersQuery.isLoading,
    isFetching: usersQuery.isFetching,
    isError: usersQuery.isError,

    nextPage: goToNextPage,
    previousPage: goToPreviousPage,

    toggleUserActive: handleToggleUserActive,
    isTogglingUser,
  };
}