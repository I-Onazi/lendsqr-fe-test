import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatCurrency,
  formatPhoneNumber,
  capitalizeFirst,
  truncateText,
} from "./formatters";

describe("formatDate", () => {
  // Positive tests
  it("should format a valid date string correctly", () => {
    const result = formatDate("2024-01-15T10:30:00");
    expect(result).toMatch(/Jan 15 2024/);
  });

  it("should include time in the formatted output", () => {
    const result = formatDate("2024-06-20T14:45:00");
    expect(result).toMatch(/Jun 20 2024/);
    expect(result).toMatch(/\d{1,2}:\d{2}/); // Time format
  });

  it("should handle different months correctly", () => {
    expect(formatDate("2024-12-25T00:00:00")).toMatch(/Dec 25 2024/);
    expect(formatDate("2024-03-01T00:00:00")).toMatch(/Mar 1 2024/);
  });

  // Negative tests
  it("should handle invalid date strings gracefully", () => {
    const result = formatDate("invalid-date");
    expect(result).toBe("Invalid Date");
  });

  it("should handle empty string", () => {
    const result = formatDate("");
    expect(result).toBe("Invalid Date");
  });
});

describe("formatCurrency", () => {
  // Positive tests
  it("should format number to Nigerian Naira", () => {
    const result = formatCurrency(1000);
    expect(result).toContain("₦");
    expect(result).toMatch(/1,000/);
  });

  it("should format large numbers with proper separators", () => {
    const result = formatCurrency(1234567.89);
    expect(result).toContain("₦");
    expect(result).toMatch(/1,234,567\.89/);
  });

  it("should handle string input with currency symbols", () => {
    const result = formatCurrency("$5,000.50");
    expect(result).toContain("₦");
    expect(result).toMatch(/5,000\.50/);
  });

  it("should handle zero", () => {
    const result = formatCurrency(0);
    expect(result).toContain("₦");
    expect(result).toMatch(/0\.00/);
  });

  it("should handle decimal numbers", () => {
    const result = formatCurrency(99.99);
    expect(result).toMatch(/99\.99/);
  });

  // Negative tests
  it("should handle negative numbers", () => {
    const result = formatCurrency(-500);
    expect(result).toContain("-");
    expect(result).toContain("₦");
  });

  it("should handle string with no numbers", () => {
    const result = formatCurrency("abc");
    expect(result).toContain("₦");
    expect(result).toContain("NaN");
  });
});

describe("formatPhoneNumber", () => {
  // Positive tests
  it("should format a standard Nigerian phone number", () => {
    const result = formatPhoneNumber("08012345678");
    expect(result).toBe("08012345678");
  });

  it("should handle phone numbers with spaces", () => {
    const result = formatPhoneNumber("080 1234 5678");
    expect(result).toBe("08012345678");
  });

  it("should handle phone numbers with dashes", () => {
    const result = formatPhoneNumber("080-1234-5678");
    expect(result).toBe("08012345678");
  });

  // Negative tests
  it("should return original for non-standard length", () => {
    const result = formatPhoneNumber("123456");
    expect(result).toBe("123456");
  });

  it("should return original for numbers not starting with 0", () => {
    const result = formatPhoneNumber("23412345678");
    expect(result).toBe("23412345678");
  });

  it("should handle empty string", () => {
    const result = formatPhoneNumber("");
    expect(result).toBe("");
  });
});

describe("capitalizeFirst", () => {
  // Positive tests
  it("should capitalize first letter of a string", () => {
    expect(capitalizeFirst("hello")).toBe("Hello");
  });

  it("should lowercase remaining letters", () => {
    expect(capitalizeFirst("HELLO")).toBe("Hello");
  });

  it("should handle single character", () => {
    expect(capitalizeFirst("a")).toBe("A");
  });

  it("should handle mixed case", () => {
    expect(capitalizeFirst("hELLo WoRLD")).toBe("Hello world");
  });

  // Negative tests
  it("should handle empty string", () => {
    expect(capitalizeFirst("")).toBe("");
  });

  it("should handle string with numbers", () => {
    expect(capitalizeFirst("123abc")).toBe("123abc");
  });

  it("should handle string starting with space", () => {
    expect(capitalizeFirst(" hello")).toBe(" hello");
  });
});

describe("truncateText", () => {
  // Positive tests
  it("should truncate long text and add ellipsis", () => {
    const result = truncateText("This is a very long text", 10);
    expect(result).toBe("This is a ...");
    expect(result.length).toBe(13); // 10 + 3 for "..."
  });

  it("should not truncate text shorter than maxLength", () => {
    const result = truncateText("Short", 10);
    expect(result).toBe("Short");
  });

  it("should not truncate text equal to maxLength", () => {
    const result = truncateText("Exactly 10", 10);
    expect(result).toBe("Exactly 10");
  });

  // Negative tests
  it("should handle empty string", () => {
    const result = truncateText("", 10);
    expect(result).toBe("");
  });

  it("should handle maxLength of 0", () => {
    const result = truncateText("Hello", 0);
    expect(result).toBe("...");
  });

  it("should handle very long text", () => {
    const longText = "a".repeat(1000);
    const result = truncateText(longText, 50);
    expect(result.length).toBe(53); // 50 + 3 for "..."
  });
});
