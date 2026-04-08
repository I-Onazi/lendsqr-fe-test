import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User, UserFilters as UserFiltersType } from "../../../types";
import Badge from "../../common/Badge";
import UserFilters from "../UserFilters";
import { formatDate } from "../../../utils/formatters";
const filterIcon = "/images/filter.svg";
const threeDotsIcon = "/images/three-dots.svg";
const eyeIcon = "/images/eye.svg";
const blacklistIcon = "/images/blacklist.svg";
const activateUserIcon = "/images/activate-user.svg";
import "./UserTable.scss";

interface UserTableProps {
  users: User[];
  loading?: boolean;
  filters: UserFiltersType;
  onFilter: (filters: UserFiltersType) => void;
  onReset: () => void;
  organizations: string[];
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading = false,
  filters,
  onFilter,
  onReset,
  organizations,
}) => {
  const navigate = useNavigate();
  const [filterOpenColumn, setFilterOpenColumn] = useState<string | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setActionMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewDetails = (userId: string) => {
    navigate(`/dashboard/users/${userId}`);
    setActionMenuOpen(null);
  };

  const handleBlacklistUser = (userId: string) => {
    // TODO: Implement blacklist user functionality
    console.log("Blacklist user:", userId);
    setActionMenuOpen(null);
  };

  const handleActivateUser = (userId: string) => {
    // TODO: Implement activate user functionality
    console.log("Activate user:", userId);
    setActionMenuOpen(null);
  };

  const toggleFilter = (column: string) => {
    setFilterOpenColumn(filterOpenColumn === column ? null : column);
  };

  const closeFilter = () => {
    setFilterOpenColumn(null);
  };

  if (loading) {
    return (
      <div className="user-table-container">
        <div className="user-table-loading">
          <div className="user-table-loading__spinner" />
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="user-table-container">
        <div className="user-table-empty">
          <p>No users found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>
              <div
                className="user-table__header"
                onClick={() => toggleFilter("organization")}
              >
                <span>Organization</span>
                <img src={filterIcon} alt="" />
              </div>
              {filterOpenColumn === "organization" && (
                <UserFilters
                  filters={filters}
                  onFilter={onFilter}
                  onReset={onReset}
                  organizations={organizations}
                  isOpen={true}
                  onClose={closeFilter}
                />
              )}
            </th>
            <th>
              <div
                className="user-table__header"
                onClick={() => toggleFilter("username")}
              >
                <span>Username</span>
                <img src={filterIcon} alt="" />
              </div>
              {filterOpenColumn === "username" && (
                <UserFilters
                  filters={filters}
                  onFilter={onFilter}
                  onReset={onReset}
                  organizations={organizations}
                  isOpen={true}
                  onClose={closeFilter}
                />
              )}
            </th>
            <th>
              <div
                className="user-table__header"
                onClick={() => toggleFilter("email")}
              >
                <span>Email</span>
                <img src={filterIcon} alt="" />
              </div>
              {filterOpenColumn === "email" && (
                <UserFilters
                  filters={filters}
                  onFilter={onFilter}
                  onReset={onReset}
                  organizations={organizations}
                  isOpen={true}
                  onClose={closeFilter}
                />
              )}
            </th>
            <th>
              <div
                className="user-table__header"
                onClick={() => toggleFilter("phone")}
              >
                <span>Phone Number</span>
                <img src={filterIcon} alt="" />
              </div>
              {filterOpenColumn === "phone" && (
                <UserFilters
                  filters={filters}
                  onFilter={onFilter}
                  onReset={onReset}
                  organizations={organizations}
                  isOpen={true}
                  onClose={closeFilter}
                />
              )}
            </th>
            <th>
              <div
                className="user-table__header"
                onClick={() => toggleFilter("date")}
              >
                <span>Date Joined</span>
                <img src={filterIcon} alt="" />
              </div>
              {filterOpenColumn === "date" && (
                <UserFilters
                  filters={filters}
                  onFilter={onFilter}
                  onReset={onReset}
                  organizations={organizations}
                  isOpen={true}
                  onClose={closeFilter}
                />
              )}
            </th>
            <th>
              <div
                className="user-table__header"
                onClick={() => toggleFilter("status")}
              >
                <span>Status</span>
                <img src={filterIcon} alt="" />
              </div>
              {filterOpenColumn === "status" && (
                <UserFilters
                  filters={filters}
                  onFilter={onFilter}
                  onReset={onReset}
                  organizations={organizations}
                  isOpen={true}
                  onClose={closeFilter}
                />
              )}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{formatDate(user.dateJoined)}</td>
              <td>
                <Badge status={user.status} />
              </td>
              <td>
                <div
                  className="user-table__actions"
                  ref={actionMenuOpen === user.id ? actionMenuRef : null}
                >
                  <button
                    className="user-table__action-btn"
                    onClick={() =>
                      setActionMenuOpen(
                        actionMenuOpen === user.id ? null : user.id,
                      )
                    }
                  >
                    <img src={threeDotsIcon} alt="" />
                  </button>
                  {actionMenuOpen === user.id && (
                    <div className="user-table__action-menu">
                      <button onClick={() => handleViewDetails(user.id)}>
                        <img src={eyeIcon} alt="" />
                        <span>View Details</span>
                      </button>
                      <button onClick={() => handleBlacklistUser(user.id)}>
                        <img src={blacklistIcon} alt="" />
                        <span>Blacklist User</span>
                      </button>
                      <button onClick={() => handleActivateUser(user.id)}>
                        <img src={activateUserIcon} alt="" />
                        <span>Activate User</span>
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
