import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Staff() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    shift: "",
    assignedArea: "",
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await API.get("/staff");
      setStaffList(res.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      phone: "",
      shift: "",
      assignedArea: "",
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      role: formData.role,
      phone: formData.phone,
      shift: formData.shift,
      assignedArea: formData.assignedArea,
    };

    try {
      if (editingId) {
        await API.put(`/staff/${editingId}`, payload);
        alert("Staff updated successfully");
      } else {
        await API.post("/staff", payload);
        alert("Staff added successfully");
      }

      resetForm();
      fetchStaff();
    } catch (error) {
      console.error("Error saving staff:", error);
      const data = error.response?.data;
      if (data && typeof data === "object") {
        alert(Object.values(data)[0]);
      } else {
        alert("Failed to save staff");
      }
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff.id);
    setFormData({
      name: staff.name || "",
      role: staff.role || "",
      phone: staff.phone || "",
      shift: staff.shift || "",
      assignedArea: staff.assignedArea || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff record?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/staff/${id}`);
      alert("Staff deleted successfully");
      fetchStaff();
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff");
    }
  };

  const getRoleStyle = (staffRole) => {
    switch (staffRole) {
      case "Doctor":
        return { background: "#dbeafe", color: "#1d4ed8" };
      case "Keeper":
        return { background: "#dcfce7", color: "#15803d" };
      case "Manager":
        return { background: "#ede9fe", color: "#6d28d9" };
      case "Security":
        return { background: "#fee2e2", color: "#b91c1c" };
      case "Cleaner":
        return { background: "#fef3c7", color: "#b45309" };
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
            <div style={styles.heroPill}>Workforce Management</div>
            <h1 style={styles.heroTitle}>Staff Management</h1>
            <p style={styles.heroText}>
              {isAdmin
                ? "Add, organize, update, and manage zoo staff records including roles, shifts, and assigned areas."
                : "View all zoo staff information including role, shift, and assigned area."}
            </p>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroInfoCard}>
              <span style={styles.heroInfoLabel}>Total Staff</span>
              <strong style={styles.heroInfoValue}>{staffList.length}</strong>
              <span style={styles.heroInfoSubtext}>
                Live employee records available
              </span>
            </div>
          </div>
        </section>

        {isAdmin && (
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  {editingId ? "Update Staff Member" : "Add New Staff Member"}
                </h2>
                <p style={styles.sectionSubtext}>
                  Fill in employee details, role, shift, and assigned zone.
                </p>
              </div>
            </div>

            <div style={styles.formCard}>
              <form onSubmit={handleSubmit} style={styles.formGrid}>
                <input
                  type="text"
                  name="name"
                  placeholder="Staff Name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Role</option>
                  <option value="Keeper">Keeper</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Security">Security</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Guide">Guide</option>
                  <option value="Manager">Manager</option>
                </select>

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                />

                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>

                <input
                  type="text"
                  name="assignedArea"
                  placeholder="Assigned Area"
                  value={formData.assignedArea}
                  onChange={handleChange}
                  style={styles.input}
                />

                <div style={styles.buttonRow}>
                  <button type="submit" style={styles.primaryBtn}>
                    {editingId ? "Update Staff" : "Add Staff"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      style={styles.secondaryBtn}
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>
        )}

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Staff List</h2>
              <p style={styles.sectionSubtext}>
                Browse all staff members currently stored in the system.
              </p>
            </div>
          </div>

          {loading ? (
            <p style={styles.loadingText}>Loading staff...</p>
          ) : staffList.length === 0 ? (
            <div style={styles.emptyCard}>
              <h3 style={styles.emptyTitle}>No staff found</h3>
              <p style={styles.emptyText}>
                Start by adding a new staff record to the system.
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {staffList.map((staff) => (
                <div key={staff.id} style={styles.staffCard}>
                  <div style={styles.cardTop}>
                    <div style={styles.iconBox}>👨‍💼</div>
                    <div>
                      <h3 style={styles.staffName}>{staff.name}</h3>
                      <p style={styles.staffRoleText}>{staff.assignedArea}</p>
                    </div>
                  </div>

                  <div style={styles.infoList}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Role</span>
                      <span
                        style={{
                          ...styles.rolePill,
                          ...getRoleStyle(staff.role),
                        }}
                      >
                        {staff.role}
                      </span>
                    </div>

                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Phone</span>
                      <span style={styles.infoValue}>{staff.phone}</span>
                    </div>

                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Shift</span>
                      <span style={styles.infoValue}>{staff.shift}</span>
                    </div>

                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Assigned Area</span>
                      <span style={styles.infoValue}>
                        {staff.assignedArea}
                      </span>
                    </div>
                  </div>

                  {isAdmin && (
                    <div style={styles.actionRow}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(staff)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(staff.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
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
  formCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(148,163,184,0.12)",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #dbe2ea",
    fontSize: "0.98rem",
    outline: "none",
    background: "#f8fbff",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    color: "#ffffff",
    border: "none",
    padding: "13px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: "0 12px 24px rgba(37,99,235,0.22)",
  },
  secondaryBtn: {
    background: "#0f172a",
    color: "#ffffff",
    border: "none",
    padding: "13px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
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
  staffCard: {
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
  staffName: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.18rem",
  },
  staffRoleText: {
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
  editBtn: {
    background: "#f59e0b",
    color: "#ffffff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
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
};

export default Staff;