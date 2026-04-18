import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function FeedingSchedules() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const [schedules, setSchedules] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    foodName: "",
    feedingDate: "",
    feedingTime: "",
    keeperName: "",
    animalId: "",
  });

  useEffect(() => {
    fetchSchedules();
    fetchAnimals();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await API.get("/feeding-schedules");
      setSchedules(res.data);
    } catch (error) {
      console.error("Error fetching feeding schedules:", error);
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
      foodName: "",
      feedingDate: "",
      feedingTime: "",
      keeperName: "",
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
      foodName: formData.foodName,
      feedingDate: formData.feedingDate,
      feedingTime: formData.feedingTime,
      keeperName: formData.keeperName,
      animal: formData.animalId ? { id: Number(formData.animalId) } : null,
    };

    try {
      if (editingId) {
        await API.put(`/feeding-schedules/${editingId}`, payload);
        alert("Feeding schedule updated successfully");
      } else {
        await API.post("/feeding-schedules", payload);
        alert("Feeding schedule added successfully");
      }

      resetForm();
      fetchSchedules();
    } catch (error) {
      console.error("Error saving feeding schedule:", error);
      const data = error.response?.data;
      if (data && typeof data === "object") {
        alert(Object.values(data)[0]);
      } else {
        alert("Failed to save feeding schedule");
      }
    }
  };

  const handleEdit = (schedule) => {
    setEditingId(schedule.id);
    setFormData({
      foodName: schedule.foodName || "",
      feedingDate: schedule.feedingDate || "",
      feedingTime: schedule.feedingTime || "",
      keeperName: schedule.keeperName || "",
      animalId: schedule.animal?.id || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feeding schedule?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/feeding-schedules/${id}`);
      alert("Feeding schedule deleted successfully");
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting feeding schedule:", error);
      alert("Failed to delete feeding schedule");
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.heroPill}>Daily Feeding Operations</div>
            <h1 style={styles.heroTitle}>Feeding Schedules</h1>
            <p style={styles.heroText}>
              {isAdmin
                ? "Plan, update, and manage feeding schedules for all animals with proper food details, time, and keeper assignments."
                : "View feeding schedules for animals including date, time, assigned keeper, and food details."}
            </p>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroInfoCard}>
              <span style={styles.heroInfoLabel}>Total Schedules</span>
              <strong style={styles.heroInfoValue}>{schedules.length}</strong>
              <span style={styles.heroInfoSubtext}>
                Live feeding records available
              </span>
            </div>
          </div>
        </section>

        {isAdmin && (
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  {editingId ? "Update Feeding Schedule" : "Add New Feeding Schedule"}
                </h2>
                <p style={styles.sectionSubtext}>
                  Choose the animal, feeding date and time, and assign the keeper.
                </p>
              </div>
            </div>

            <div style={styles.formCard}>
              <form onSubmit={handleSubmit} style={styles.formGrid}>
                <input
                  type="text"
                  name="foodName"
                  placeholder="Food Name"
                  value={formData.foodName}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="date"
                  name="feedingDate"
                  value={formData.feedingDate}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="time"
                  name="feedingTime"
                  value={formData.feedingTime}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="text"
                  name="keeperName"
                  placeholder="Keeper Name"
                  value={formData.keeperName}
                  onChange={handleChange}
                  style={styles.input}
                />

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
                    {editingId ? "Update Schedule" : "Add Schedule"}
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
              <h2 style={styles.sectionTitle}>Feeding Schedule List</h2>
              <p style={styles.sectionSubtext}>
                Browse all feeding schedules currently stored in the system.
              </p>
            </div>
          </div>

          {loading ? (
            <p style={styles.loadingText}>Loading feeding schedules...</p>
          ) : schedules.length === 0 ? (
            <div style={styles.emptyCard}>
              <h3 style={styles.emptyTitle}>No feeding schedules found</h3>
              <p style={styles.emptyText}>
                Start by adding a feeding schedule to the system.
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {schedules.map((schedule) => (
                <div key={schedule.id} style={styles.scheduleCard}>
                  <div style={styles.cardTop}>
                    <div style={styles.iconBox}>🍽️</div>
                    <div>
                      <h3 style={styles.scheduleName}>
                        {schedule.animal?.name || "Animal Not Assigned"}
                      </h3>
                      <p style={styles.scheduleSpecies}>
                        {schedule.animal?.species || "No species info"}
                      </p>
                    </div>
                  </div>

                  <div style={styles.infoList}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Food</span>
                      <span style={styles.infoValue}>{schedule.foodName}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Date</span>
                      <span style={styles.infoValue}>{schedule.feedingDate}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Time</span>
                      <span style={styles.timePill}>{schedule.feedingTime}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Keeper</span>
                      <span style={styles.infoValue}>{schedule.keeperName}</span>
                    </div>
                  </div>

                  {isAdmin && (
                    <div style={styles.actionRow}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(schedule)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(schedule.id)}
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
  scheduleCard: {
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
  scheduleName: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.18rem",
  },
  scheduleSpecies: {
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
  timePill: {
    background: "#dbeafe",
    color: "#1d4ed8",
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

export default FeedingSchedules;