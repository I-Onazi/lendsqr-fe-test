import React from "react";
import "./Loader.scss";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  fullPage = false,
}) => {
  if (fullPage) {
    return (
      <div className="loader-container loader-container--full-page">
        <div className={`loader loader--${size}`}>
          <div className="loader__spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className={`loader loader--${size}`}>
        <div className="loader__spinner" />
      </div>
    </div>
  );
};

export default Loader;
