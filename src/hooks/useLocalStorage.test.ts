import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // Positive tests - Initial value
  describe("Initial Value", () => {
    it("should return initial value when localStorage is empty", () => {
      const { result } = renderHook(() =>
        useLocalStorage("testKey", "default"),
      );
      expect(result.current[0]).toBe("default");
    });

    it("should return stored value when localStorage has data", () => {
      localStorage.setItem("testKey", JSON.stringify("stored value"));
      const { result } = renderHook(() =>
        useLocalStorage("testKey", "default"),
      );
      expect(result.current[0]).toBe("stored value");
    });

    it("should handle object initial values", () => {
      const initialValue = { name: "test", count: 0 };
      const { result } = renderHook(() =>
        useLocalStorage("testKey", initialValue),
      );
      expect(result.current[0]).toEqual(initialValue);
    });

    it("should handle array initial values", () => {
      const initialValue = [1, 2, 3];
      const { result } = renderHook(() =>
        useLocalStorage("testKey", initialValue),
      );
      expect(result.current[0]).toEqual(initialValue);
    });

    it("should handle boolean initial values", () => {
      const { result } = renderHook(() => useLocalStorage("testKey", true));
      expect(result.current[0]).toBe(true);
    });

    it("should handle number initial values", () => {
      const { result } = renderHook(() => useLocalStorage("testKey", 42));
      expect(result.current[0]).toBe(42);
    });
  });

  // Positive tests - Setting values
  describe("Setting Values", () => {
    it("should update state when setValue is called", () => {
      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initial"),
      );

      act(() => {
        result.current[1]("new value");
      });

      expect(result.current[0]).toBe("new value");
    });

    it("should update localStorage when setValue is called", () => {
      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initial"),
      );

      act(() => {
        result.current[1]("new value");
      });

      expect(localStorage.getItem("testKey")).toBe(JSON.stringify("new value"));
    });

    it("should support functional updates", () => {
      const { result } = renderHook(() => useLocalStorage("counter", 0));

      act(() => {
        result.current[1]((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(1);

      act(() => {
        result.current[1]((prev) => prev + 5);
      });

      expect(result.current[0]).toBe(6);
    });

    it("should update objects correctly", () => {
      const { result } = renderHook(() =>
        useLocalStorage("user", { name: "John", age: 30 }),
      );

      act(() => {
        result.current[1]({ name: "Jane", age: 25 });
      });

      expect(result.current[0]).toEqual({ name: "Jane", age: 25 });
    });

    it("should update arrays correctly", () => {
      const { result } = renderHook(() => useLocalStorage("items", [1, 2]));

      act(() => {
        result.current[1]((prev) => [...prev, 3]);
      });

      expect(result.current[0]).toEqual([1, 2, 3]);
    });
  });

  // Positive tests - Persistence
  describe("Persistence", () => {
    it("should persist values across hook re-renders", () => {
      const { result, rerender } = renderHook(() =>
        useLocalStorage("testKey", "initial"),
      );

      act(() => {
        result.current[1]("updated");
      });

      rerender();

      expect(result.current[0]).toBe("updated");
    });

    it("should read persisted value on new hook mount", () => {
      // First hook sets value
      const { result: result1, unmount } = renderHook(() =>
        useLocalStorage("testKey", "initial"),
      );

      act(() => {
        result1.current[1]("persisted");
      });

      unmount();

      // Second hook reads persisted value
      const { result: result2 } = renderHook(() =>
        useLocalStorage("testKey", "default"),
      );

      expect(result2.current[0]).toBe("persisted");
    });
  });

  // Negative tests - Error handling
  describe("Error Handling", () => {
    it("should return initial value when localStorage has invalid JSON", () => {
      localStorage.setItem("testKey", "invalid json{");
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "default"),
      );

      expect(result.current[0]).toBe("default");
      expect(warnSpy).toHaveBeenCalled();

      warnSpy.mockRestore();
    });

    it("should handle localStorage.setItem errors gracefully", () => {
      const setItemSpy = vi
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceededError");
        });
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initial"),
      );

      act(() => {
        result.current[1]("new value");
      });

      // State should still update even if localStorage fails
      expect(result.current[0]).toBe("new value");
      expect(warnSpy).toHaveBeenCalled();

      setItemSpy.mockRestore();
      warnSpy.mockRestore();
    });

    it("should handle localStorage.getItem errors gracefully", () => {
      const getItemSpy = vi
        .spyOn(Storage.prototype, "getItem")
        .mockImplementation(() => {
          throw new Error("SecurityError");
        });
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "default"),
      );

      expect(result.current[0]).toBe("default");

      getItemSpy.mockRestore();
      warnSpy.mockRestore();
    });
  });

  // Negative tests - Edge cases
  describe("Edge Cases", () => {
    it("should handle empty string key", () => {
      const { result } = renderHook(() => useLocalStorage("", "value"));
      expect(result.current[0]).toBe("value");
    });

    it("should handle null as stored value", () => {
      localStorage.setItem("testKey", JSON.stringify(null));
      const { result } = renderHook(() =>
        useLocalStorage("testKey", "default"),
      );
      expect(result.current[0]).toBeNull();
    });

    it("should handle undefined replacement with null in JSON", () => {
      const { result } = renderHook(() =>
        useLocalStorage<{ a?: string }>("testKey", { a: undefined }),
      );
      // JSON.stringify converts undefined to nothing in objects
      expect(result.current[0]).toEqual({});
    });

    it("should handle setting null value", () => {
      const { result } = renderHook(() =>
        useLocalStorage<string | null>("testKey", "initial"),
      );

      act(() => {
        result.current[1](null);
      });

      expect(result.current[0]).toBeNull();
      expect(localStorage.getItem("testKey")).toBe("null");
    });

    it("should handle different keys independently", () => {
      const { result: result1 } = renderHook(() =>
        useLocalStorage("key1", "value1"),
      );
      const { result: result2 } = renderHook(() =>
        useLocalStorage("key2", "value2"),
      );

      act(() => {
        result1.current[1]("updated1");
      });

      expect(result1.current[0]).toBe("updated1");
      expect(result2.current[0]).toBe("value2");
    });
  });

  // Type safety tests
  describe("Type Safety", () => {
    it("should maintain type inference for primitives", () => {
      const { result } = renderHook(() => useLocalStorage("count", 0));

      act(() => {
        // TypeScript should allow number
        result.current[1](5);
      });

      expect(result.current[0]).toBe(5);
    });

    it("should maintain type inference for complex types", () => {
      interface User {
        id: number;
        name: string;
      }

      const { result } = renderHook(() =>
        useLocalStorage<User>("user", { id: 1, name: "John" }),
      );

      act(() => {
        result.current[1]({ id: 2, name: "Jane" });
      });

      expect(result.current[0].id).toBe(2);
      expect(result.current[0].name).toBe("Jane");
    });
  });
});
