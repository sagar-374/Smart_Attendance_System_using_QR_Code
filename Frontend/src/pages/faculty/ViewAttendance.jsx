import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import "./ViewAttendance.css";

function ViewAttendance() {
  const { lectureId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);

        const url = lectureId
          ? `/api/attendance/lecture/${lectureId}`
          : `/api/attendance/all`;

        const res = await api.get(url);

        // ✅ Ensure always array
        if (Array.isArray(res.data)) {
          setAttendance(res.data);
        } else {
          setAttendance([]);
        }
      } catch (error) {
        console.error("Failed to fetch attendance", error);
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [lectureId]);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="attendance-page">
      <div className="attendance-card">
        <h2>
          {lectureId
            ? `Attendance List for ${lectureId}`
            : "All Attendance"}
        </h2>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Lecture Title</th>
              <th>Marked At</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No attendance found.
                </td>
              </tr>
            ) : (
              attendance.map((a) => (
                <tr key={a.id || Math.random()}>
                  <td>{a.rollNo || "-"}</td>
                  <td>{a.name || "-"}</td>
                  <td>{a.lectureTitle || "-"}</td>
                  <td>
                    {a.markedAt
                      ? new Date(a.markedAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAttendance;
