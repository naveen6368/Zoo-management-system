import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    totalAnimals: 0,
    totalEnclosures: 0,
    totalStaff: 0,
    totalFeedingSchedules: 0,
    totalMedicalRecords: 0,
    totalUsers: 0,
  });

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const countsRes = await API.get("/dashboard/counts");
      const animalsRes = await API.get("/animals");

      setCounts(countsRes.data);
      setAnimals(animalsRes.data.slice(0, 4));
    } catch (error) {
      console.error("Error loading home data:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: "Animals", value: counts.totalAnimals, icon: "🦁" },
    { title: "Enclosures", value: counts.totalEnclosures, icon: "🏠" },
    { title: "Staff", value: counts.totalStaff, icon: "👨‍🔧" },
    { title: "Feeding", value: counts.totalFeedingSchedules, icon: "🍖" },
    { title: "Medical", value: counts.totalMedicalRecords, icon: "🏥" },
    { title: "Users", value: counts.totalUsers, icon: "👥" },
  ];

  const quickActions = [
    {
      title: "Book Ticket",
      text: "Create and view zoo visit bookings quickly.",
      icon: "🎟️",
      path: "/tickets",
    },
    {
      title: "View Animals",
      text: "Browse animal records, health, and enclosure details.",
      icon: "🐾",
      path: "/animals",
    },
    {
      title: "View Enclosures",
      text: "Check habitat capacity, location, and current status.",
      icon: "🏕️",
      path: "/enclosures",
    },
    {
      title: "View Staff",
      text: "See zoo staff roles, shifts, and assigned areas.",
      icon: "👨‍💼",
      path: "/staff",
    },
  ];

  if (isAdmin) {
    quickActions.push({
      title: "Admin Dashboard",
      text: "Open the control center for full system management.",
      icon: "⚙️",
      path: "/admin",
    });
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.heroPill}>Zoo Operations • Smart Dashboard</div>
            <h1 style={styles.heroTitle}>
              Welcome{username ? `, ${username}` : ""} 👋
            </h1>
            <p style={styles.heroText}>
              Manage animals, enclosures, staff, feeding schedules, medical
              records, and zoo ticket bookings from one organized system.
            </p>

            <div style={styles.heroButtonRow}>
              <button
                style={styles.primaryBtn}
                onClick={() => navigate("/tickets")}
              >
                Book Ticket
              </button>

              <button
                style={styles.secondaryBtn}
                onClick={() => navigate("/animals")}
              >
                Explore Animals
              </button>

              {isAdmin && (
                <button
                  style={styles.darkBtn}
                  onClick={() => navigate("/admin")}
                >
                  Open Admin Dashboard
                </button>
              )}
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroRightCard}>
              <h3 style={styles.heroRightTitle}>Today’s snapshot</h3>
              <div style={styles.miniGrid}>
                <div style={styles.miniCard}>
                  <span style={styles.miniLabel}>Animals</span>
                  <strong style={styles.miniValue}>{counts.totalAnimals}</strong>
                </div>
                <div style={styles.miniCard}>
                  <span style={styles.miniLabel}>Staff</span>
                  <strong style={styles.miniValue}>{counts.totalStaff}</strong>
                </div>
                <div style={styles.miniCard}>
                  <span style={styles.miniLabel}>Medical</span>
                  <strong style={styles.miniValue}>
                    {counts.totalMedicalRecords}
                  </strong>
                </div>
                <div style={styles.miniCard}>
                  <span style={styles.miniLabel}>Users</span>
                  <strong style={styles.miniValue}>{counts.totalUsers}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Quick Actions</h2>
              <p style={styles.sectionSubtext}>
                Jump directly to the most useful parts of the system.
              </p>
            </div>
          </div>

          <div style={styles.actionsGrid}>
            {quickActions.map((item) => (
              <button
                key={item.title}
                style={styles.actionButton}
                onClick={() => navigate(item.path)}
              >
                <span style={styles.actionIcon}>{item.icon}</span>
                <div>
                  <strong style={styles.actionTitle}>{item.title}</strong>
                  <p style={styles.actionText}>{item.text}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Dashboard Overview</h2>
              <p style={styles.sectionSubtext}>
                Quick live summary of your zoo management system.
              </p>
            </div>
          </div>

          {loading ? (
            <p style={styles.loadingText}>Loading dashboard...</p>
          ) : (
            <div style={styles.statsGrid}>
              {stats.map((item) => (
                <div key={item.title} style={styles.statCard}>
                  <div style={styles.statTop}>
                    <div style={styles.statIcon}>{item.icon}</div>
                    <span style={styles.statTitle}>{item.title}</span>
                  </div>
                  <div style={styles.statNumber}>{item.value}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Featured Animals</h2>
              <p style={styles.sectionSubtext}>
                A quick look at some animals currently in the system.
              </p>
            </div>

            <button
              style={styles.inlineBtn}
              onClick={() => navigate("/animals")}
            >
              View All
            </button>
          </div>

          {loading ? (
            <p style={styles.loadingText}>Loading animals...</p>
          ) : animals.length === 0 ? (
            <div style={styles.emptyCard}>
              <h3 style={styles.emptyTitle}>No animals found</h3>
              <p style={styles.emptyText}>
                Add animals to the system to see them here.
              </p>
            </div>
          ) : (
            <div style={styles.animalGrid}>
              {animals.map((animal) => (
                <div key={animal.id} style={styles.animalCard}>
                  <div style={styles.animalCardTop}>
                    <div style={styles.animalBadge}>🐾</div>
                    <div>
                      <h3 style={styles.animalName}>{animal.name}</h3>
                      <p style={styles.animalSpecies}>{animal.species}</p>
                    </div>
                  </div>

                  <div style={styles.infoList}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Age</span>
                      <span style={styles.infoValue}>{animal.age}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Gender</span>
                      <span style={styles.infoValue}>{animal.gender}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Food</span>
                      <span style={styles.infoValue}>{animal.foodType}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Health</span>
                      <span style={styles.healthPill}>
                        {animal.healthStatus}
                      </span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Enclosure</span>
                      <span style={styles.infoValue}>
                        {animal.enclosure?.name || "Not Assigned"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={styles.aboutSection}>
          <div style={styles.aboutCard}>
            <div style={styles.aboutLeft}>
              <h2 style={styles.sectionTitle}>About the System</h2>
              <p style={styles.aboutText}>
                This Zoo Management System helps organize daily zoo operations
                with separate modules for animals, enclosures, staff, feeding,
                medical records, users, and ticket bookings. It gives admins
                full control while letting normal users safely access useful
                features.
              </p>
            </div>

            <div style={styles.aboutRight}>
              <div style={styles.aboutMiniCard}>
                <strong style={styles.aboutMiniNumber}>Fast</strong>
                <span style={styles.aboutMiniText}>Centralized management</span>
              </div>
              <div style={styles.aboutMiniCard}>
                <strong style={styles.aboutMiniNumber}>Clear</strong>
                <span style={styles.aboutMiniText}>Role-based access</span>
              </div>
              <div style={styles.aboutMiniCard}>
                <strong style={styles.aboutMiniNumber}>Organized</strong>
                <span style={styles.aboutMiniText}>Clean module structure</span>
              </div>
            </div>
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
    gridTemplateColumns: "1.35fr 0.85fr",
    gap: "24px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,58,138,0.95))",
    color: "#ffffff",
    borderRadius: "28px",
    padding: "34px",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.18)",
    overflow: "hidden",
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
    fontSize: "2.7rem",
    lineHeight: 1.15,
    letterSpacing: "-0.5px",
  },
  heroText: {
    marginTop: "16px",
    marginBottom: "0",
    maxWidth: "720px",
    color: "rgba(255,255,255,0.84)",
    fontSize: "1.04rem",
    lineHeight: 1.85,
  },
  heroButtonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "26px",
  },
  primaryBtn: {
    background: "#ffffff",
    color: "#1d4ed8",
    border: "none",
    padding: "13px 20px",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "0.96rem",
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
    fontSize: "0.96rem",
    cursor: "pointer",
  },
  darkBtn: {
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    color: "#ffffff",
    border: "none",
    padding: "13px 20px",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "0.96rem",
    cursor: "pointer",
    boxShadow: "0 12px 24px rgba(37,99,235,0.28)",
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
    backdropFilter: "blur(6px)",
  },
  heroRightTitle: {
    margin: "0 0 16px 0",
    fontSize: "1.1rem",
    color: "#ffffff",
  },
  miniGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  miniCard: {
    background: "rgba(255,255,255,0.10)",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  miniLabel: {
    color: "rgba(255,255,255,0.74)",
    fontSize: "0.86rem",
  },
  miniValue: {
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
    letterSpacing: "-0.2px",
  },
  sectionSubtext: {
    margin: "6px 0 0 0",
    color: "#64748b",
    fontSize: "0.98rem",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
  inlineBtn: {
    background: "#0f172a",
    color: "#ffffff",
    border: "none",
    padding: "11px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
  },
  loadingText: {
    color: "#64748b",
    fontSize: "1rem",
    padding: "6px 2px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "18px",
  },
  statCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(148,163,184,0.12)",
  },
  statTop: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  statIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  },
  statTitle: {
    color: "#475569",
    fontWeight: "700",
    fontSize: "0.98rem",
  },
  statNumber: {
    marginTop: "16px",
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1d4ed8",
  },
  animalGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  animalCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(148,163,184,0.12)",
  },
  animalCardTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
  },
  animalBadge: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
  },
  animalName: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.2rem",
  },
  animalSpecies: {
    margin: "4px 0 0 0",
    color: "#64748b",
    fontSize: "0.94rem",
  },
  infoList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    alignItems: "center",
  },
  infoLabel: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: "0.94rem",
  },
  infoValue: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: "0.94rem",
    textAlign: "right",
  },
  healthPill: {
    background: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "999px",
    padding: "6px 10px",
    fontWeight: "700",
    fontSize: "0.86rem",
  },
  emptyCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
  },
  emptyTitle: {
    margin: 0,
    color: "#0f172a",
  },
  emptyText: {
    marginTop: "8px",
    color: "#64748b",
  },
  aboutSection: {
    marginTop: "32px",
  },
  aboutCard: {
    background: "linear-gradient(135deg, #ffffff, #eff6ff)",
    borderRadius: "26px",
    padding: "28px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "22px",
    alignItems: "stretch",
  },
  aboutLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  aboutText: {
    marginTop: "14px",
    marginBottom: 0,
    color: "#475569",
    lineHeight: 1.85,
    fontSize: "1rem",
  },
  aboutRight: {
    display: "grid",
    gap: "12px",
  },
  aboutMiniCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "18px",
    boxShadow: "0 8px 22px rgba(15, 23, 42, 0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  aboutMiniNumber: {
    color: "#0f172a",
    fontSize: "1rem",
  },
  aboutMiniText: {
    color: "#64748b",
    fontSize: "0.92rem",
  },
};

export default Home;