import { useState, useEffect, useCallback } from "react";
import type { User, UserFilters } from "../types";
import { fetchUsers, filterUsers, getUserStats } from "../services/userService";

interface UseUsersReturn {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  filters: UserFilters;
  setFilters: (filters: UserFilters) => void;
  resetFilters: () => void;
  stats: {
    totalUsers: number;
    activeUsers: number;
    usersWithLoans: number;
    usersWithSavings: number;
  };
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  paginatedUsers: User[];
  totalPages: number;
  organizations: string[];
}

const initialFilters: UserFilters = {
  organization: "",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: "",
};

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = filterUsers(users, filters);
  const stats = getUserStats(users);
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const organizations = [...new Set(users.map((u) => u.organization))];

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setCurrentPage(1);
  }, []);

  const handleSetFilters = useCallback((newFilters: UserFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  return {
    users,
    filteredUsers,
    loading,
    error,
    filters,
    setFilters: handleSetFilters,
    resetFilters,
    stats,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    paginatedUsers,
    totalPages,
    organizations,
  };
};
