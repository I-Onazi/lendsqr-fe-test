import React, { forwardRef, useState } from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      iconPosition = "left",
      showPasswordToggle = false,
      type = "text",
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    const classNames = [
      "input-wrapper",
      icon ? `input-wrapper--icon-${iconPosition}` : "",
      error ? "input-wrapper--error" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={classNames}>
        {label && (
          <label htmlFor={inputId} className="input-wrapper__label">
            {label}
          </label>
        )}
        <div className="input-wrapper__container">
          {icon && iconPosition === "left" && (
            <span className="input-wrapper__icon input-wrapper__icon--left">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className="input-wrapper__input"
            {...props}
          />
          {icon && iconPosition === "right" && !showPasswordToggle && (
            <span className="input-wrapper__icon input-wrapper__icon--right">
              {icon}
            </span>
          )}
          {showPasswordToggle && (
            <button
              type="button"
              className="input-wrapper__toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          )}
        </div>
        {error && <span className="input-wrapper__error">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
