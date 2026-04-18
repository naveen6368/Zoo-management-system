import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Enclosures() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const [enclosures, setEnclosures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    capacity: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    fetchEnclosures();
  }, []);

  const fetchEnclosures = async () => {
    try {
      const res = await API.get("/enclosures");
      setEnclosures(res.data);
    } catch (error) {
      console.error("Error fetching enclosures:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      capacity: "",
      location: "",
      status: "",
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
      type: formData.type,
      capacity: Number(formData.capacity),
      location: formData.location,
      status: formData.status,
    };

    try {
      if (editingId) {
        await API.put(`/enclosures/${editingId}`, payload);
        alert("Enclosure updated successfully");
      } else {
        await API.post("/enclosures", payload);
        alert("Enclosure added successfully");
      }

      resetForm();
      fetchEnclosures();
    } catch (error) {
      console.error("Error saving enclosure:", error);
      const data = error.response?.data;
      if (data && typeof data === "object") {
        alert(Object.values(data)[0]);
      } else {
        alert("Failed to save enclosure");
      }
    }
  };

  const handleEdit = (enclosure) => {
    setEditingId(enclosure.id);
    setFormData({
      name: enclosure.name || "",
      type: enclosure.type || "",
      capacity: enclosure.capacity || "",
      location: enclosure.location || "",
      status: enclosure.status || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enclosure?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/enclosures/${id}`);
      alert("Enclosure deleted successfully");
      fetchEnclosures();
    } catch (error) {
      console.error("Error deleting enclosure:", error);
      alert("Failed to delete enclosure");
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.heroPill}>Habitat Control Center</div>
            <h1 style={styles.heroTitle}>Enclosures Management</h1>
            <p style={styles.heroText}>
              {isAdmin
                ? "Create, update, organize, and monitor all zoo enclosures in one clean management space."
                : "View enclosure details including type, capacity, location, and assigned animals."}
            </p>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroInfoCard}>
              <span style={styles.heroInfoLabel}>Total Enclosures</span>
              <strong style={styles.heroInfoValue}>{enclosures.length}</strong>
              <span style={styles.heroInfoSubtext}>
                Live enclosure records available
              </span>
            </div>
          </div>
        </section>

        {isAdmin && (
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  {editingId ? "Update Enclosure" : "Add New Enclosure"}
                </h2>
                <p style={styles.sectionSubtext}>
                  Fill in the enclosure details and manage habitat information.
                </p>
              </div>
            </div>

            <div style={styles.formCard}>
              <form onSubmit={handleSubmit} style={styles.formGrid}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enclosure Name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="text"
                  name="type"
                  placeholder="Type (Mammal, Bird, Reptile...)"
                  value={formData.type}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="number"
                  name="capacity"
                  placeholder="Capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  style={styles.input}
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Full">Full</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>

                <div style={styles.buttonRow}>
                  <button type="submit" style={styles.primaryBtn}>
                    {editingId ? "Update Enclosure" : "Add Enclosure"}
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
              <h2 style={styles.sectionTitle}>Enclosures List</h2>
              <p style={styles.sectionSubtext}>
                Browse all enclosure records currently stored in the system.
              </p>
            </div>
          </div>

          {loading ? (
            <p style={styles.loadingText}>Loading enclosures...</p>
          ) : enclosures.length === 0 ? (
            <div style={styles.emptyCard}>
              <h3 style={styles.emptyTitle}>No enclosures found</h3>
              <p style={styles.emptyText}>
                Start by adding a new enclosure record to the system.
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {enclosures.map((enclosure) => (
                <div key={enclosure.id} style={styles.enclosureCard}>
                  <div style={styles.cardTop}>
                    <div style={styles.iconBox}>🏠</div>
                    <div>
                      <h3 style={styles.enclosureName}>{enclosure.name}</h3>
                      <p style={styles.enclosureType}>{enclosure.type}</p>
                    </div>
                  </div>

                  <div style={styles.infoList}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Capacity</span>
                      <span style={styles.infoValue}>{enclosure.capacity}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Location</span>
                      <span style={styles.infoValue}>{enclosure.location}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Animals Assigned</span>
                      <span style={styles.infoValue}>
                        {enclosure.animals?.length || 0}
                      </span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Status</span>
                      <span
                        style={{
                          ...styles.statusPill,
                          ...(enclosure.status === "Available"
                            ? styles.availablePill
                            : enclosure.status === "Full"
                            ? styles.fullPill
                            : styles.maintenancePill),
                        }}
                      >
                        {enclosure.status}
                      </span>
                    </div>
                  </div>

                  {isAdmin && (
                    <div style={styles.actionRow}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(enclosure)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(enclosure.id)}
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
  enclosureCard: {
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
  enclosureName: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.18rem",
  },
  enclosureType: {
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
  statusPill: {
    borderRadius: "999px",
    padding: "6px 10px",
    fontWeight: "700",
    fontSize: "0.86rem",
  },
  availablePill: {
    background: "#dcfce7",
    color: "#15803d",
  },
  fullPill: {
    background: "#fee2e2",
    color: "#b91c1c",
  },
  maintenancePill: {
    background: "#fef3c7",
    color: "#b45309",
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

export default Enclosures;