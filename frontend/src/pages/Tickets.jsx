import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Tickets() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    visitorName: "",
    email: "",
    phone: "",
    visitDate: "",
    adults: 1,
    children: 0,
    status: "PENDING",
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await API.get("/tickets");
      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      visitorName: "",
      email: "",
      phone: "",
      visitDate: "",
      adults: 1,
      children: 0,
      status: "PENDING",
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "adults" || e.target.name === "children"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const calculateTotal = () => {
    const adultPrice = 200;
    const childPrice = 100;
    return formData.adults * adultPrice + formData.children * childPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      visitorName: formData.visitorName,
      email: formData.email,
      phone: formData.phone,
      visitDate: formData.visitDate,
      adults: Number(formData.adults),
      children: Number(formData.children),
      status: formData.status,
    };

    try {
      if (editingId && isAdmin) {
        await API.put(`/tickets/${editingId}`, payload);
        alert("Ticket updated successfully");
      } else {
        await API.post("/tickets", payload);
        alert("Ticket booked successfully");
      }

      resetForm();
      fetchTickets();
    } catch (error) {
      console.error("Error saving ticket:", error);
      const data = error.response?.data;
      if (data && typeof data === "object") {
        alert(Object.values(data)[0]);
      } else {
        alert("Failed to save ticket");
      }
    }
  };

  const handleEdit = (ticket) => {
    setEditingId(ticket.id);
    setFormData({
      visitorName: ticket.visitorName || "",
      email: ticket.email || "",
      phone: ticket.phone || "",
      visitDate: ticket.visitDate || "",
      adults: ticket.adults || 1,
      children: ticket.children || 0,
      status: ticket.status || "PENDING",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirm = async (id) => {
    try {
      await API.put(`/tickets/confirm/${id}`);
      alert("Ticket confirmed successfully");
      fetchTickets();
    } catch (error) {
      console.error("Error confirming ticket:", error);
      alert("Failed to confirm ticket");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/tickets/${id}`);
      alert("Ticket deleted successfully");
      fetchTickets();
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return { background: "#dcfce7", color: "#15803d" };
      case "PENDING":
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
            <div style={styles.heroPill}>Zoo Visit Booking</div>
            <h1 style={styles.heroTitle}>Ticket Management</h1>
            <p style={styles.heroText}>
              {isAdmin
                ? "View, confirm, update, and manage all zoo ticket bookings from one place."
                : "Book your zoo visit ticket by entering visitor details, visit date, and number of people."}
            </p>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroInfoCard}>
              <span style={styles.heroInfoLabel}>Total Tickets</span>
              <strong style={styles.heroInfoValue}>{tickets.length}</strong>
              <span style={styles.heroInfoSubtext}>
                Live ticket bookings available
              </span>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>
                {editingId && isAdmin ? "Update Ticket" : "Book New Ticket"}
              </h2>
              <p style={styles.sectionSubtext}>
                Enter visitor information and choose the visit details.
              </p>
            </div>
          </div>

          <div style={styles.formCard}>
            <form onSubmit={handleSubmit} style={styles.formGrid}>
              <input
                type="text"
                name="visitorName"
                placeholder="Visitor Name"
                value={formData.visitorName}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="number"
                name="adults"
                placeholder="Adults"
                min="1"
                value={formData.adults}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="number"
                name="children"
                placeholder="Children"
                min="0"
                value={formData.children}
                onChange={handleChange}
                style={styles.input}
              />

              {isAdmin && editingId && (
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                </select>
              )}

              <div style={styles.totalCard}>
                <span style={styles.totalLabel}>Total Amount</span>
                <strong style={styles.totalValue}>₹ {calculateTotal()}</strong>
              </div>

              <div style={styles.buttonRow}>
                <button type="submit" style={styles.primaryBtn}>
                  {editingId && isAdmin ? "Update Ticket" : "Book Ticket"}
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

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Tickets List</h2>
              <p style={styles.sectionSubtext}>
                Browse all booked tickets currently stored in the system.
              </p>
            </div>
          </div>

          {loading ? (
            <p style={styles.loadingText}>Loading tickets...</p>
          ) : tickets.length === 0 ? (
            <div style={styles.emptyCard}>
              <h3 style={styles.emptyTitle}>No tickets found</h3>
              <p style={styles.emptyText}>
                Ticket bookings will appear here once created.
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {tickets.map((ticket) => (
                <div key={ticket.id} style={styles.ticketCard}>
                  <div style={styles.cardTop}>
                    <div style={styles.iconBox}>🎟️</div>
                    <div>
                      <h3 style={styles.ticketName}>{ticket.visitorName}</h3>
                      <p style={styles.ticketEmail}>{ticket.email}</p>
                    </div>
                  </div>

                  <div style={styles.infoList}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Phone</span>
                      <span style={styles.infoValue}>{ticket.phone}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Visit Date</span>
                      <span style={styles.infoValue}>{ticket.visitDate}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Adults</span>
                      <span style={styles.infoValue}>{ticket.adults}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Children</span>
                      <span style={styles.infoValue}>{ticket.children}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Total</span>
                      <span style={styles.amountPill}>₹ {ticket.totalAmount}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Status</span>
                      <span
                        style={{
                          ...styles.statusPill,
                          ...getStatusStyle(ticket.status),
                        }}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </div>

                  {isAdmin && (
                    <div style={styles.actionRow}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(ticket)}
                      >
                        Edit
                      </button>

                      {ticket.status !== "CONFIRMED" && (
                        <button
                          style={styles.confirmBtn}
                          onClick={() => handleConfirm(ticket.id)}
                        >
                          Confirm
                        </button>
                      )}

                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(ticket.id)}
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
  totalCard: {
    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "6px",
  },
  totalLabel: {
    color: "#475569",
    fontSize: "0.92rem",
    fontWeight: "700",
  },
  totalValue: {
    color: "#1d4ed8",
    fontSize: "1.3rem",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },
  ticketCard: {
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
  ticketName: {
    margin: 0,
    color: "#0f172a",
    fontSize: "1.18rem",
  },
  ticketEmail: {
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
  amountPill: {
    background: "#dbeafe",
    color: "#1d4ed8",
    borderRadius: "999px",
    padding: "6px 10px",
    fontWeight: "700",
    fontSize: "0.86rem",
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
    flexWrap: "wrap",
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
  confirmBtn: {
    background: "#16a34a",
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

export default Tickets;