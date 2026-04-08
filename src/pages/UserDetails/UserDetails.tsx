import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { User } from "../../types";
import { fetchUserById } from "../../services/userService";
import { UserDetailsTabs, tabs } from "../../components/users/UserDetailsTabs/UserDetailsTabs";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
const backIcon = "/images/back.svg";
const avatarIcon = "/images/info-avatar.svg";
import "./UserDetails.scss";

const StarFilledIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.98572 1.28751C7.85197 1.29314 7.73572 1.37314 7.68322 1.49314L5.95697 5.45751L1.65072 5.93314C1.52072 5.94751 1.41135 6.03689 1.36885 6.16001C1.32572 6.28314 1.35635 6.42001 1.44822 6.51064L4.58447 9.49939L3.73822 13.9056C3.71322 14.0325 3.76197 14.1625 3.86447 14.2413C3.96697 14.32 4.10509 14.3344 4.22134 14.2788L8.00009 12.46L11.7788 14.2788C11.8951 14.3344 12.0332 14.32 12.1357 14.2413C12.2382 14.1625 12.2869 14.0325 12.2619 13.9056L11.4157 9.49939L14.5519 6.51064C14.6438 6.42001 14.6744 6.28314 14.6313 6.16001C14.5888 6.03689 14.4794 5.94751 14.3494 5.93314L10.0432 5.45751L8.31697 1.49314C8.26447 1.37314 8.14822 1.29314 8.01447 1.28751C8.00509 1.28689 7.99509 1.28689 7.98572 1.28751Z"
      fill="#E9B200"
    />
  </svg>
);

const StarOutlineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <g clipPath="url(#clip0_star)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.98439 1.28751C7.85064 1.29314 7.73439 1.37314 7.68189 1.49314L5.95564 5.45751L1.64939 5.93314C1.51939 5.94751 1.41002 6.03689 1.36752 6.16001C1.32439 6.28314 1.35502 6.42001 1.44689 6.51064L4.58314 9.49939L3.73689 13.9056C3.71189 14.0325 3.76064 14.1625 3.86314 14.2413C3.96564 14.32 4.10377 14.3344 4.22002 14.2788L7.99877 12.46L11.7775 14.2788C11.8938 14.3344 12.0319 14.32 12.1344 14.2413C12.2369 14.1625 12.2856 14.0325 12.2606 13.9056L11.4144 9.49939L14.5506 6.51064C14.6425 6.42001 14.6731 6.28314 14.63 6.16001C14.5875 6.03689 14.4781 5.94751 14.3481 5.93314L10.0419 5.45751L8.31564 1.49314C8.26314 1.37314 8.14689 1.29314 8.01314 1.28751C8.00377 1.28689 7.99377 1.28689 7.98439 1.28751ZM8.00002 2.86439L9.40627 6.09064C9.45252 6.19689 9.55252 6.27064 9.66814 6.28376L13.1744 6.67126L10.5994 9.11939C10.5131 9.20251 10.475 9.32189 10.4969 9.43751L11.1894 12.9931L8.11064 11.5006C8.00689 11.4506 7.88377 11.4506 7.78002 11.5006L4.70127 12.9931L5.39377 9.43751C5.41564 9.32189 5.37752 9.20251 5.29127 9.11939L2.71627 6.67126L6.22252 6.28376C6.33814 6.27064 6.43877 6.19689 6.48439 6.09064L7.89064 2.86439H8.00002Z"
        fill="#E9B200"
      />
    </g>
    <defs>
      <clipPath id="clip0_star">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const userData = await fetchUserById(id);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleBack = () => {
    navigate("/dashboard/users");
  };

  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, index) =>
      index < tier ? (
        <StarFilledIcon key={index} />
      ) : (
        <StarOutlineIcon key={index} />
      ),
    );
  };

  if (loading) {
    return <Loader fullPage />;
  }

  if (!user) {
    return (
      <div className="user-details">
        <div className="user-details__not-found">
          <h2>User not found</h2>
          <Button onClick={handleBack}>Back to Users</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details">
      <button className="user-details__back" onClick={handleBack}>
        <img src={backIcon} alt="Back" />
        <span>Back to Users</span>
      </button>

      <div className="user-details__header">
        <h1 className="user-details__title">User Details</h1>
        <div className="user-details__actions">
          <Button variant="outline-danger">Blacklist User</Button>
          <Button variant="outline-teal">Activate User</Button>
        </div>
      </div>

      <div className="user-details__profile-card">
        <div className="user-details__profile-header">
          <div className="user-details__profile-info">
            <div className="user-details__avatar">
              <img src={avatarIcon} alt={user.personalInfo.fullName} />
            </div>
            <div className="user-details__name-tier">
              <h2 className="user-details__name">
                {user.personalInfo.fullName}
              </h2>
              <p className="user-details__account-id">{user.id}</p>
            </div>
            <div className="user-details__tier-divider" />
            <div className="user-details__tier">
              <p className="user-details__tier-label">User's Tier</p>
              <div className="user-details__stars">
                {renderStars(user.tier)}
              </div>
            </div>
            <div className="user-details__tier-divider" />
            <div className="user-details__balance">
              <h2 className="user-details__balance-amount">
                {user.accountBalance}
              </h2>
              <p className="user-details__bank-info">
                {user.accountNumber}/{user.bankName}
              </p>
            </div>
          </div>
        </div>

        <div className="user-details-tabs__nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`user-details-tabs__tab ${activeTab === tab.id ? "user-details-tabs__tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="user-details__content-card">
        <UserDetailsTabs user={user} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default UserDetails;
