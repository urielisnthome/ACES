
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

import logo from "../../assets/logo.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    extension: "",
    lrn: "",
    email: "",
    gender: "",
    birthdate: "",
    school_level: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const studentName = [
    formData.first_name,
    formData.middle_name,
    formData.last_name,
    formData.extension,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLrnChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);

    setFormData((prev) => ({
      ...prev,
      lrn: value,
    }));

    setErrors((prev) => ({
      ...prev,
      lrn: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required.";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required.";
    }

    if (!/^\d{12}$/.test(formData.lrn)) {
      newErrors.lrn = "LRN must contain exactly 12 digits.";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!formData.birthdate) {
      newErrors.birthdate = "Birthdate is required.";
    }

    if (!formData.school_level) {
      newErrors.school_level = "Please select a school level.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Initial password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    alert(
      "Student information validated successfully! Actual account creation will be available after backend integration."
    );
  };

  return (
    <div className="register-page">

      {/* SIDEBAR */}
      <aside className="register-sidebar">
        <div className="sidebar-workspace">
          ADMIN WORKSPACE
        </div>

        <nav className="sidebar-navigation">
          <button className="sidebar-item active">
            <span className="sidebar-icon">▦</span>
            Dashboard
          </button>

          <button className="sidebar-item">
            <span className="sidebar-icon">♙</span>
            Students
          </button>

          <button className="sidebar-item">
            <span className="sidebar-icon">♧</span>
            Assessments
            <span className="sidebar-chevron">⌄</span>
          </button>
        </nav>

        <button
          className="sidebar-logout"
          onClick={() => navigate("/")}
        >
          <span>⇥</span>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="register-main">

        {/* HEADER */}
        <header className="register-header">
          <div className="register-brand">
            <img src={logo} alt="ACES Logo" />
            <h2>ALS Career Evaluator System</h2>
          </div>

          <span className="portal-label">
            SCHOOL / STUDENT PORTAL
          </span>
        </header>

        {/* PAGE CONTENT */}
        <div className="register-content">

          {/* FORM COLUMN */}
          <section className="register-form-column">

            <div className="register-page-heading">
              <span>ADMIN / REGISTRATION</span>
              <h1>Register a student</h1>
              <p>
                Review the school record, create an account, then save the student.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* STUDENT DETAILS */}
              <section className="student-details-card">

                <h3 className="section-heading">
                  <span>01</span>
                  Enter student details
                </h3>

                <div className="register-fields">

                  <div className="register-field full-width">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Enter first name"
                    />
                    {errors.first_name && (
                      <small className="register-error">{errors.first_name}</small>
                    )}
                  </div>

                  <div className="register-field full-width">
                    <label htmlFor="middle_name">Middle Name</label>
                    <input
                      id="middle_name"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleChange}
                      placeholder="Enter middle name"
                    />
                  </div>

                  <div className="register-grid-two">
                    <div className="register-field">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Enter last name"
                      />
                      {errors.last_name && (
                        <small className="register-error">{errors.last_name}</small>
                      )}
                    </div>

                    <div className="register-field">
                      <label htmlFor="extension">Extension</label>
                      <input
                        id="extension"
                        name="extension"
                        value={formData.extension}
                        onChange={handleChange}
                        placeholder="Jr., Sr., III"
                      />
                    </div>
                  </div>

                  <div className="register-grid-three">

                    <div className="register-field">
                      <label htmlFor="student_name">Student name</label>
                      <input
                        id="student_name"
                        value={studentName}
                        placeholder="Full student name"
                        readOnly
                      />
                    </div>

                    <div className="register-field">
                      <label htmlFor="lrn">LRN</label>
                      <input
                        id="lrn"
                        name="lrn"
                        value={formData.lrn}
                        onChange={handleLrnChange}
                        inputMode="numeric"
                        maxLength={12}
                        placeholder="12-digit LRN"
                      />
                      {errors.lrn && (
                        <small className="register-error">{errors.lrn}</small>
                      )}
                    </div>

                    <div className="register-field">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="student@example.com"
                      />
                      {errors.email && (
                        <small className="register-error">{errors.email}</small>
                      )}
                    </div>

                  </div>

                  <div className="register-grid-three">

                    <div className="register-field">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errors.gender && (
                        <small className="register-error">{errors.gender}</small>
                      )}
                    </div>

                    <div className="register-field">
                      <label htmlFor="birthdate">Birthdate</label>
                      <input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={handleChange}
                      />
                      {errors.birthdate && (
                        <small className="register-error">{errors.birthdate}</small>
                      )}
                    </div>

                    <div className="register-field">
                      <label>School level</label>

                      <div className="school-level-options">
                        <label>
                          <input
                            type="radio"
                            name="school_level"
                            value="JHS"
                            checked={formData.school_level === "JHS"}
                            onChange={handleChange}
                          />
                          JHS
                        </label>

                        <label>
                          <input
                            type="radio"
                            name="school_level"
                            value="SHS"
                            checked={formData.school_level === "SHS"}
                            onChange={handleChange}
                          />
                          SHS
                        </label>
                      </div>

                      {errors.school_level && (
                        <small className="register-error">{errors.school_level}</small>
                      )}
                    </div>

                  </div>
                </div>
              </section>

              {/* ACCOUNT CREATION */}
              <section className="account-creation-card">

                <div className="account-section-heading">
                  <h3>
                    <span>04</span>
                    Create new student account
                  </h3>

                  <span className="current-step-label">CURRENT STEP</span>
                </div>

                <div className="account-fields">

                  <div className="identifier-box">
                    <small>LRN / Sign-in Identifier</small>
                    <strong>{formData.lrn || "Enter student LRN above"}</strong>
                  </div>

                  <div className="register-field">
                    <label htmlFor="password">Password Default</label>

                    <div className="default-password-wrapper">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Example1223"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    {errors.password && (
                      <small className="register-error">{errors.password}</small>
                    )}
                  </div>

                </div>

                <button type="submit" className="create-account-button">
                  Create user account
                </button>

              </section>

            </form>
          </section>

          {/* RIGHT INFORMATION PANEL */}
          <aside className="registration-guide">

            <span className="guide-eyebrow">STUDENT REGISTRATION</span>

            <h2>
              A clear path
              <br />
              to access.
            </h2>

            <p className="guide-description">
              Verify the student before creating an account.
            </p>

            <div className="registration-steps">

              <div className="registration-step">
                <strong>01</strong>
                <div>
                  <p>Enter student details</p>
                  <small>Completed</small>
                </div>
              </div>

              <div className="registration-step">
                <strong>02</strong>
                <div>
                  <p>Check valid credentials</p>
                  <small>Verified</small>
                </div>
              </div>

              <div className="registration-step">
                <strong>03</strong>
                <div>
                  <p>Check school enrollment</p>
                  <small>Student confirmed</small>
                </div>
              </div>

              <div className="registration-step current">
                <strong>04</strong>
                <div>
                  <p>Create new user account</p>
                  <small>Current step</small>
                </div>
              </div>

              <div className="registration-step">
                <strong>05</strong>
                <div>
                  <p>Save student record</p>
                  <small>After account creation</small>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}

export default Register;
