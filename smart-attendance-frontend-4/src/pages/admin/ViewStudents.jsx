import React, { useEffect, useState } from "react";

import api from "../../api/api";


function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await api.get("/student/list");
      setStudents(res.data.map(s => ({ ...s })));
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student
  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.delete(`/student/delete/${id}`);
        alert("Student deleted successfully");
        fetchStudents();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete student");
      }
    }
  };

  // Open edit modal
  const profileEdit = (student) => {
    setEditData(JSON.parse(JSON.stringify(student))); // deep copy
    setShowModal(true);
  };

  // Update student
  const updateStudent = async (e) => {
    e.preventDefault();
    if (!editData) return;

    try {
      await api.put(
        `/student/update/${editData.id}`,
        {
          name: editData.name,
          mobile: editData.mobile,
          email: editData.email,
          department: editData.department
        }
      );
      alert("Student updated successfully");
      setShowModal(false);
      setEditData(null);
      fetchStudents();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update student");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Student List</h2>

        {students.length === 0 ? (
          <p style={emptyStyle}>No students found</p>
        ) : (
          <div style={tableContainer}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Id</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Mobile</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id}>
                    <td style={tdStyle}>{i + 1}</td>
                    <td style={tdStyle}>{s.name}</td>
                    <td style={tdStyle}>{s.mobile}</td>
                    <td style={tdStyle}>{s.email}</td>
                    <td style={tdStyle}>{s.department}</td>
                    <td style={{ ...tdStyle, display: "flex", gap: "8px" }}>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => profileEdit(s)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteStudent(s.id)}
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

        {/* Modal for Editing */}
        {showModal && (
          <div style={modalOverlay}>
            <div style={modalContent}>
              <h3>Edit Student</h3>
              <form onSubmit={updateStudent} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                  type="text"
                  value={editData.name || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Name"
                  style={inputStyle}
                  required
                />
                <input
                  type="text"
                  value={editData.mobile || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, mobile: e.target.value }))}
                  placeholder="Mobile"
                  style={inputStyle}
                  required
                />
                <input
                  type="email"
                  value={editData.email || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Email"
                  style={inputStyle}
                  required
                />
                <input
                  type="text"
                  value={editData.department || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Department"
                  style={inputStyle}
                  required
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" className="btn btn-success btn-sm">Update</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
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
  width: "95%",
  maxWidth: "900px",
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
};

const tableStyle = {
  width: "100%",
  maxWidth: "850px",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "12px",
  background: "#020617",
  color: "#93c5fd",
  textAlign: "left",
  borderBottom: "1px solid #1e293b",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #1e293b",
  color: "#e5e7eb",
};

const emptyStyle = {
  textAlign: "center",
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

export default ViewStudents;
