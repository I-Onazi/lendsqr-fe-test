import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";

// Simple auth check - in a real app this would be more robust
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/users" replace />,
      },
      {
        path: "users",
        element: <Dashboard />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },
      // Placeholder routes for other sidebar items
      {
        path: "guarantors",
        element: <PlaceholderPage title="Guarantors" />,
      },
      {
        path: "loans",
        element: <PlaceholderPage title="Loans" />,
      },
      {
        path: "decision-models",
        element: <PlaceholderPage title="Decision Models" />,
      },
      {
        path: "savings",
        element: <PlaceholderPage title="Savings" />,
      },
      {
        path: "loan-requests",
        element: <PlaceholderPage title="Loan Requests" />,
      },
      {
        path: "whitelist",
        element: <PlaceholderPage title="Whitelist" />,
      },
      {
        path: "karma",
        element: <PlaceholderPage title="Karma" />,
      },
      {
        path: "organization",
        element: <PlaceholderPage title="Organization" />,
      },
      {
        path: "loan-products",
        element: <PlaceholderPage title="Loan Products" />,
      },
      {
        path: "savings-products",
        element: <PlaceholderPage title="Savings Products" />,
      },
      {
        path: "fees-charges",
        element: <PlaceholderPage title="Fees and Charges" />,
      },
      {
        path: "transactions",
        element: <PlaceholderPage title="Transactions" />,
      },
      {
        path: "services",
        element: <PlaceholderPage title="Services" />,
      },
      {
        path: "service-account",
        element: <PlaceholderPage title="Service Account" />,
      },
      {
        path: "settlements",
        element: <PlaceholderPage title="Settlements" />,
      },
      {
        path: "reports",
        element: <PlaceholderPage title="Reports" />,
      },
      {
        path: "preferences",
        element: <PlaceholderPage title="Preferences" />,
      },
      {
        path: "fees-pricing",
        element: <PlaceholderPage title="Fees and Pricing" />,
      },
      {
        path: "audit-logs",
        element: <PlaceholderPage title="Audit Logs" />,
      },
    ],
  },
]);

// Simple placeholder component for unimplemented pages
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ color: "#213F7D", marginBottom: "16px" }}>{title}</h1>
      <p style={{ color: "#545F7D" }}>This page is under construction.</p>
    </div>
  );
}
