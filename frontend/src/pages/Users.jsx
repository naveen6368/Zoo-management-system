import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (String(id) === String(currentUserId)) {
      alert("You cannot delete your own logged-in account.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case "ADMIN":
        return { background: "#dbeafe", color: "#1d4ed8" };
      case "USER":
        return { background: "#dcfce7", color: "#15803d" };
      default:
        return { background: "#e2e8f0", color: "#334155" };
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.heroPill}>Access & Account Management</div>
            <h1 style={styles.heroTitle}>Users Management</h1>
            <p style={styles.heroText}>
              View all registered accounts, monitor user roles, and manage
              system access from one clean admin page.
            </p>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroInfoCard}>
              <span style={styles.heroInfoLabel}>Total Users</span>
              <strong style={styles.heroInfoValue}>{users.length}</strong>
              <span style={styles.heroInfoSubtext}>
                Live user accounts available
              </span>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Registered Users</h2>
              <p style={styles.sectionSubtext}>
                Browse all user accounts currently stored in the system.
              </p>
            </div>
          </div>

          {loading ? (
            <p style={styles.loadingText}>Loading users...</p>
          ) : users.length === 0 ? (
            <div style={styles.emptyCard}>
              <h3 style={styles.emptyTitle}>No users found</h3>
              <p style={styles.emptyText}>
                Registered users will appear here once accounts are created.
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {users.map((user) => {
                const isCurrentUser =
                  String(user.id) === String(currentUserId);

                return (
                  <div key={user.id} style={styles.userCard}>
                    <div style={styles.cardTop}>
                      <div style={styles.iconBox}>👤</div>
                      <div>
                        <h3 style={styles.userName}>{user.username}</h3>
                        <p style={styles.userEmail}>{user.email}</p>
                      </div>
                    </div>

                    <div style={styles.infoList}>
                      <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>User ID</span>
                        <span style={styles.infoValue}>{user.id}</span>
                      </div>

                      <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>Role</span>
                        <span
                          style={{
                            ...styles.rolePill,
                            ...getRoleStyle(user.role),
                          }}
                        >
                          {user.role}
                        </span>
                      </div>

                      <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>Status</span>
                        <span style={styles.infoValue}>
                          {isCurrentUser ? "Current Login" : "Active Account"}
                        </span>
                      </div>
                    </div>

                    <div style={styles.actionRow}>
                      <button
                        style={
                          isCurrentUser ? styles.disabledBtn : styles.deleteBtn
                        }
                        onClick={() => handleDelete(user.id)}
                        disabled={isCurrentUser}
                      >
                        {isCurrentUser ? "Current User" : "Delete"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
    fontSize: "2.5rem",
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
  heroRight: {
    display: "flex",
    alignItems: "stretch",
  },
  heroInfoCard: {
    width: "100%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
  },
  heroInfoLabel: {
    color: "rgba(255,255,255,0.74)",
    fontSize: "0.9rem",
  },
  heroInfoValue: {
    color: "#ffffff",
    fontSize: "2.2rem",
  },
  heroInfoSubtext: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.9rem",
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
  loadingText: {
    color: "#64748b",
    fontSize: "1rem",
    padding: "6px 2px",
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  userCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(148,163,184,0.12)",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
  },
  iconBox: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
  },
  userName: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.18rem",
  },
  userEmail: {
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
  rolePill: {
    borderRadius: "999px",
    padding: "6px 10px",
    fontWeight: "700",
    fontSize: "0.86rem",
  },
  actionRow: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
  },
  deleteBtn: {
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
  },
  disabledBtn: {
    background: "#94a3b8",
    color: "#ffffff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "not-allowed",
    fontWeight: "700",
  },
};

export default Users;