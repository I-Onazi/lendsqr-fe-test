import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    onPageChange: vi.fn(),
    onPageSizeChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Positive tests - Rendering
  describe("Rendering", () => {
    it("should render pagination info", () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByText("Showing")).toBeInTheDocument();
      expect(screen.getByText("out of 100")).toBeInTheDocument();
    });

    it("should render page size selector", () => {
      render(<Pagination {...defaultProps} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
      expect(select).toHaveValue("10");
    });

    it("should render all page size options", () => {
      render(<Pagination {...defaultProps} />);
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(4);
      expect(options[0]).toHaveValue("10");
      expect(options[1]).toHaveValue("20");
      expect(options[2]).toHaveValue("50");
      expect(options[3]).toHaveValue("100");
    });

    it("should render navigation buttons", () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
      expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    });

    it("should render page numbers", () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByText("1")).toBeInTheDocument();
      // Use getAllByText since "10" appears in both select option and page button
      const tens = screen.getAllByText("10");
      expect(tens.length).toBeGreaterThanOrEqual(1);
    });

    it("should highlight current page", () => {
      render(<Pagination {...defaultProps} currentPage={3} />);
      const pageButton = screen.getByText("3");
      expect(pageButton).toHaveClass("pagination__btn--active");
    });
  });

  // Positive tests - Page number generation
  describe("Page Number Generation", () => {
    it("should show all pages when total pages is 7 or less", () => {
      render(<Pagination {...defaultProps} totalPages={7} />);
      for (let i = 1; i <= 7; i++) {
        expect(screen.getByText(String(i))).toBeInTheDocument();
      }
    });

    it("should show ellipsis when on first pages", () => {
      render(<Pagination {...defaultProps} currentPage={2} />);
      expect(screen.getByText("...")).toBeInTheDocument();
    });

    it("should show ellipsis when on last pages", () => {
      render(<Pagination {...defaultProps} currentPage={9} />);
      expect(screen.getByText("...")).toBeInTheDocument();
    });

    it("should show double ellipsis when in middle", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);
      const ellipses = screen.getAllByText("...");
      expect(ellipses).toHaveLength(2);
    });

    it("should always show first and last page", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);
      expect(screen.getByText("1")).toBeInTheDocument();
      // Page 10 button exists (also exists as select option)
      const tens = screen.getAllByText("10");
      const pageButton = tens.find((el) =>
        el.classList.contains("pagination__btn"),
      );
      expect(pageButton).toBeInTheDocument();
    });
  });

  // Positive tests - Interactions
  describe("Interactions", () => {
    it("should call onPageChange when clicking page number", () => {
      const onPageChange = vi.fn();
      render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

      fireEvent.click(screen.getByText("2"));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("should call onPageChange when clicking next button", () => {
      const onPageChange = vi.fn();
      render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

      fireEvent.click(screen.getByLabelText("Next page"));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("should call onPageChange when clicking previous button", () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          onPageChange={onPageChange}
        />,
      );

      fireEvent.click(screen.getByLabelText("Previous page"));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it("should call onPageSizeChange when changing page size", () => {
      const onPageSizeChange = vi.fn();
      render(
        <Pagination {...defaultProps} onPageSizeChange={onPageSizeChange} />,
      );

      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "50" },
      });
      expect(onPageSizeChange).toHaveBeenCalledWith(50);
    });
  });

  // Negative tests - Disabled states
  describe("Disabled States", () => {
    it("should disable previous button on first page", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      expect(screen.getByLabelText("Previous page")).toBeDisabled();
    });

    it("should disable next button on last page", () => {
      render(<Pagination {...defaultProps} currentPage={10} />);
      expect(screen.getByLabelText("Next page")).toBeDisabled();
    });

    it("should enable previous button when not on first page", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);
      expect(screen.getByLabelText("Previous page")).not.toBeDisabled();
    });

    it("should enable next button when not on last page", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);
      expect(screen.getByLabelText("Next page")).not.toBeDisabled();
    });
  });

  // Negative tests - Edge cases
  describe("Edge Cases", () => {
    it("should handle single page", () => {
      render(<Pagination {...defaultProps} totalPages={1} totalItems={5} />);
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByLabelText("Previous page")).toBeDisabled();
      expect(screen.getByLabelText("Next page")).toBeDisabled();
    });

    it("should handle two pages", () => {
      render(<Pagination {...defaultProps} totalPages={2} totalItems={20} />);
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });

    it("should handle large page numbers", () => {
      render(
        <Pagination
          {...defaultProps}
          totalPages={100}
          totalItems={1000}
          currentPage={50}
        />,
      );
      expect(screen.getByText("1")).toBeInTheDocument();
      // Page 100 button exists (also exists as select option)
      const hundreds = screen.getAllByText("100");
      const pageButton = hundreds.find((el) =>
        el.classList.contains("pagination__btn"),
      );
      expect(pageButton).toBeInTheDocument();
      const lastPageButton = screen.getByRole("button", { name: "50" });
      expect(lastPageButton).toBeInTheDocument();
      expect(lastPageButton).toHaveClass("pagination__btn--active");
    });

    it("should handle zero total items", () => {
      render(<Pagination {...defaultProps} totalPages={0} totalItems={0} />);
      expect(screen.getByText("out of 0")).toBeInTheDocument();
    });

    it("should not call onPageChange when clicking on ellipsis", () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          onPageChange={onPageChange}
        />,
      );

      const ellipses = screen.getAllByText("...");
      fireEvent.click(ellipses[0]);
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("should have accessible labels on navigation buttons", () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
      expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    });

    it("should be keyboard navigable", () => {
      render(<Pagination {...defaultProps} />);
      const prevButton = screen.getByLabelText("Previous page");
      const nextButton = screen.getByLabelText("Next page");

      expect(prevButton.tagName).toBe("BUTTON");
      expect(nextButton.tagName).toBe("BUTTON");
    });
  });
});
