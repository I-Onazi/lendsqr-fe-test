import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

// Import icons
import briefcaseIcon from "../../../assets/images/briefcase.svg";
import dashboardIcon from "../../../assets/images/dashboard.svg";
import usersIcon from "../../../assets/images/users.svg";
import guarantorsIcon from "../../../assets/images/guarantors.svg";
import loansIcon from "../../../assets/images/loans.svg";
import decisionModelIcon from "../../../assets/images/decision-model.svg";
import savingsIcon from "../../../assets/images/savings.svg";
import loanRequestIcon from "../../../assets/images/loan-products.svg";
import whitelistIcon from "../../../assets/images/whitelist.svg";
import karmaIcon from "../../../assets/images/karma.svg";
import organizationIcon from "../../../assets/images/organization.svg";
import loanProductsIcon from "../../../assets/images/loan-products.svg";
import savingsProductsIcon from "../../../assets/images/savings-products.svg";
import feesAndChargesIcon from "../../../assets/images/fees-and-charges.svg";
import transactionsIcon from "../../../assets/images/transactions.svg";
import servicesIcon from "../../../assets/images/services.svg";
import serviceAccountIcon from "../../../assets/images/service-account.svg";
import settlementsIcon from "../../../assets/images/settlements.svg";
import reportsIcon from "../../../assets/images/reports.svg";
import preferencesIcon from "../../../assets/images/preferences.svg";
import feesAndPricingIcon from "../../../assets/images/fees-and-pricing.svg";
import auditLogsIcon from "../../../assets/images/audit-logs.svg";
import chevronDownIcon from "../../../assets/images/chevron-down.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  icon: string;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "CUSTOMERS",
    items: [
      { label: "Users", icon: usersIcon, path: "/dashboard/users" },
      {
        label: "Guarantors",
        icon: guarantorsIcon,
        path: "/dashboard/guarantors",
      },
      { label: "Loans", icon: loansIcon, path: "/dashboard/loans" },
      {
        label: "Decision Models",
        icon: decisionModelIcon,
        path: "/dashboard/decision-models",
      },
      { label: "Savings", icon: savingsIcon, path: "/dashboard/savings" },
      {
        label: "Loan Requests",
        icon: loanRequestIcon,
        path: "/dashboard/loan-requests",
      },
      { label: "Whitelist", icon: whitelistIcon, path: "/dashboard/whitelist" },
      { label: "Karma", icon: karmaIcon, path: "/dashboard/karma" },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      {
        label: "Organization",
        icon: organizationIcon,
        path: "/dashboard/organization",
      },
      {
        label: "Loan Products",
        icon: loanProductsIcon,
        path: "/dashboard/loan-products",
      },
      {
        label: "Savings Products",
        icon: savingsProductsIcon,
        path: "/dashboard/savings-products",
      },
      {
        label: "Fees and Charges",
        icon: feesAndChargesIcon,
        path: "/dashboard/fees-charges",
      },
      {
        label: "Transactions",
        icon: transactionsIcon,
        path: "/dashboard/transactions",
      },
      { label: "Services", icon: servicesIcon, path: "/dashboard/services" },
      {
        label: "Service Account",
        icon: serviceAccountIcon,
        path: "/dashboard/service-account",
      },
      {
        label: "Settlements",
        icon: settlementsIcon,
        path: "/dashboard/settlements",
      },
      { label: "Reports", icon: reportsIcon, path: "/dashboard/reports" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        label: "Preferences",
        icon: preferencesIcon,
        path: "/dashboard/preferences",
      },
      {
        label: "Fees and Pricing",
        icon: feesAndPricingIcon,
        path: "/dashboard/fees-pricing",
      },
      {
        label: "Audit Logs",
        icon: auditLogsIcon,
        path: "/dashboard/audit-logs",
      },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? "sidebar-overlay--visible" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__content">
          {/* Switch Organization */}
          <div
            className="sidebar__org-switch"
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
          >
            <img src={briefcaseIcon} alt="" />
            <span>Switch Organization</span>
            <img src={chevronDownIcon} alt="" />
          </div>

          {/* Dashboard Link */}
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
            }
          >
            <img src={dashboardIcon} alt="" />
            <span>Dashboard</span>
          </NavLink>

          {/* Navigation Sections */}
          {navSections.map((section) => (
            <div key={section.title} className="sidebar__section">
              <h3 className="sidebar__section-title">{section.title}</h3>
              <nav className="sidebar__nav">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
                    }
                  >
                    <img src={item.icon} alt="" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
