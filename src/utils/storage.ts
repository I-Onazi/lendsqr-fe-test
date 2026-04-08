import type { User } from "../types";

const DB_NAME = "lendsqr-db";
const DB_VERSION = 1;
const STORE_NAME = "users";

let db: IDBDatabase | null = null;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error("Failed to open IndexedDB"));
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

export const saveUserToStorage = async (user: User): Promise<void> => {
  try {
    const database = await openDB();
    const transaction = database.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put(user);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error("Failed to save user"));
    });
  } catch {
    // Fallback to localStorage
    localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
  }
};

export const getUserFromStorage = async (
  userId: string,
): Promise<User | null> => {
  try {
    const database = await openDB();
    const transaction = database.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(userId);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(new Error("Failed to get user"));
    });
  } catch {
    // Fallback to localStorage
    const data = localStorage.getItem(`user_${userId}`);
    return data ? JSON.parse(data) : null;
  }
};

export const removeUserFromStorage = async (userId: string): Promise<void> => {
  try {
    const database = await openDB();
    const transaction = database.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.delete(userId);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error("Failed to delete user"));
    });
  } catch {
    // Fallback to localStorage
    localStorage.removeItem(`user_${userId}`);
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    const database = await openDB();
    const transaction = database.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.clear();

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error("Failed to clear storage"));
    });
  } catch {
    // Clear localStorage fallback entries
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("user_"),
    );
    keys.forEach((key) => localStorage.removeItem(key));
  }
};
