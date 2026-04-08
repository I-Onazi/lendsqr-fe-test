import React from "react";
import "./Card.scss";

interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBgColor?: string;
}

const Card: React.FC<CardProps> = ({ icon, label, value, iconBgColor }) => {
  return (
    <div className="stat-card">
      <div
        className="stat-card__icon"
        style={iconBgColor ? { backgroundColor: iconBgColor } : undefined}
      >
        {icon}
      </div>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value.toLocaleString()}</p>
    </div>
  );
};

export default Card;
