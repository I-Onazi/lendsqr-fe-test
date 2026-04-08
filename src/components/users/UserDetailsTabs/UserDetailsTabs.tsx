import React from "react";
import type { User } from "../../../types";
import "./UserDetailsTabs.scss";

export const tabs = [
  { id: "general", label: "General Details" },
  { id: "documents", label: "Documents" },
  { id: "bank", label: "Bank Details" },
  { id: "loans", label: "Loans" },
  { id: "savings", label: "Savings" },
  { id: "app", label: "App and System" },
];

interface UserDetailsTabsProps {
  user: User;
  activeTab: string;
}

export const UserDetailsTabs: React.FC<UserDetailsTabsProps> = ({
  user,
  activeTab,
}) => {
  return (
    <div className="user-details-tabs__content">
      {activeTab === "general" && <GeneralDetails user={user} />}
      {activeTab === "documents" && <PlaceholderContent title="Documents" />}
      {activeTab === "bank" && <PlaceholderContent title="Bank Details" />}
      {activeTab === "loans" && <PlaceholderContent title="Loans" />}
      {activeTab === "savings" && <PlaceholderContent title="Savings" />}
      {activeTab === "app" && <PlaceholderContent title="App and System" />}
    </div>
  );
};

const GeneralDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="general-details">
      {/* Personal Information */}
      <section className="general-details__section">
        <h3 className="general-details__section-title">Personal Information</h3>
        <div className="general-details__grid">
          <div className="general-details__item">
            <span className="general-details__label">Full Name</span>
            <span className="general-details__value">
              {user.personalInfo.fullName}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Phone Number</span>
            <span className="general-details__value">
              {user.personalInfo.phoneNumber}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Email Address</span>
            <span className="general-details__value">
              {user.personalInfo.emailAddress}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">BVN</span>
            <span className="general-details__value">
              {user.personalInfo.bvn}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Gender</span>
            <span className="general-details__value">
              {user.personalInfo.gender}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Marital Status</span>
            <span className="general-details__value">
              {user.personalInfo.maritalStatus}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Children</span>
            <span className="general-details__value">
              {user.personalInfo.children}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Type of Residence</span>
            <span className="general-details__value">
              {user.personalInfo.typeOfResidence}
            </span>
          </div>
        </div>
      </section>

      {/* Education and Employment */}
      <section className="general-details__section">
        <h3 className="general-details__section-title">
          Education and Employment
        </h3>
        <div className="general-details__grid">
          <div className="general-details__item">
            <span className="general-details__label">Level of Education</span>
            <span className="general-details__value">
              {user.educationAndEmployment.levelOfEducation}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Employment Status</span>
            <span className="general-details__value">
              {user.educationAndEmployment.employmentStatus}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Sector of Employment</span>
            <span className="general-details__value">
              {user.educationAndEmployment.sectorOfEmployment}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">
              Duration of Employment
            </span>
            <span className="general-details__value">
              {user.educationAndEmployment.durationOfEmployment}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Office Email</span>
            <span className="general-details__value">
              {user.educationAndEmployment.officeEmail}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Monthly Income</span>
            <span className="general-details__value">
              {user.educationAndEmployment.monthlyIncome}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Loan Repayment</span>
            <span className="general-details__value">
              {user.educationAndEmployment.loanRepayment}
            </span>
          </div>
        </div>
      </section>

      {/* Socials */}
      <section className="general-details__section">
        <h3 className="general-details__section-title">Socials</h3>
        <div className="general-details__grid">
          <div className="general-details__item">
            <span className="general-details__label">Twitter</span>
            <span className="general-details__value">
              {user.socials.twitter}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Facebook</span>
            <span className="general-details__value">
              {user.socials.facebook}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Instagram</span>
            <span className="general-details__value">
              {user.socials.instagram}
            </span>
          </div>
        </div>
      </section>

      {/* Guarantor */}
      <section className="general-details__section">
        <h3 className="general-details__section-title">Guarantor</h3>
        <div className="general-details__grid">
          <div className="general-details__item">
            <span className="general-details__label">Full Name</span>
            <span className="general-details__value">
              {user.guarantor.fullName}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Phone Number</span>
            <span className="general-details__value">
              {user.guarantor.phoneNumber}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Email Address</span>
            <span className="general-details__value">
              {user.guarantor.emailAddress}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Relationship</span>
            <span className="general-details__value">
              {user.guarantor.relationship}
            </span>
          </div>
        </div>
        
        <div style={{ height: "1px", backgroundColor: "rgba(84, 95, 125, 0.1)", margin: "30px 0" }} />

        <div className="general-details__grid">
          <div className="general-details__item">
            <span className="general-details__label">Full Name</span>
            <span className="general-details__value">
              {user.guarantor.fullName}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Phone Number</span>
            <span className="general-details__value">
              {user.guarantor.phoneNumber}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Email Address</span>
            <span className="general-details__value">
              {user.guarantor.emailAddress}
            </span>
          </div>
          <div className="general-details__item">
            <span className="general-details__label">Relationship</span>
            <span className="general-details__value">
              {user.guarantor.relationship}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="placeholder-content">
      <p>No {title.toLowerCase()} information available.</p>
    </div>
  );
};

export default UserDetailsTabs;
