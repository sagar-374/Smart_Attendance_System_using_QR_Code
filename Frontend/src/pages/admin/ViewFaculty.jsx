import React, { useEffect, useState } from "react";

import api from "../../api/api"; // adjust path if needed


function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch faculty list
  const fetchFaculty = async () => {
    try {
      const res = await api.get("/faculty/list");
      setFaculty(res.data.map(f => ({ ...f })));
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // Delete faculty
  const deleteFaculty = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        await api.delete(`/faculty/deletefaculty/${id}`);
        alert("Faculty deleted successfully");
        fetchFaculty();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete faculty");
      }
    }
  };

  // Edit faculty modal
  const profileEdit = (f) => {
    setEditData(JSON.parse(JSON.stringify(f))); // deep copy
    setShowModal(true);
  };

  // Update faculty
  const updateFaculty = async (e) => {
    e.preventDefault();
    if (!editData) return;

    try {
      await api.put(
        `/faculty/updatefaculty/${editData.id}`,
        {
          name: editData.name,
          mobile: editData.mobile,
          email: editData.email,
        }
      );
      alert("Faculty updated successfully");
      setShowModal(false);
      setEditData(null);
      fetchFaculty();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update faculty");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* Centered Header */}
        <h2 style={headerStyle}>Faculty List</h2>

        {/* Table */}
        {faculty.length === 0 ? (
          <p style={emptyStyle}>No faculty records found</p>
        ) : (
          <div style={tableContainer}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Id</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Mobile</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f, i) => (
                  <tr key={f.id}>
                    <td style={tdStyle}>{i + 1}</td>
                    <td style={tdStyle}>{f.name}</td>
                    <td style={tdStyle}>{f.mobile}</td>
                    <td style={tdStyle}>{f.email}</td>
                    <td style={{ ...tdStyle, display: "flex", gap: "8px" }}>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => profileEdit(f)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteFaculty(f.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {showModal && (
          <div style={modalOverlay}>
            <div style={modalContent}>
              <h3>Edit Faculty</h3>
              <form
                onSubmit={updateFaculty}
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <input
                  type="text"
                  value={editData.name || ""}
                  onChange={(e) =>
                    setEditData(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Name"
                  style={inputStyle}
                  required
                />
                <input
                  type="text"
                  value={editData.mobile || ""}
                  onChange={(e) =>
                    setEditData(prev => ({ ...prev, mobile: e.target.value }))
                  }
                  placeholder="Mobile"
                  style={inputStyle}
                  required
                />
                <input
                  type="email"
                  value={editData.email || ""}
                  onChange={(e) =>
                    setEditData(prev => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Email"
                  style={inputStyle}
                  required
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" className="btn btn-success btn-sm">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */
const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "#e5e7eb",
  padding: "20px",
};

const cardStyle = {
  width: "90%",
  maxWidth: "800px",
  padding: "25px",
  borderRadius: "18px",
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headerStyle = {
  marginBottom: "20px",
  color: "#f8fafc",
  textAlign: "center",
};

const tableContainer = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  overflowX: "auto", // allows horizontal scroll if long names
};

const tableStyle = {
  width: "100%",
  maxWidth: "700px",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "12px",
  background: "#020617",
  color: "#93c5fd",
  textAlign: "left",
  borderBottom: "1px solid #1e293b",
  whiteSpace: "nowrap",       // prevents header wrap
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #1e293b",
  color: "#e5e7eb",
  whiteSpace: "nowrap",       // prevents content wrap
  overflow: "hidden",
  textOverflow: "ellipsis",   // show ... if content is too long
};

const emptyStyle = {
  textAlign: "center",
  marginTop: "15px",
  color: "#94a3b8",
};

const inputStyle = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #1e293b",
  background: "rgba(255,255,255,0.05)",
  color: "#e5e7eb",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContent = {
  background: "#0f172a",
  padding: "20px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
};

export default Faculty;
