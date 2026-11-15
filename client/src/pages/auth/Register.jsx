
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    lrn: "",
    email: "",
    mobile_number: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (formData.mobile_number && !/^\d{11}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Mobile number must contain 11 digits.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    alert("Registration form validated successfully! Backend integration is not yet connected.");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>ACES</h1>
          <h2>Create an Account</h2>
          <p>Register to access the ACES career assessment system.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name *</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Enter first name"
                value={formData.first_name}
                onChange={handleChange}
              />
              {errors.first_name && <span className="error-message">{errors.first_name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="middle_name">Middle Name</label>
              <input
                id="middle_name"
                name="middle_name"
                type="text"
                placeholder="Enter middle name"
                value={formData.middle_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name *</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Enter last name"
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lrn">Learner Reference Number (LRN) *</label>
            <input
              id="lrn"
              name="lrn"
              type="text"
              inputMode="numeric"
              maxLength={12}
              placeholder="Enter your 12-digit LRN"
              value={formData.lrn}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                setFormData((prev) => ({ ...prev, lrn: value }));
                setErrors((prev) => ({ ...prev, lrn: "" }));
              }}
            />
            {errors.lrn && <span className="error-message">{errors.lrn}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="tel"
              inputMode="numeric"
              maxLength={11}
              placeholder="09XXXXXXXXX"
              value={formData.mobile_number}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                setFormData((prev) => ({ ...prev, mobile_number: value }));
                setErrors((prev) => ({ ...prev, mobile_number: "" }));
              }}
            />
            {errors.mobile_number && <span className="error-message">{errors.mobile_number}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password *</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
            {errors.password_confirmation && (
              <span className="error-message">{errors.password_confirmation}</span>
            )}
          </div>

          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show passwords
          </label>

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
