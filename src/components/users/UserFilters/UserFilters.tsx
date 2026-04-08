import React, { useState } from "react";
import type {
  UserFilters as UserFiltersType,
  UserStatus,
} from "../../../types";
import Button from "../../common/Button";
import "./UserFilters.scss";

interface UserFiltersProps {
  filters: UserFiltersType;
  onFilter: (filters: UserFiltersType) => void;
  onReset: () => void;
  organizations: string[];
  isOpen: boolean;
  onClose: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onFilter,
  onReset,
  organizations,
  isOpen,
  onClose,
}) => {
  const [localFilters, setLocalFilters] = useState<UserFiltersType>(filters);

  const handleChange = (field: keyof UserFiltersType, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: UserFiltersType = {
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    };
    setLocalFilters(resetFilters);
    onReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="user-filters-overlay" onClick={onClose} />
      <div className="user-filters">
        <form onSubmit={handleSubmit}>
          <div className="user-filters__field">
            <label>Organization</label>
            <select
              value={localFilters.organization || ""}
              onChange={(e) => handleChange("organization", e.target.value)}
            >
              <option value="">Select</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>

          <div className="user-filters__field">
            <label>Username</label>
            <input
              type="text"
              placeholder="User"
              value={localFilters.username || ""}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </div>

          <div className="user-filters__field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={localFilters.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="user-filters__field">
            <label>Date</label>
            <input
              type="date"
              value={localFilters.date || ""}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>

          <div className="user-filters__field">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              value={localFilters.phoneNumber || ""}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </div>

          <div className="user-filters__field">
            <label>Status</label>
            <select
              value={localFilters.status || ""}
              onChange={(e) =>
                handleChange("status", e.target.value as UserStatus | "")
              }
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
          </div>

          <div className="user-filters__actions">
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" variant="primary">
              Filter
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserFilters;
