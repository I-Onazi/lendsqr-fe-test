import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./DashboardLayout.scss";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <main className="dashboard-layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
