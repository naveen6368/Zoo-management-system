import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function MedicalRecords() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const [records, setRecords] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    disease: "",
    treatment: "",
    doctorName: "",
    checkupDate: "",
    healthStatus: "",
    animalId: "",
  });

  useEffect(() => {
    fetchRecords();
    fetchAnimals();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await API.get("/medical-records");
      setRecords(res.data);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnimals = async () => {
    try {
      const res = await API.get("/animals");
      setAnimals(res.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      disease: "",
      treatment: "",
      doctorName: "",
      checkupDate: "",
      healthStatus: "",
      animalId: "",
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
      disease: formData.disease,
      treatment: formData.treatment,
      doctorName: formData.doctorName,
      checkupDate: formData.checkupDate,
      healthStatus: formData.healthStatus,
      animal: formData.animalId ? { id: Number(formData.animalId) } : null,
    };

    try {
      if (editingId) {
        await API.put(`/medical-records/${editingId}`, payload);
        alert("Medical record updated successfully");
      } else {
        await API.post("/medical-records", payload);
        alert("Medical record added successfully");
      }

      resetForm();
      fetchRecords();
    } catch (error) {
      console.error("Error saving medical record:", error);
      const data = error.response?.data;
      if (data && typeof data === "object") {
        alert(Object.values(data)[0]);
      } else {
        alert("Failed to save medical record");
      }
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormData({
      disease: record.disease || "",
      treatment: record.treatment || "",
      doctorName: record.doctorName || "",
      checkupDate: record.checkupDate || "",
      healthStatus: record.healthStatus || "",
      animalId: record.animal?.id || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medical record?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/medical-records/${id}`);
      alert("Medical record deleted successfully");
      fetchRecords();
    } catch (error) {
      console.error("Error deleting medical record:", error);
      alert("Failed to delete medical record");
    }
  };

  const getHealthStyle = (status) => {
    switch (status) {
      case "Healthy":
        return { background: "#dcfce7", color: "#15803d" };
      case "Under Treatment":
        return { background: "#fef3c7", color: "#b45309" };
      case "Recovered":
        return { background: "#dbeafe", color: "#1d4ed8" };
      case "Critical":
        return { background: "#fee2e2", color: "#b91c1c" };
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
            <div style={styles.heroPill}>Animal Health Center</div>
            <h1 style={styles.heroTitle}>Medical Records</h1>
            <p style={styles.heroText}>
              {isAdmin
                ? "Track diagnoses, treatments, doctor details, and animal health updates in one organized medical records system."
                : "View medical records for animals including disease, treatment, doctor details, and health status."}
            </p>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroInfoCard}>
              <span style={styles.heroInfoLabel}>Total Records</span>
              <strong style={styles.heroInfoValue}>{records.length}</strong>
              <span style={styles.heroInfoSubtext}>
                Live health records available
              </span>
            </div>
          </div>
        </section>

        {isAdmin && (
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  {editingId ? "Update Medical Record" : "Add New Medical Record"}
                </h2>
                <p style={styles.sectionSubtext}>
                  Enter animal health details, treatment notes, and doctor information.
                </p>
              </div>
            </div>

            <div style={styles.formCard}>
              <form onSubmit={handleSubmit} style={styles.formGrid}>
                <input
                  type="text"
                  name="disease"
                  placeholder="Disease / Diagnosis"
                  value={formData.disease}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="text"
                  name="treatment"
                  placeholder="Treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="text"
                  name="doctorName"
                  placeholder="Doctor Name"
                  value={formData.doctorName}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="date"
                  name="checkupDate"
                  value={formData.checkupDate}
                  onChange={handleChange}
                  style={styles.input}
                />

                <select
                  name="healthStatus"
                  value={formData.healthStatus}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Health Status</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Under Treatment">Under Treatment</option>
                  <option value="Recovered">Recovered</option>
                  <option value="Critical">Critical</option>
                </select>

                <select
                  name="animalId"
                  value={formData.animalId}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Animal</option>
                  {animals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name} - {animal.species}
                    </option>
                  ))}
                </select>

                <div style={styles.buttonRow}>
                  <button type="submit" style={styles.primaryBtn}>
                    {editingId ? "Update Record" : "Add Record"}
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
              <h2 style={styles.sectionTitle}>Medical Records List</h2>
              <p style={styles.sectionSubtext}>
                Browse all animal medical records currently stored in the system.
              </p>
            </div>
          </div>

          {loading ? (
            <p style={styles.loadingText}>Loading medical records...</p>
          ) : records.length === 0 ? (
            <div style={styles.emptyCard}>
              <h3 style={styles.emptyTitle}>No medical records found</h3>
              <p style={styles.emptyText}>
                Start by adding a medical record to the system.
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {records.map((record) => (
                <div key={record.id} style={styles.recordCard}>
                  <div style={styles.cardTop}>
                    <div style={styles.iconBox}>🩺</div>
                    <div>
                      <h3 style={styles.recordName}>
                        {record.animal?.name || "Animal Not Assigned"}
                      </h3>
                      <p style={styles.recordSpecies}>
                        {record.animal?.species || "No species info"}
                      </p>
                    </div>
                  </div>

                  <div style={styles.infoList}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Disease</span>
                      <span style={styles.infoValue}>{record.disease}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Treatment</span>
                      <span style={styles.infoValue}>{record.treatment}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Doctor</span>
                      <span style={styles.infoValue}>{record.doctorName}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Checkup Date</span>
                      <span style={styles.infoValue}>{record.checkupDate}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Health Status</span>
                      <span
                        style={{
                          ...styles.statusPill,
                          ...getHealthStyle(record.healthStatus),
                        }}
                      >
                        {record.healthStatus}
                      </span>
                    </div>
                  </div>

                  {isAdmin && (
                    <div style={styles.actionRow}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(record)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(record.id)}
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
  recordCard: {
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
  recordName: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.18rem",
  },
  recordSpecies: {
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

export default MedicalRecords;