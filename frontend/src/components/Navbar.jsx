import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navButtonStyle = (path) => ({
    ...styles.linkBtn,
    ...(location.pathname === path ? styles.activeLinkBtn : {}),
  });

  return (
    <nav style={styles.nav}>
      <div style={styles.brandWrap}>
        <div style={styles.logoBadge}>🦁</div>
        <div>
          <h2 style={styles.logo}>Zoo Management</h2>
          <p style={styles.tagline}>Smart zoo operations dashboard</p>
        </div>
      </div>

      <div style={styles.links}>
        <button style={navButtonStyle("/home")} onClick={() => navigate("/home")}>
          Home
        </button>

        <button
          style={navButtonStyle("/tickets")}
          onClick={() => navigate("/tickets")}
        >
          Tickets
        </button>

        <button
          style={navButtonStyle("/animals")}
          onClick={() => navigate("/animals")}
        >
          Animals
        </button>

        <button
          style={navButtonStyle("/enclosures")}
          onClick={() => navigate("/enclosures")}
        >
          Enclosures
        </button>

        <button style={navButtonStyle("/staff")} onClick={() => navigate("/staff")}>
          Staff
        </button>

        <button
          style={navButtonStyle("/feeding-schedules")}
          onClick={() => navigate("/feeding-schedules")}
        >
          Feeding
        </button>

        <button
          style={navButtonStyle("/medical-records")}
          onClick={() => navigate("/medical-records")}
        >
          Medical
        </button>

        {isAdmin && (
          <>
            <button
              style={navButtonStyle("/admin")}
              onClick={() => navigate("/admin")}
            >
              Admin
            </button>

            <button
              style={navButtonStyle("/users")}
              onClick={() => navigate("/users")}
            >
              Users
            </button>
          </>
        )}

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    padding: "16px 28px",
    background: "linear-gradient(90deg, #0f172a, #1e3a8a)",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.22)",
    flexWrap: "wrap",
  },
  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logoBadge: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
  },
  logo: {
    margin: 0,
    color: "#ffffff",
    fontSize: "1.35rem",
    fontWeight: "bold",
    letterSpacing: "0.3px",
  },
  tagline: {
    margin: "2px 0 0 0",
    color: "rgba(255,255,255,0.72)",
    fontSize: "0.82rem",
  },
  links: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  linkBtn: {
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "9px 14px",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.92rem",
    backdropFilter: "blur(4px)",
  },
  activeLinkBtn: {
    background: "#ffffff",
    color: "#1e3a8a",
    border: "1px solid #ffffff",
    boxShadow: "0 6px 18px rgba(255,255,255,0.18)",
  },
  logoutBtn: {
    background: "linear-gradient(90deg, #dc2626, #ef4444)",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: "0 8px 18px rgba(220, 38, 38, 0.28)",
  },
};

export default Navbar;