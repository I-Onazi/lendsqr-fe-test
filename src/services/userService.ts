import type { User, UserFilters } from "../types";
import { saveUserToStorage, getUserFromStorage } from "../utils/storage";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "/mock-api/users.json";
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  // First check local storage/IndexedDB
  const storedUser = await getUserFromStorage(id);
  if (storedUser) {
    return storedUser;
  }

  // Otherwise fetch from API and cache
  try {
    const users = await fetchUsers();
    const user = users.find((u) => u.id === id);

    if (user) {
      // Save to local storage for future access
      await saveUserToStorage(user);
      return user;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching individual user from Mock API", error);
    return null;
  }
};

export const filterUsers = (users: User[], filters: UserFilters): User[] => {
  return users.filter((user) => {
    if (
      filters.organization &&
      !user.organization
        .toLowerCase()
        .includes(filters.organization.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.username &&
      !user.username.toLowerCase().includes(filters.username.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.email &&
      !user.email.toLowerCase().includes(filters.email.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.phoneNumber &&
      !user.phoneNumber.includes(filters.phoneNumber)
    ) {
      return false;
    }
    if (filters.status && user.status !== filters.status) {
      return false;
    }
    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString();
      const userDate = new Date(user.dateJoined).toDateString();
      if (filterDate !== userDate) {
        return false;
      }
    }
    return true;
  });
};

export const getUserStats = (users: User[]) => {
  return {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "Active").length,
    usersWithLoans: users.filter(
      (u) =>
        parseInt(
          u.educationAndEmployment.loanRepayment.replace(/[^0-9]/g, ""),
        ) > 0,
    ).length,
    usersWithSavings: users.filter(
      (u) => parseFloat(u.accountBalance.replace(/[^0-9.]/g, "")) > 50000,
    ).length,
  };
};

export const updateUserStatus = async (
  userId: string,
  status: User["status"],
): Promise<User | null> => {
  // We can't mutate the mock REST API backend, so we simulate server action 
  // by updating our local storage cache record for this specific user.
  
  let user = await getUserFromStorage(userId);
  
  if (!user) {
    // Fallback if not cached yet
    const users = await fetchUsers();
    user = users.find(u => u.id === userId) || null;
  }

  if (user) {
    user.status = status;
    await saveUserToStorage(user);
    return user;
  }

  return null;
};
