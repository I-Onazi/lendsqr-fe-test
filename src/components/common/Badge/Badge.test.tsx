import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";
import type { UserStatus } from "../../../types";

describe("Badge", () => {
  // Positive tests - Status rendering
  describe("Status Rendering", () => {
    it("should render Active status badge", () => {
      render(<Badge status="Active" />);
      const badge = screen.getByText("Active");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("badge--active");
    });

    it("should render Inactive status badge", () => {
      render(<Badge status="Inactive" />);
      const badge = screen.getByText("Inactive");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("badge--inactive");
    });

    it("should render Pending status badge", () => {
      render(<Badge status="Pending" />);
      const badge = screen.getByText("Pending");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("badge--pending");
    });

    it("should render Blacklisted status badge", () => {
      render(<Badge status="Blacklisted" />);
      const badge = screen.getByText("Blacklisted");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("badge--blacklisted");
    });
  });

  // Positive tests - Styling
  describe("Styling", () => {
    it("should have base badge class", () => {
      render(<Badge status="Active" />);
      const badge = screen.getByText("Active");
      expect(badge).toHaveClass("badge");
    });

    it("should have both base class and status class", () => {
      render(<Badge status="Pending" />);
      const badge = screen.getByText("Pending");
      expect(badge.className).toContain("badge");
      expect(badge.className).toContain("badge--pending");
    });

    it("should render as span element", () => {
      render(<Badge status="Active" />);
      const badge = screen.getByText("Active");
      expect(badge.tagName).toBe("SPAN");
    });
  });

  // Positive tests - Case handling
  describe("Case Handling", () => {
    it("should handle status with proper case conversion for class", () => {
      const statuses: UserStatus[] = [
        "Active",
        "Inactive",
        "Pending",
        "Blacklisted",
      ];

      statuses.forEach((status) => {
        const { unmount } = render(<Badge status={status} />);
        const badge = screen.getByText(status);
        expect(badge).toHaveClass(`badge--${status.toLowerCase()}`);
        unmount();
      });
    });
  });

  // Negative tests - Edge cases
  describe("Edge Cases", () => {
    it("should display exact status text as provided", () => {
      render(<Badge status="Active" />);
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.queryByText("active")).not.toBeInTheDocument();
    });

    it("should not have additional unexpected classes", () => {
      render(<Badge status="Active" />);
      const badge = screen.getByText("Active");
      const classes = badge.className.split(" ");
      expect(classes).toHaveLength(2); // "badge" and "badge--active"
    });
  });

  // Snapshot tests
  describe("Snapshots", () => {
    it("should match snapshot for Active status", () => {
      const { container } = render(<Badge status="Active" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot for Blacklisted status", () => {
      const { container } = render(<Badge status="Blacklisted" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
