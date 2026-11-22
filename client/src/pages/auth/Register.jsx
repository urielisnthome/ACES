
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import "../../styles/auth/register.css";

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
    age: "",
    address_number: "",
    street: "",
    barangay: "",
    district: "",
    municipality: "",
    city: "",
    province: "",
    zip_code: "",
    contact_number: "",
    parent_guardian_name: "",
    guardian_contact_number: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const studentName = [
    formData.first_name,
    formData.middle_name,
    formData.last_name,
    formData.extension,
  ]
    .filter((part) => part.trim())
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
      general: "",
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
      general: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!formData.birthdate) {
      newErrors.birthdate = "Birthdate is required.";
    }

    if (!formData.age || Number(formData.age) <= 0) {
      newErrors.age = "Enter a valid age.";
    }

    const addressFields = [
      "address_number",
      "street",
      "barangay",
      "district",
      "municipality",
      "city",
      "province",
      "zip_code",
    ];

    addressFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.replaceAll("_", " ")} is required.`;
      }
    });

    if (!formData.contact_number.trim()) {
      newErrors.contact_number = "Contact number is required.";
    }

    if (!formData.parent_guardian_name.trim()) {
      newErrors.parent_guardian_name =
        "Parent or guardian name is required.";
    }

    if (!formData.guardian_contact_number.trim()) {
      newErrors.guardian_contact_number =
        "Guardian contact number is required.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Please confirm the password.";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const registrationData = {
      lrn: formData.lrn,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      name: studentName,
      email: formData.email.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      birthdate: formData.birthdate,
      address: {
        address_number: formData.address_number.trim(),
        street: formData.street.trim(),
        barangay: formData.barangay.trim(),
        district: formData.district.trim(),
        municipality: formData.municipality.trim(),
        city: formData.city.trim(),
        province: formData.province.trim(),
        zip_code: formData.zip_code.trim(),
      },
      contact_number: formData.contact_number.trim(),
      parent_guardian_name: formData.parent_guardian_name.trim(),
      guardian_contact_number: formData.guardian_contact_number.trim(),
    };

    try {
      setIsSubmitting(true);
      setErrors({});

      await register(registrationData);

      alert("Student account registered successfully!");
      navigate("/login");
    } catch (error) {
      const responseData = error.response?.data;

      if (responseData?.errors) {
        const backendErrors = {};

        Object.entries(responseData.errors).forEach(([field, messages]) => {
          const fieldName = field.startsWith("address.")
            ? field.replace("address.", "")
            : field;

          backendErrors[fieldName] = Array.isArray(messages)
            ? messages[0]
            : messages;
        });

        setErrors(backendErrors);
      } else {
        setErrors({
          general:
            responseData?.message ||
            "Registration failed. Please check your information and try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAddressField = (name, label, placeholder) => (
    <div className="register-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      {errors[name] && (
        <small className="register-error">{errors[name]}</small>
      )}
    </div>
  );

  return (
    <div className="register-page">
      <aside className="register-sidebar">
        <div className="sidebar-workspace">ADMIN WORKSPACE</div>

        <nav className="sidebar-navigation">
          <button type="button" className="sidebar-item active">
            <span className="sidebar-icon">▦</span>
            Dashboard
          </button>

          <button type="button" className="sidebar-item">
            <span className="sidebar-icon">♙</span>
            Students
          </button>

          <button type="button" className="sidebar-item">
            <span className="sidebar-icon">♧</span>
            Assessments
            <span className="sidebar-chevron">⌄</span>
          </button>
        </nav>

        <button
          type="button"
          className="sidebar-logout"
          onClick={() => navigate("/")}
        >
          <span>⇥</span>
          Logout
        </button>
      </aside>

      <main className="register-main">
        <header className="register-header">
          <div className="register-brand">
            <img src={logo} alt="ACES Logo" />
            <h2>ALS Career Evaluator System</h2>
          </div>

          <span className="portal-label">SCHOOL / STUDENT PORTAL</span>
        </header>

        <div className="register-content">
          <section className="register-form-column">
            <div className="register-page-heading">
              <span>ADMIN / REGISTRATION</span>
              <h1>Register a student</h1>
              <p>
                Review the school record, create an account, then save the student.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
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
                      required
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
                        required
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
                      <label htmlFor="student_name">Student Name</label>
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
                        required
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
                        required
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
                        required
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
                        required
                      />
                      {errors.birthdate && (
                        <small className="register-error">{errors.birthdate}</small>
                      )}
                    </div>

                    <div className="register-field">
                      <label htmlFor="age">Age</label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        min="1"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                        required
                      />
                      {errors.age && (
                        <small className="register-error">{errors.age}</small>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="student-details-card">
                <h3 className="section-heading">
                  <span>02</span>
                  Enter address details
                </h3>

                <div className="register-fields">
                  <div className="register-grid-two">
                    {renderAddressField("address_number", "Address Number", "e.g. 123")}
                    {renderAddressField("street", "Street", "Enter street")}
                  </div>

                  <div className="register-grid-two">
                    {renderAddressField("barangay", "Barangay", "Enter barangay")}
                    {renderAddressField("district", "District", "Enter district")}
                  </div>

                  <div className="register-grid-two">
                    {renderAddressField("municipality", "Municipality", "Enter municipality")}
                    {renderAddressField("city", "City", "Enter city")}
                  </div>

                  <div className="register-grid-two">
                    {renderAddressField("province", "Province", "Enter province")}
                    {renderAddressField("zip_code", "ZIP Code", "Enter ZIP code")}
                  </div>
                </div>
              </section>

              <section className="student-details-card">
                <h3 className="section-heading">
                  <span>03</span>
                  Contact and guardian details
                </h3>

                <div className="register-fields">
                  <div className="register-field full-width">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                      id="contact_number"
                      name="contact_number"
                      type="tel"
                      value={formData.contact_number}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      required
                    />
                    {errors.contact_number && (
                      <small className="register-error">{errors.contact_number}</small>
                    )}
                  </div>

                  <div className="register-field full-width">
                    <label htmlFor="parent_guardian_name">
                      Parent / Guardian Name
                    </label>
                    <input
                      id="parent_guardian_name"
                      name="parent_guardian_name"
                      value={formData.parent_guardian_name}
                      onChange={handleChange}
                      placeholder="Enter parent or guardian name"
                      required
                    />
                    {errors.parent_guardian_name && (
                      <small className="register-error">{errors.parent_guardian_name}</small>
                    )}
                  </div>

                  <div className="register-field full-width">
                    <label htmlFor="guardian_contact_number">
                      Guardian Contact Number
                    </label>
                    <input
                      id="guardian_contact_number"
                      name="guardian_contact_number"
                      type="tel"
                      value={formData.guardian_contact_number}
                      onChange={handleChange}
                      placeholder="Enter guardian contact number"
                      required
                    />
                    {errors.guardian_contact_number && (
                      <small className="register-error">
                        {errors.guardian_contact_number}
                      </small>
                    )}
                  </div>
                </div>
              </section>

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
                    <label htmlFor="password">Password</label>

                    <div className="default-password-wrapper">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
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

                  <div className="register-field">
                    <label htmlFor="password_confirmation">Confirm Password</label>

                    <div className="default-password-wrapper">
                      <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    {errors.password_confirmation && (
                      <small className="register-error">
                        {errors.password_confirmation}
                      </small>
                    )}
                  </div>
                </div>

                {errors.general && (
                  <small className="register-error">{errors.general}</small>
                )}

                <button
                  type="submit"
                  className="create-account-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create user account"}
                </button>
              </section>
            </form>
          </section>

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
                  <p>Enter address details</p>
                  <small>Required</small>
                </div>
              </div>

              <div className="registration-step">
                <strong>03</strong>
                <div>
                  <p>Enter contact details</p>
                  <small>Required</small>
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