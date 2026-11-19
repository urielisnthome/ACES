import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../styles/auth/login.css";

function Login() {
  const navigate = useNavigate();

  const [lrn, setLrn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lrn || !password) {
      alert("Please enter your LRN and password.");
      return;
    }

    if (!/^\d{12}$/.test(lrn)) {
      alert("Please enter a valid 12-digit LRN.");
      return;
    }

    alert("Login form validated successfully! Backend integration is not yet connected.");
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <div className="login-brand">
          <img src={logo} alt="ACES Logo" />
          <h1>ALS Career System Evaluator</h1>
        </div>

        <button
          className="student-access-button"
          onClick={() => navigate("/")}
        >
          STUDENT ACCESS
        </button>
      </header>

      {/* Main Content */}
      <main className="login-layout">
        {/* Left Column */}
        <section className="login-sidebar">
          <div className="login-intro-panel">
            <span className="panel-eyebrow">A PLACE TO BEGIN</span>

            <h2>
              Your Career.
              <br />
              Our guidance.
            </h2>

            <p>
              An assessment that can help us lead you
              <br className="desktop-break" />
              to a career that is fit for you.
            </p>
          </div>

          <div className="school-info-panel">
            <span>NEED AN ACCOUNT?</span>

            <h3>Start with your school.</h3>

            <p>
              Ask your school administrator to register your student
              record or help with sign-in.
            </p>
          </div>
        </section>

        {/* Right Column */}
        <section className="login-form-panel">
          <div className="login-form-content">
            <h2>Welcome!</h2>
            <p className="login-subtitle">
              Sign in with your school-issued account.
            </p>

            <form onSubmit={handleSubmit}>
              {/* LRN Field */}
              <div className="form-group">
                <label htmlFor="lrn">Student LRN</label>

                <input
                  id="lrn"
                  type="text"
                  inputMode="numeric"
                  maxLength="12"
                  placeholder="Enter your LRN"
                  value={lrn}
                  onChange={(e) =>
                    setLrn(e.target.value.replace(/\D/g, ""))
                  }
                  required
                />

                <small>
                  Use the Learner Reference Number on your school record.
                </small>
              </div>

              {/* Password Field */}
              <div className="form-group password-group">
                <label htmlFor="password">Password</label>

                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="show-password-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <small>Enter the password provided for your account.</small>
              </div>

              {/* Submit Button */}
              <button type="submit" className="sign-in-button">
                Sign in
              </button>
            </form>

            <button
              type="button"
              className="forgot-password-button"
              onClick={() =>
                alert("Please contact your school administrator for password assistance.")
              }
            >
              Forgot password?
            </button>

            {/* Help Information */}
            <div className="login-help-box">
              <h3>Trouble signing in?</h3>

              <p>
                Contact your school administrator for help with your LRN
                or password. Student accounts are registered by the school.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;