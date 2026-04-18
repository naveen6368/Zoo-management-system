import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/users/register", formData);

      if (response.data) {
        alert("Registration successful! Please login now.");
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.data) {
        const data = error.response.data;

        if (typeof data === "object") {
          const firstError = Object.values(data)[0];
          alert(firstError);
        } else {
          alert("Registration failed");
        }
      } else {
        alert("Registration failed. Please check backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgShapeOne}></div>
      <div style={styles.bgShapeTwo}></div>

      <div style={styles.wrapper}>
        <div style={styles.leftPanel}>
          <div style={styles.badge}>Create New Account</div>
          <h1 style={styles.title}>Join the zoo system with a clean start.</h1>
          <p style={styles.subtitle}>
            Register your account to access animal data, feeding records,
            medical updates, and role-based zoo management features.
          </p>

          <div style={styles.featureGrid}>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🔐</span>
              <div>
                <strong style={styles.featureTitle}>Secure Access</strong>
                <p style={styles.featureText}>Role-based system entry</p>
              </div>
            </div>

            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>📋</span>
              <div>
                <strong style={styles.featureTitle}>Organized Modules</strong>
                <p style={styles.featureText}>Everything in one dashboard</p>
              </div>
            </div>

            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🦓</span>
              <div>
                <strong style={styles.featureTitle}>Animal Visibility</strong>
                <p style={styles.featureText}>Track all zoo records clearly</p>
              </div>
            </div>

            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>⚙️</span>
              <div>
                <strong style={styles.featureTitle}>Admin Control</strong>
                <p style={styles.featureText}>Smart management capabilities</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.formCard}>
            <div style={styles.formTop}>
              <div style={styles.formIcon}>📝</div>
              <h2 style={styles.formTitle}>Create Account</h2>
              <p style={styles.formText}>
                Fill in the details below to register in the system.
              </p>
            </div>

            <form onSubmit={handleRegister} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={styles.input}
                >
                <option value="USER">USER</option>
                </select>
              </div>

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p style={styles.bottomText}>
              Already have an account?{" "}
              <span style={styles.link} onClick={() => navigate("/")}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px",
    fontFamily: "Arial, sans-serif",
  },
  bgShapeOne: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    top: "-80px",
    left: "-80px",
    filter: "blur(10px)",
  },
  bgShapeTwo: {
    position: "absolute",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    bottom: "-120px",
    right: "-100px",
    filter: "blur(10px)",
  },
  wrapper: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "1220px",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "26px",
    alignItems: "stretch",
  },
  leftPanel: {
    color: "#ffffff",
    padding: "30px 14px 30px 8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  badge: {
    display: "inline-flex",
    alignSelf: "flex-start",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "999px",
    padding: "9px 14px",
    fontSize: "0.86rem",
    fontWeight: "700",
    marginBottom: "18px",
    color: "#dbeafe",
  },
  title: {
    margin: 0,
    fontSize: "3rem",
    lineHeight: 1.1,
    maxWidth: "620px",
    letterSpacing: "-0.6px",
  },
  subtitle: {
    marginTop: "18px",
    marginBottom: 0,
    maxWidth: "660px",
    fontSize: "1.03rem",
    lineHeight: 1.9,
    color: "rgba(255,255,255,0.82)",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginTop: "30px",
    maxWidth: "720px",
  },
  featureCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    padding: "18px",
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
    backdropFilter: "blur(6px)",
  },
  featureIcon: {
    fontSize: "1.4rem",
    lineHeight: 1,
  },
  featureTitle: {
    display: "block",
    fontSize: "0.98rem",
    marginBottom: "5px",
  },
  featureText: {
    margin: 0,
    color: "rgba(255,255,255,0.74)",
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  rightPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formCard: {
    width: "100%",
    maxWidth: "470px",
    background: "rgba(255,255,255,0.97)",
    borderRadius: "30px",
    padding: "34px",
    boxShadow: "0 24px 50px rgba(0,0,0,0.24)",
  },
  formTop: {
    textAlign: "left",
    marginBottom: "24px",
  },
  formIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    marginBottom: "14px",
  },
  formTitle: {
    margin: 0,
    fontSize: "2rem",
    color: "#0f172a",
  },
  formText: {
    marginTop: "8px",
    marginBottom: 0,
    color: "#64748b",
    lineHeight: 1.7,
    fontSize: "0.96rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "0.92rem",
    color: "#334155",
    fontWeight: "700",
  },
  input: {
    padding: "15px 16px",
    borderRadius: "14px",
    border: "1px solid #dbe2ea",
    background: "#f8fbff",
    fontSize: "0.98rem",
    outline: "none",
  },
  button: {
    marginTop: "4px",
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    color: "#ffffff",
    border: "none",
    padding: "15px",
    borderRadius: "14px",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(37,99,235,0.25)",
  },
  bottomText: {
    marginTop: "20px",
    marginBottom: 0,
    color: "#64748b",
    fontSize: "0.95rem",
  },
  link: {
    color: "#2563eb",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Register;