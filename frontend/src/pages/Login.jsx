import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", formData);

      if (response.data.status === "SUCCESS") {
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);

        if (response.data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error.response?.data?.message ||
          "Login failed. Please check backend and credentials."
      );
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
          <div style={styles.badge}>Zoo Management System</div>
          <h1 style={styles.title}>Manage your zoo smarter, faster, better.</h1>
          <p style={styles.subtitle}>
            Organize animals, enclosures, staff, feeding schedules, medical
            records, and users through one clean dashboard built for efficient
            zoo administration.
          </p>

          <div style={styles.featureGrid}>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🦁</span>
              <div>
                <strong style={styles.featureTitle}>Animal Records</strong>
                <p style={styles.featureText}>Track species, health, and housing</p>
              </div>
            </div>

            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🏥</span>
              <div>
                <strong style={styles.featureTitle}>Medical Care</strong>
                <p style={styles.featureText}>Store and monitor health records</p>
              </div>
            </div>

            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🍖</span>
              <div>
                <strong style={styles.featureTitle}>Feeding Plans</strong>
                <p style={styles.featureText}>Schedule feeding with keeper details</p>
              </div>
            </div>

            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>👥</span>
              <div>
                <strong style={styles.featureTitle}>Role Access</strong>
                <p style={styles.featureText}>Separate admin and user control</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.formCard}>
            <div style={styles.formTop}>
              <div style={styles.formIcon}>🔐</div>
              <h2 style={styles.formTitle}>Welcome Back</h2>
              <p style={styles.formText}>
                Sign in to continue managing your zoo system.
              </p>
            </div>

            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p style={styles.bottomText}>
              Don’t have an account?{" "}
              <span style={styles.link} onClick={() => navigate("/register")}>
                Register
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

export default Login;