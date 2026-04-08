import React from "react";
import { UserStatsCards, UserTable } from "../../components/users";
import { Pagination } from "../../components/common";
import { useUsers } from "../../hooks/useUsers";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const {
    paginatedUsers,
    loading,
    stats,
    filters,
    setFilters,
    resetFilters,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    filteredUsers,
    totalPages,
    organizations,
  } = useUsers();

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Users</h1>

      <UserStatsCards stats={stats} />

      <UserTable
        users={paginatedUsers}
        loading={loading}
        filters={filters}
        onFilter={setFilters}
        onReset={resetFilters}
        organizations={organizations}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredUsers.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default Dashboard;
