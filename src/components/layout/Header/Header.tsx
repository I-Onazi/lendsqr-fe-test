import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="#213F7D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 12H21"
      stroke="#213F7D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 6H21"
      stroke="#213F7D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 18H21"
      stroke="#213F7D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/dashboard" className="header__logo">
          <img src="/Group.jpg" alt="Lendsqr Logo" />
        </Link>
      </div>

      <div className="header__search">
        <input
          type="text"
          placeholder="Search for anything"
          className="header__search-input"
        />
        <button className="header__search-btn">
          <img src="/images/search.svg" alt="Search" />
        </button>
      </div>

      <div className="header__right">
        <a href="#" className="header__docs-link">
          Docs
        </a>

        <button className="header__notification">
          <img src="/images/Vector.png" alt="Notifications" />
        </button>

        <div className="header__profile" ref={profileRef}>
          <button
            className="header__profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              src="/images/avatar.png"
              alt="Profile"
              className="header__avatar"
            />
            <span className="header__username">Adedeji</span>
            <ChevronDownIcon />
          </button>

          {showProfileMenu && (
            <div className="header__profile-menu">
              <Link to="/dashboard/profile">Profile</Link>
              <Link to="/dashboard/settings">Settings</Link>
              <hr />
              <Link to="/login">Logout</Link>
            </div>
          )}
        </div>

        <button className="header__menu-btn" onClick={onMenuClick}>
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
