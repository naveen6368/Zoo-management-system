import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Animals() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const [animals, setAnimals] = useState([]);
  const [enclosures, setEnclosures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    gender: "",
    foodType: "",
    healthStatus: "",
    arrivalDate: "",
    imageUrl: "",
    enclosureId: "",
  });

  useEffect(() => {
    fetchAnimals();
    fetchEnclosures();
  }, []);

  const fetchAnimals = async () => {
    try {
      const res = await API.get("/animals");
      setAnimals(res.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnclosures = async () => {
    try {
      const res = await API.get("/enclosures");
      setEnclosures(res.data);
    } catch (error) {
      console.error("Error fetching enclosures:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      species: "",
      age: "",
      gender: "",
      foodType: "",
      healthStatus: "",
      arrivalDate: "",
      imageUrl: "",
      enclosureId: "",
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
      species: formData.species,
      age: Number(formData.age),
      gender: formData.gender,
      foodType: formData.foodType,
      healthStatus: formData.healthStatus,
      arrivalDate: formData.arrivalDate,
      imageUrl: formData.imageUrl,
      enclosure: formData.enclosureId
        ? { id: Number(formData.enclosureId) }
        : null,
    };

    try {
      if (editingId) {
        await API.put(`/animals/${editingId}`, payload);
        alert("Animal updated successfully");
      } else {
        await API.post("/animals", payload);
        alert("Animal added successfully");
      }

      resetForm();
      fetchAnimals();
    } catch (error) {
      console.error("Error saving animal:", error);
      const data = error.response?.data;
      if (data && typeof data === "object") {
        alert(Object.values(data)[0]);
      } else {
        alert("Failed to save animal");
      }
    }
  };

  const handleEdit = (animal) => {
    setEditingId(animal.id);
    setFormData({
      name: animal.name || "",
      species: animal.species || "",
      age: animal.age || "",
      gender: animal.gender || "",
      foodType: animal.foodType || "",
      healthStatus: animal.healthStatus || "",
      arrivalDate: animal.arrivalDate || "",
      imageUrl: animal.imageUrl || "",
      enclosureId: animal.enclosure?.id || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this animal?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/animals/${id}`);
      alert("Animal deleted successfully");
      fetchAnimals();
    } catch (error) {
      console.error("Error deleting animal:", error);
      alert("Failed to delete animal");
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.heroPill}>Animal Records Hub</div>
            <h1 style={styles.heroTitle}>Animals Management</h1>
            <p style={styles.heroText}>
              {isAdmin
                ? "Create, update, organize, and monitor all animal records in one premium management space."
                : "View animal details including species, health, food type, enclosure, and images."}
            </p>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroInfoCard}>
              <span style={styles.heroInfoLabel}>Total Animals</span>
              <strong style={styles.heroInfoValue}>{animals.length}</strong>
              <span style={styles.heroInfoSubtext}>
                Live records currently available
              </span>
            </div>
          </div>
        </section>

        {isAdmin && (
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  {editingId ? "Update Animal" : "Add New Animal"}
                </h2>
                <p style={styles.sectionSubtext}>
                  Fill in the animal details, add image URL, and assign an enclosure.
                </p>
              </div>
            </div>

            <div style={styles.formCard}>
              <form onSubmit={handleSubmit} style={styles.formGrid}>
                <input
                  type="text"
                  name="name"
                  placeholder="Animal Name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="text"
                  name="species"
                  placeholder="Species"
                  value={formData.species}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  style={styles.input}
                />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <input
                  type="text"
                  name="foodType"
                  placeholder="Food Type"
                  value={formData.foodType}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="text"
                  name="healthStatus"
                  placeholder="Health Status"
                  value={formData.healthStatus}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Image URL"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  style={styles.input}
                />

                <select
                  name="enclosureId"
                  value={formData.enclosureId}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Enclosure</option>
                  {enclosures.map((enclosure) => (
                    <option key={enclosure.id} value={enclosure.id}>
                      {enclosure.name}
                    </option>
                  ))}
                </select>

                <div style={styles.buttonRow}>
                  <button type="submit" style={styles.primaryBtn}>
                    {editingId ? "Update Animal" : "Add Animal"}
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
              <h2 style={styles.sectionTitle}>Animals List</h2>
              <p style={styles.sectionSubtext}>
                Browse all animal records currently stored in the system.
              </p>
            </div>
          </div>

          {loading ? (
            <p style={styles.loadingText}>Loading animals...</p>
          ) : animals.length === 0 ? (
            <div style={styles.emptyCard}>
              <h3 style={styles.emptyTitle}>No animals found</h3>
              <p style={styles.emptyText}>
                Start by adding a new animal record to the system.
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {animals.map((animal) => (
                <div key={animal.id} style={styles.animalCard}>
                  {animal.imageUrl && (
                    <img
                      src={animal.imageUrl}
                      alt={animal.name}
                      style={styles.animalImage}
                    />
                  )}

                  <div style={styles.cardTop}>
                    <div style={styles.iconBox}>🐾</div>
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
                      <span style={styles.infoLabel}>Arrival</span>
                      <span style={styles.infoValue}>{animal.arrivalDate}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Enclosure</span>
                      <span style={styles.infoValue}>
                        {animal.enclosure?.name || "Not Assigned"}
                      </span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Health</span>
                      <span style={styles.healthPill}>
                        {animal.healthStatus}
                      </span>
                    </div>
                  </div>

                  {isAdmin && (
                    <div style={styles.actionRow}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(animal)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(animal.id)}
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
  animalCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(148,163,184,0.12)",
  },
  animalImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "14px",
    marginBottom: "14px",
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
  animalName: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.18rem",
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

export default Animals;