
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>ACES</h1>
          <h2>Log In</h2>
          <p>Welcome back! Please log in to continue.</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="lrn">Learner Reference Number (LRN)</label>
            <input
              id="lrn"
              name="lrn"
              type="text"
              placeholder="Enter your LRN"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="button" className="auth-button">
            Log In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
