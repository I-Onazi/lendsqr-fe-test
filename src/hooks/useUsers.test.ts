import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useUsers } from "./useUsers";
import * as userService from "../services/userService";
import type { User } from "../types";

// Mock the userService functions
vi.mock("../services/userService", () => ({
  fetchUsers: vi.fn(),
  filterUsers: vi.fn(),
  getUserStats: vi.fn(),
}));

const mockUsers: Partial<User>[] = [
  { id: "1", organization: "Lendsqr", status: "Active", email: "test@lendsqr.com" },
  { id: "2", organization: "Irise", status: "Inactive", email: "user@irise.com" },
  { id: "3", organization: "Lendsqr", status: "Pending", email: "pending@lendsqr.com" },
];

describe("useUsers hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Positive Scenarios", () => {
    it("should fetch users and set initial state correctly", async () => {
      vi.mocked(userService.fetchUsers).mockResolvedValue(mockUsers as User[]);
      vi.mocked(userService.filterUsers).mockReturnValue(mockUsers as User[]);
      vi.mocked(userService.getUserStats).mockReturnValue({
        totalUsers: 3,
        activeUsers: 1,
        usersWithLoans: 0,
        usersWithSavings: 0,
      });

      const { result } = renderHook(() => useUsers());

      // Initial loading state
      expect(result.current.loading).toBe(true);

      // Wait for fetch to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.users).toEqual(mockUsers);
      expect(result.current.error).toBeNull();
      expect(result.current.stats.totalUsers).toBe(3);
      expect(result.current.organizations).toContain("Lendsqr");
    });

    it("should correctly handle pagination limits", async () => {
      // Create 25 mock users to test pagination math
      const manyUsers = Array.from({ length: 25 }).map((_, i) => ({ id: `${i}` }));
      vi.mocked(userService.fetchUsers).mockResolvedValue(manyUsers as User[]);
      vi.mocked(userService.filterUsers).mockReturnValue(manyUsers as User[]);

      const { result } = renderHook(() => useUsers());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Default pageSize is 10, so totalPages should be Math.ceil(25/10) = 3
      expect(result.current.totalPages).toBe(3);
      
      // Paginated users on page 1 should be 10 items
      expect(result.current.paginatedUsers).toHaveLength(10);
    });
  });

  describe("Negative Scenarios", () => {
    it("should handle API fetch failures gracefully", async () => {
      vi.mocked(userService.fetchUsers).mockRejectedValue(new Error("Network Error"));

      const { result } = renderHook(() => useUsers());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe("Failed to load users");
      expect(result.current.users).toEqual([]);
    });

    it("should reset to page 1 when filtering yields fewer results", async () => {
      vi.mocked(userService.fetchUsers).mockResolvedValue(mockUsers as User[]);
      // Mock that applying a filter drastically drops results
      vi.mocked(userService.filterUsers).mockReturnValue([mockUsers[0]] as User[]);

      const { result } = renderHook(() => useUsers());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Apply a filter string
      result.current.setFilters({ ...result.current.filters, organization: "SpecificOrg" });

      expect(result.current.currentPage).toBe(1);
    });
  });
});
