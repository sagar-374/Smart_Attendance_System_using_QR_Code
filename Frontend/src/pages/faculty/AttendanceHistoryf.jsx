import React, { useEffect, useState } from "react";

import jsPDF from "jspdf";
import api from "../../api/api"; // adjust path if needed


function AttendanceHistoryf() {
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  // ================= LOAD LECTURES =================
  useEffect(() => {
    api
      .get("/api/lecture/all")
      .then((res) => setLectures(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ================= LOAD ATTENDANCE =================
  useEffect(() => {
    if (selectedLecture) {
      api
        .get(`/api/attendance/lecture/${selectedLecture}`)
        .then((res) => setAttendance(res.data))
        .catch((err) => console.error(err));
    }
  }, [selectedLecture]);

  // ================= FILTER BY MONTH =================
  const monthlyAttendance = selectedMonth
    ? attendance.filter((a) => a.markedAt.startsWith(selectedMonth))
    : attendance;

  const total = monthlyAttendance.length;

  // ================= PDF =================
  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 15;

    doc.setFontSize(16);
    doc.text("Lecture Attendance Report", 14, y);
    y += 10;

    doc.setFontSize(11);
    doc.text(`Lecture: ${selectedLecture}`, 14, y);
    y += 7;
    doc.text(`Month: ${selectedMonth || "All"}`, 14, y);
    y += 7;
    doc.text(`Total Records: ${total}`, 14, y);
    y += 10;

    doc.text("Roll No   Name            Date        Status", 14, y);
    y += 6;

    monthlyAttendance.forEach((a) => {
      doc.text(
        `${a.rollNo || "-"}   ${a.studentName || "-"}   ${new Date(
          a.markedAt
        ).toLocaleDateString()}   PRESENT`,
        14,
        y
      );
      y += 6;
    });

    doc.save("attendance.pdf");
  };

  return (
    <div style={pageStyle}>
      <h2>👨‍🏫 Lecture-wise Attendance</h2>

      {/* SELECT LECTURE */}
      <select
        style={selectStyle}
        value={selectedLecture}
        onChange={(e) => setSelectedLecture(e.target.value)}
      >
        <option value="">Select Lecture</option>
        {lectures.map((l) => (
          <option key={l.id} value={l.lectureId}>
            {l.title}
          </option>
        ))}
      </select>

      {/* SELECT MONTH */}
      {selectedLecture && (
        <input
          type="month"
          style={selectStyle}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      )}

      {/* SUMMARY */}
      {selectedLecture && (
        <div style={summaryCard}>
          <p>
            Total Attendance Records: <b>{total}</b>
          </p>
        </div>
      )}

      {/* PDF */}
      {monthlyAttendance.length > 0 && (
        <button style={pdfBtn} onClick={downloadPDF}>
          📄 Download PDF
        </button>
      )}

      {/* TABLE */}
      {monthlyAttendance.length > 0 && (
        <div style={tableWrapper}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Roll No</th>
            
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {monthlyAttendance.map((a) => (
                <tr key={a.id}>
                  <td style={tdStyle}>{a.rollNo}</td>
                  
                  <td style={tdStyle}>
                    {new Date(a.markedAt).toLocaleDateString()}
                  </td>
                  <td style={{ ...tdStyle, color: "#22c55e" }}>
                    PRESENT
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "100vh",
  padding: "40px",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "#fff",
};

const selectStyle = {
  padding: "10px",
  marginTop: "15px",
  borderRadius: "8px",
  width: "260px",
};

const summaryCard = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.08)",
  width: "300px",
};

const tableWrapper = {
  marginTop: "30px",
  borderRadius: "16px",
  overflow: "hidden",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "14px",
  background: "rgba(255,255,255,0.1)",
};

const tdStyle = {
  padding: "14px",
  textAlign: "center",
};

const pdfBtn = {
  marginTop: "15px",
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#22c55e",
  fontWeight: "600",
  cursor: "pointer",
};

export default AttendanceHistoryf;
