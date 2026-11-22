
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getStudents } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "../../styles/auth/login.css";

function findStudentByLrn(records, enteredLrn) {
  if (!Array.isArray(records)) {
    return null;
  }

  return (
    records.find(
      (student) =>
        String(student.lrn).trim() === String(enteredLrn).trim()
    ) || null
  );
}

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [lrn, setLrn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!lrn || !password) {
      setApiError("Please enter your LRN and password.");
      return;
    }

    if (!/^\d{12}$/.test(lrn)) {
      setApiError("Please enter a valid 12-digit LRN.");
      return;
    }

    try {
      setLoading(true);

      // Authenticate student
      const response = await login({
        lrn,
        password,
      });

      const token = response.data.access_token;

      // Save authentication token
      localStorage.setItem("access_token", token);

      // Retrieve student records
      const studentsResponse = await getStudents();
      const studentRecords = studentsResponse.data;

      // Find the student using the entered LRN
      const student = findStudentByLrn(studentRecords, lrn);

      if (!student || !student.student_details) {
        localStorage.removeItem("access_token");

        setApiError(
          "Your account was authenticated, but your student information could not be found. Please contact your administrator."
        );

        return;
      }

      // Extract nested student details
      const studentDetails = student.student_details;

      // Store student and authentication information
      loginUser({
        ...studentDetails,
        name: studentDetails.name || "Student",
        lrn: student.lrn,
        access_token: token,
        token_type: response.data.token_type,
        expires_in: response.data.expires_in,
      });

      // Proceed to LandingPage
      navigate("/landing", { replace: true });
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      localStorage.removeItem("access_token");

      setApiError(
        error.response?.data?.message ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
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

      <main className="login-layout">
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

        <section className="login-form-panel">
          <div className="login-form-content">
            <h2>Welcome!</h2>

            <p className="login-subtitle">
              Sign in with your school-issued account.
            </p>

            <form onSubmit={handleSubmit}>
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

              {apiError && (
                <small className="register-error">
                  {apiError}
                </small>
              )}

              <button
                type="submit"
                className="sign-in-button"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <button
              type="button"
              className="forgot-password-button"
              onClick={() =>
                alert(
                  "Please contact your school administrator for password assistance."
                )
              }
            >
              Forgot password?
            </button>

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