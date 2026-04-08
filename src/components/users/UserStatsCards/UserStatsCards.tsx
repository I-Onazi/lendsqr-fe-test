import React from "react";
import Card from "../../common/Card";
const usersIcon = "/images/users2.svg";
const activeUsersIcon = "/images/active-users.svg";
const usersWithLoansIcon = "/images/users-with-loans.svg";
const usersWithSavingsIcon = "/images/users-with-savings.svg";
import "./UserStatsCards.scss";

interface UserStatsCardsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    usersWithLoans: number;
    usersWithSavings: number;
  };
}

const UserStatsCards: React.FC<UserStatsCardsProps> = ({ stats }) => {
  return (
    <div className="user-stats-cards">
      <Card
        icon={<img src={usersIcon} alt="Users" />}
        label="Users"
        value={stats.totalUsers}
      />
      <Card
        icon={<img src={activeUsersIcon} alt="Active Users" />}
        label="Active Users"
        value={stats.activeUsers}
      />
      <Card
        icon={<img src={usersWithLoansIcon} alt="Users with Loans" />}
        label="Users with Loans"
        value={stats.usersWithLoans}
      />
      <Card
        icon={<img src={usersWithSavingsIcon} alt="Users with Savings" />}
        label="Users with Savings"
        value={stats.usersWithSavings}
      />
    </div>
  );
};

export default UserStatsCards;
