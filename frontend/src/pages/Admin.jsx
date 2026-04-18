import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Admin() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    totalAnimals: 0,
    totalEnclosures: 0,
    totalStaff: 0,
    totalFeedingSchedules: 0,
    totalMedicalRecords: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await API.get("/dashboard/counts");
      setCounts(res.data);
    } catch (error) {
      console.error("Error loading dashboard counts:", error);
    }
  };

  const statCards = [
    {
      title: "Animals",
      value: counts.totalAnimals,
      icon: "🦁",
      action: "Manage animals",
      path: "/animals",
    },
    {
      title: "Enclosures",
      value: counts.totalEnclosures,
      icon: "🏠",
      action: "Manage enclosures",
      path: "/enclosures",
    },
    {
      title: "Staff",
      value: counts.totalStaff,
      icon: "👨‍🔧",
      action: "Manage staff",
      path: "/staff",
    },
    {
      title: "Feeding",
      value: counts.totalFeedingSchedules,
      icon: "🍖",
      action: "Manage feeding",
      path: "/feeding-schedules",
    },
    {
      title: "Medical",
      value: counts.totalMedicalRecords,
      icon: "🏥",
      action: "Manage medical",
      path: "/medical-records",
    },
    {
      title: "Users",
      value: counts.totalUsers,
      icon: "👥",
      action: "Manage users",
      path: "/users",
    },
  ];

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.heroPill}>Admin Control Center</div>
            <h1 style={styles.heroTitle}>Admin Dashboard</h1>
            <p style={styles.heroText}>
              Control the complete zoo management system from one dashboard.
              Monitor counts, manage records, and quickly move to every module.
            </p>

            <div style={styles.heroButtons}>
              <button
                style={styles.primaryBtn}
                onClick={() => navigate("/animals")}
              >
                Go to Animals
              </button>
              <button
                style={styles.secondaryBtn}
                onClick={() => navigate("/users")}
              >
                Open Users
              </button>
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroRightCard}>
              <h3 style={styles.heroRightTitle}>System health</h3>
              <div style={styles.quickStats}>
                <div style={styles.quickCard}>
                  <span style={styles.quickLabel}>Total records</span>
                  <strong style={styles.quickValue}>
                    {counts.totalAnimals +
                      counts.totalEnclosures +
                      counts.totalStaff +
                      counts.totalFeedingSchedules +
                      counts.totalMedicalRecords +
                      counts.totalUsers}
                  </strong>
                </div>

                <div style={styles.quickCard}>
                  <span style={styles.quickLabel}>Admin tools</span>
                  <strong style={styles.quickValue}>6 Modules</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Live Module Overview</h2>
              <p style={styles.sectionSubtext}>
                Real-time summary of all important zoo system modules.
              </p>
            </div>
          </div>

          <div style={styles.statsGrid}>
            {statCards.map((item) => (
              <div key={item.title} style={styles.statCard}>
                <div style={styles.statTop}>
                  <div style={styles.statIcon}>{item.icon}</div>
                  <div>
                    <h3 style={styles.statTitle}>{item.title}</h3>
                    <p style={styles.statSubtext}>{item.action}</p>
                  </div>
                </div>

                <div style={styles.statNumber}>{item.value}</div>

                <button
                  style={styles.cardActionBtn}
                  onClick={() => navigate(item.path)}
                >
                  Open {item.title}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Quick Actions</h2>
              <p style={styles.sectionSubtext}>
                Jump directly to the most common management tasks.
              </p>
            </div>
          </div>

          <div style={styles.actionsGrid}>
            <button
              style={styles.actionButton}
              onClick={() => navigate("/animals")}
            >
              <span style={styles.actionIcon}>🐾</span>
              <div>
                <strong style={styles.actionTitle}>Animals</strong>
                <p style={styles.actionText}>Add and update animal records</p>
              </div>
            </button>

            <button
              style={styles.actionButton}
              onClick={() => navigate("/enclosures")}
            >
              <span style={styles.actionIcon}>🏕️</span>
              <div>
                <strong style={styles.actionTitle}>Enclosures</strong>
                <p style={styles.actionText}>Manage all habitat areas</p>
              </div>
            </button>

            <button
              style={styles.actionButton}
              onClick={() => navigate("/staff")}
            >
              <span style={styles.actionIcon}>👨‍💼</span>
              <div>
                <strong style={styles.actionTitle}>Staff</strong>
                <p style={styles.actionText}>Track employees and roles</p>
              </div>
            </button>

            <button
              style={styles.actionButton}
              onClick={() => navigate("/feeding-schedules")}
            >
              <span style={styles.actionIcon}>🍽️</span>
              <div>
                <strong style={styles.actionTitle}>Feeding</strong>
                <p style={styles.actionText}>Plan animal feeding schedules</p>
              </div>
            </button>

            <button
              style={styles.actionButton}
              onClick={() => navigate("/medical-records")}
            >
              <span style={styles.actionIcon}>🩺</span>
              <div>
                <strong style={styles.actionTitle}>Medical</strong>
                <p style={styles.actionText}>Handle health records</p>
              </div>
            </button>

            <button
              style={styles.actionButton}
              onClick={() => navigate("/users")}
            >
              <span style={styles.actionIcon}>🔐</span>
              <div>
                <strong style={styles.actionTitle}>Users</strong>
                <p style={styles.actionText}>View and manage system users</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #edf4ff 0%, #f8fbff 45%, #f8fafc 100%)",
  },
  container: {
    width: "92%",
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "28px 0 48px",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "1.3fr 0.7fr",
    gap: "24px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,58,138,0.95))",
    color: "#ffffff",
    borderRadius: "28px",
    padding: "34px",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.18)",
  },
  heroLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heroPill: {
    display: "inline-flex",
    alignSelf: "flex-start",
    background: "rgba(255,255,255,0.12)",
    color: "#dbeafe",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "999px",
    padding: "8px 14px",
    fontSize: "0.86rem",
    fontWeight: "700",
    marginBottom: "16px",
  },
  heroTitle: {
    margin: 0,
    fontSize: "2.6rem",
    lineHeight: 1.15,
  },
  heroText: {
    marginTop: "16px",
    marginBottom: 0,
    color: "rgba(255,255,255,0.84)",
    fontSize: "1.03rem",
    lineHeight: 1.85,
    maxWidth: "700px",
  },
  heroButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "24px",
  },
  primaryBtn: {
    background: "#ffffff",
    color: "#1d4ed8",
    border: "none",
    padding: "13px 20px",
    borderRadius: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(255,255,255,0.14)",
  },
  secondaryBtn: {
    background: "rgba(255,255,255,0.10)",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.16)",
    padding: "13px 20px",
    borderRadius: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },
  heroRight: {
    display: "flex",
    alignItems: "stretch",
  },
  heroRightCard: {
    width: "100%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px",
    padding: "22px",
  },
  heroRightTitle: {
    margin: "0 0 16px 0",
    fontSize: "1.1rem",
  },
  quickStats: {
    display: "grid",
    gap: "12px",
  },
  quickCard: {
    background: "rgba(255,255,255,0.10)",
    borderRadius: "16px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  quickLabel: {
    color: "rgba(255,255,255,0.74)",
    fontSize: "0.88rem",
  },
  quickValue: {
    color: "#ffffff",
    fontSize: "1.35rem",
  },
  section: {
    marginTop: "30px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "16px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  sectionTitle: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.7rem",
  },
  sectionSubtext: {
    margin: "6px 0 0 0",
    color: "#64748b",
    fontSize: "0.98rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },
  statCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(148,163,184,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  statTop: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
  },
  statTitle: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.05rem",
  },
  statSubtext: {
    margin: "4px 0 0 0",
    color: "#64748b",
    fontSize: "0.9rem",
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1d4ed8",
  },
  cardActionBtn: {
    background: "#0f172a",
    color: "#ffffff",
    border: "none",
    padding: "11px 14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  actionButton: {
    background: "#ffffff",
    border: "1px solid rgba(148,163,184,0.12)",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    textAlign: "left",
    cursor: "pointer",
  },
  actionIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.35rem",
    flexShrink: 0,
  },
  actionTitle: {
    display: "block",
    color: "#0f172a",
    marginBottom: "4px",
    fontSize: "1rem",
  },
  actionText: {
    margin: 0,
    color: "#64748b",
    fontSize: "0.92rem",
    lineHeight: 1.6,
  },
};

export default Admin;