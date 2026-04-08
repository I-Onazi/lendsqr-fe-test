import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUsers, fetchUserById, updateUserStatus } from "./userService";
import { getUserFromStorage, saveUserToStorage } from "../utils/storage";
import type { User } from "../types";

vi.mock("../utils/storage", () => ({
  getUserFromStorage: vi.fn(),
  saveUserToStorage: vi.fn(),
}));

// Mock the global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("userService", () => {
  const mockUser: Partial<User> = { id: "usr-000001", status: "Active", username: "John Doe" };
  const mockUserList = [mockUser, { id: "usr-000002", status: "Pending" }];

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  describe("API Fetching (Positive & Negative)", () => {
    it("should fetch users successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserList,
      });

      const users = await fetchUsers();
      expect(users).toHaveLength(2);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("should throw error when fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchUsers()).rejects.toThrow("Failed to fetch users");
    });
  });

  describe("fetchUserById Caching Logic", () => {
    it("should return user from storage immediately if cached (0 network cost)", async () => {
      vi.mocked(getUserFromStorage).mockResolvedValueOnce(mockUser as User);

      const result = await fetchUserById("usr-000001");

      expect(result).toEqual(mockUser);
      expect(getUserFromStorage).toHaveBeenCalledWith("usr-000001");
      expect(mockFetch).not.toHaveBeenCalled(); // Network skipped!
    });

    it("should fetch via API if not in storage, then cache it downward", async () => {
      // Not in storage
      vi.mocked(getUserFromStorage).mockResolvedValueOnce(null);
      // Let API succeed
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserList,
      });

      const result = await fetchUserById("usr-000001");

      expect(result).toEqual(mockUser);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(saveUserToStorage).toHaveBeenCalledWith(mockUser);
    });

    it("should return null if user is not in storage and not in API fallback", async () => {
      vi.mocked(getUserFromStorage).mockResolvedValueOnce(null);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserList,
      });

      const result = await fetchUserById("non-existent");
      expect(result).toBeNull();
    });
  });

  describe("updateUserStatus", () => {
    it("should update status in storage if user exists", async () => {
      // Simulate retrieving the user
      vi.mocked(getUserFromStorage).mockResolvedValueOnce(mockUser as User);

      const updated = await updateUserStatus("usr-000001", "Blacklisted");

      expect(updated?.status).toBe("Blacklisted");
      expect(saveUserToStorage).toHaveBeenCalled();
    });
  });
});
