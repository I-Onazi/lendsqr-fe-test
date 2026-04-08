import React from "react";
import type { UserStatus } from "../../../types";
import "./Badge.scss";

interface BadgeProps {
  status: UserStatus;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const className = `badge badge--${status.toLowerCase()}`;

  return <span className={className}>{status}</span>;
};

export default Badge;
