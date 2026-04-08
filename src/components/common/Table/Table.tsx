import React from "react";
import "./Table.scss";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

function Table<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="table-container">
        <div className="table-loading">
          <div className="table-loading__spinner" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="table-container">
        <div className="table-empty">
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="table__header">
                <div className="table__header-content">
                  {column.header}
                  {column.sortable && (
                    <svg
                      className="table__sort-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path d="M8 4L4 8H12L8 4Z" fill="currentColor" />
                      <path d="M8 12L12 8H4L8 12Z" fill="currentColor" />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={`table__row ${onRowClick ? "table__row--clickable" : ""}`}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td key={column.key} className="table__cell">
                  {column.render
                    ? column.render(item)
                    : String(
                        (item as Record<string, unknown>)[column.key] ?? "",
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
