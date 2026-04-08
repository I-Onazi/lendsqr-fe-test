import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
const logo = "/images/lendsqr-logo.svg";
const illustration = "/images/login-image.svg";
import "./Login.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate login - in real app, this would be an API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Store auth state (simple mock)
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard/users");
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__left">
        <div className="login-page__logo">
          <img src={logo} alt="Lendsqr Logo" />
        </div>
        <div className="login-page__illustration">
          <img src={illustration} alt="Sign in illustration" />
        </div>
      </div>

      <div className="login-page__right">
        <div className="login-page__form-container">
          <h1 className="login-page__title">Welcome!</h1>
          <p className="login-page__subtitle">Enter details to login.</p>

          {error && <div className="login-page__error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-page__form">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordToggle
            />

            <a href="#" className="login-page__forgot-link">
              FORGOT PASSWORD?
            </a>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              isLoading={isLoading}
            >
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
