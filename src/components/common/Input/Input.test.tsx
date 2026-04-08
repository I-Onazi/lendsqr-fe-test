import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  // Positive tests - Basic rendering
  describe("Basic Rendering", () => {
    it("should render input element", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with label", () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
      render(<Input placeholder="Enter email" />);
      expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    });

    it("should generate id from label", () => {
      render(<Input label="User Name" />);
      const input = screen.getByLabelText("User Name");
      expect(input).toHaveAttribute("id", "user-name");
    });

    it("should use provided id over generated one", () => {
      render(<Input label="Email" id="custom-id" />);
      const input = screen.getByLabelText("Email");
      expect(input).toHaveAttribute("id", "custom-id");
    });
  });

  // Positive tests - Input types
  describe("Input Types", () => {
    it("should render text input by default", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    it("should render email input", () => {
      render(<Input type="email" />);
      const input = document.querySelector('input[type="email"]');
      expect(input).toBeInTheDocument();
    });

    it("should render number input", () => {
      render(<Input type="number" />);
      expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    });
  });

  // Positive tests - Password toggle
  describe("Password Toggle", () => {
    it("should render password input with toggle", () => {
      render(<Input showPasswordToggle />);
      expect(screen.getByText("SHOW")).toBeInTheDocument();
    });

    it("should toggle password visibility when button clicked", async () => {
      render(<Input showPasswordToggle />);
      const input = document.querySelector("input") as HTMLInputElement;
      const toggleBtn = screen.getByText("SHOW");

      expect(input).toHaveAttribute("type", "password");

      fireEvent.click(toggleBtn);
      expect(input).toHaveAttribute("type", "text");
      expect(screen.getByText("HIDE")).toBeInTheDocument();

      fireEvent.click(screen.getByText("HIDE"));
      expect(input).toHaveAttribute("type", "password");
    });

    it("should have tabIndex -1 on toggle button to prevent tab focus", () => {
      render(<Input showPasswordToggle />);
      const toggleBtn = screen.getByText("SHOW");
      expect(toggleBtn).toHaveAttribute("tabindex", "-1");
    });
  });

  // Positive tests - Icons
  describe("Icons", () => {
    it("should render with left icon", () => {
      render(
        <Input icon={<span data-testid="icon">🔍</span>} iconPosition="left" />,
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("should render with right icon", () => {
      render(
        <Input icon={<span data-testid="icon">✓</span>} iconPosition="right" />,
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("should apply correct class for icon position", () => {
      const { container } = render(
        <Input icon={<span>Icon</span>} iconPosition="left" />,
      );
      expect(container.firstChild).toHaveClass("input-wrapper--icon-left");
    });

    it("should not render right icon when password toggle is shown", () => {
      render(
        <Input
          icon={<span data-testid="right-icon">Icon</span>}
          iconPosition="right"
          showPasswordToggle
        />,
      );
      expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
    });
  });

  // Positive tests - Interactions
  describe("Interactions", () => {
    it("should update value on change", async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole("textbox");

      await user.type(input, "test@example.com");
      expect(input).toHaveValue("test@example.com");
    });

    it("should call onChange handler", async () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "test" } });
      expect(handleChange).toHaveBeenCalled();
    });

    it("should call onBlur handler", () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole("textbox");

      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalled();
    });

    it("should call onFocus handler", () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole("textbox");

      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalled();
    });
  });

  // Negative tests - Error states
  describe("Error States", () => {
    it("should display error message", () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("should apply error class when error is present", () => {
      const { container } = render(<Input error="Error" />);
      expect(container.firstChild).toHaveClass("input-wrapper--error");
    });

    it("should not display error element when no error", () => {
      const { container } = render(<Input />);
      expect(
        container.querySelector(".input-wrapper__error"),
      ).not.toBeInTheDocument();
    });
  });

  // Negative tests - Disabled state
  describe("Disabled State", () => {
    it("should be disabled when disabled prop is true", () => {
      render(<Input disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("should not allow input when disabled", async () => {
      const user = userEvent.setup();
      render(<Input disabled />);
      const input = screen.getByRole("textbox");

      await user.type(input, "test");
      expect(input).toHaveValue("");
    });
  });

  // Negative tests - Edge cases
  describe("Edge Cases", () => {
    it("should handle empty label gracefully", () => {
      render(<Input label="" />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<Input className="custom-input" />);
      expect(container.firstChild).toHaveClass("custom-input");
    });

    it("should forward ref to input element", () => {
      const ref = { current: null };
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("should handle special characters in label for id generation", () => {
      render(<Input label="Email Address!" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "email-address!");
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("should have proper label association", () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText("Email");
      expect(input).toBeInTheDocument();
    });

    it("should be focusable", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it("should support aria attributes", () => {
      render(<Input aria-label="Search" aria-describedby="hint" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-label", "Search");
      expect(input).toHaveAttribute("aria-describedby", "hint");
    });
  });
});
