import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  // Positive tests - Rendering
  describe("Rendering", () => {
    it("should render button with children text", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("should render with default variant (primary)", () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--primary");
    });

    it("should render with secondary variant", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--secondary");
    });

    it("should render with outline-danger variant", () => {
      render(<Button variant="outline-danger">Danger</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--outline-danger");
    });

    it("should render with outline-teal variant", () => {
      render(<Button variant="outline-teal">Teal</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--outline-teal");
    });

    it("should render with default size (medium)", () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--medium");
    });

    it("should render with small size", () => {
      render(<Button size="small">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--small");
    });

    it("should render with large size", () => {
      render(<Button size="large">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--large");
    });

    it("should render with full width", () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--full-width");
    });

    it("should apply custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });
  });

  // Positive tests - Interactions
  describe("Interactions", () => {
    it("should call onClick handler when clicked", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should pass through other button attributes", () => {
      render(
        <Button type="submit" data-testid="submit-btn">
          Submit
        </Button>,
      );
      const button = screen.getByTestId("submit-btn");
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  // Positive tests - Loading state
  describe("Loading State", () => {
    it("should show spinner when loading", () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--loading");
      expect(button.querySelector(".btn__spinner")).toBeInTheDocument();
    });

    it("should hide children text when loading", () => {
      render(<Button isLoading>Hidden Text</Button>);
      expect(screen.getByRole("button")).not.toHaveTextContent("Hidden Text");
    });

    it("should be disabled when loading", () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  // Negative tests - Disabled state
  describe("Disabled State", () => {
    it("should be disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should not call onClick when disabled", () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should not call onClick when loading", () => {
      const handleClick = vi.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Loading
        </Button>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Negative tests - Edge cases
  describe("Edge Cases", () => {
    it("should handle empty children", () => {
      render(<Button>{""}</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should handle multiple class names correctly", () => {
      render(
        <Button variant="secondary" size="large" fullWidth className="extra">
          Multi
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn");
      expect(button).toHaveClass("btn--secondary");
      expect(button).toHaveClass("btn--large");
      expect(button).toHaveClass("btn--full-width");
      expect(button).toHaveClass("extra");
    });
  });
});
