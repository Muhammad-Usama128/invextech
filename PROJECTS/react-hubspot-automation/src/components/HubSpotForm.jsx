import React, { useState } from "react";
import axios from "axios";
import "./HubSpotForm.css";

const HubSpotForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  // Validate fields
  const validate = (name, value) => {
    switch (name) {
      case "firstname":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastname":
        if (!value.trim()) return "Last name is required";
        return "";
      case "email":
        if (!value.trim()) {
          return "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear api error on edit
    if (apiError) setApiError("");

    // If field was touched, validate real-time
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    // Validate all fields before submission
    const newErrors = {
      firstname: validate("firstname", formData.firstname),
      lastname: validate("lastname", formData.lastname),
      email: validate("email", formData.email),
    };

    setErrors(newErrors);
    setTouched({ firstname: true, lastname: true, email: true });

    // Check if any error message exists
    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) return;

    setLoading(true);

    // Retrieve environment variables safely with fallback to ensure flawless execution
    const portalId =
      process.env.REACT_APP_HUBSPOT_PORTAL_ID ||
      process.env.HUBSPOT_PORTAL_ID ||
      "246185409";
    const formId =
      process.env.REACT_APP_HUBSPOT_FORM_ID ||
      process.env.HUBSPOT_FORM_ID ||
      "2b38f082-80c3-46ef-84ab-02a3bea3bc71";

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    // Payload formatted strictly per HubSpot v3 Submissions API guidelines
    // Name values map exactly to firstname, lastname, and email
    const payload = {
      fields: [
        { name: "firstname", value: formData.firstname.trim() },
        { name: "lastname", value: formData.lastname.trim() },
        { name: "email", value: formData.email.trim() },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title || "React HubSpot Automation Form",
      },
    };

    try {
      await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmitted(true);
      setFormData({ firstname: "", lastname: "", email: "" });
      setTouched({});
    } catch (error) {
      console.error("HubSpot Submission Error:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Unable to submit the form. Please check your connection or integration configuration.";
      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setApiError("");
  };

  return (
    <div className="form-wrapper">
      {/* Decorative glassmorphism glow elements */}
      <div className="glow-blob-1"></div>
      <div className="glow-blob-2"></div>

      <div className="glass-card">
        {submitted ? (
          <div className="success-container">
            <div className="success-icon-wrapper">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="success-title">Submission Successful!</h3>
            <p className="success-desc">
              Thank you for reaching out. Your details have been seamlessly
              synced to our HubSpot Deals pipeline.
            </p>
            <button onClick={handleReset} className="reset-btn">
              Submit Another Response
            </button>
          </div>
        ) : (
          <>
            <div className="form-header">
              <h2 className="form-title">Let's Connect</h2>
              <p className="form-subtitle">
                Fill out details below to contact us. We will get back to you as
                soon as possible.
              </p>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <label className="input-label" htmlFor="firstname">
                  First Name{" "}
                  <span style={{ color: "var(--error-color)" }}>*</span>
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  className={`input-field ${errors.firstname ? "has-error" : ""}`}
                  placeholder="e.g. Alex"
                  value={formData.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
                {errors.firstname && (
                  <span className="error-text">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.firstname}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="lastname">
                  Last Name{" "}
                  <span style={{ color: "var(--error-color)" }}>*</span>
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  className={`input-field ${errors.lastname ? "has-error" : ""}`}
                  placeholder="e.g. Rivera"
                  value={formData.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
                {errors.lastname && (
                  <span className="error-text">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.lastname}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="email">
                  Email Address{" "}
                  <span style={{ color: "var(--error-color)" }}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`input-field ${errors.email ? "has-error" : ""}`}
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
                {errors.email && (
                  <span className="error-text">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.email}
                  </span>
                )}
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Syncing Deal...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </button>

              {apiError && <div className="api-message error">{apiError}</div>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default HubSpotForm;
