import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewLectures.css";
import api from "../../api/api";

function ViewLectures() {
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();

  const fetchLectures = () => {
    api
      .get("/api/lecture/all")
      .then((res) => setLectures(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <div className="lectures-page">
      <div className="lectures-card">
        <h2>All Lectures</h2>
        <p className="subtitle">
          Manage lectures, start sessions, and view attendance records.
        </p>

        <table className="lectures-table">
          <thead>
            <tr>
              <th>Lecture ID</th>
              <th>Title</th>
              <th>Room</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lectures.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No lectures found.
                </td>
              </tr>
            ) : (
              lectures.map((l) => (
                <tr key={l.id}>
                  <td>{l.lectureId}</td>
                  <td>{l.title}</td>
                  <td>{l.room}</td>

                  {/* ✅ FIXED STATUS DISPLAY */}
                  <td>
                    <span
                      className={`status ${
                        l.status === "STARTED"
                          ? "active"
                          : l.status === "ENDED"
                          ? "ended"
                          : "scheduled"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>

                  <td className="actions">
                    {/* ✅ Show Start button only if NOT_STARTED */}
                    {l.status === "NOT_STARTED" && (
                      <button
                        className="btn start"
                        onClick={() =>
                          navigate(`/start-lecture/${l.id}`)
                        }
                      >
                        Start
                      </button>
                    )}

                    {/* ✅ Show End button only if STARTED */}
                    {l.status === "STARTED" && (
                      <button
                        className="btn end"
                        onClick={async () => {
                          await api.post(`/api/lecture/end/${l.id}`);
                          fetchLectures(); // refresh list
                        }}
                      >
                        End
                      </button>
                    )}

                    <button
                      className="btn view"
                      onClick={() =>
                        navigate(`/view-attendance/${l.lectureId}`)
                      }
                    >
                      Attendance
                    </button>
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

export default ViewLectures;
