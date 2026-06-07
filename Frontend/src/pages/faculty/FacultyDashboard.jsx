import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";

function FacultyDashboard() {
  const navigate = useNavigate(); // ✅ INSIDE component

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      () => {
        setError("Location access denied or unavailable.");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="dashboard-bg">

      {/* Location Card */}
      <div className="location-card">
        <h3>Faculty Location</h3>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : latitude && longitude ? (
          <p>
            Latitude: {latitude.toFixed(6)} | Longitude: {longitude.toFixed(6)}
          </p>
        ) : (
          <p>Detecting location...</p>
        )}
      </div>

      {/* Row 1 */}
      <div className="card-row">
        <div className="glass-card">
          <h3>Add Student</h3>
          <p>Add a new student to the system.</p>
          <button onClick={() => navigate("/add-student")}>Add</button>
        </div>

        <div className="glass-card">
          <h3>View Students</h3>
          <p>View and manage student details.</p>
          <button onClick={() => navigate("/view-students")}>View</button>
        </div>

        <div className="glass-card">
          <h3>Start Lecture</h3>
          <p>Schedule a new lecture.</p>
          <button onClick={() => navigate("/start-lecture")}>Start</button>
        </div>
      </div>

      {/* Row 2 */}
      <div className="card-row">
        <div className="glass-card">
          <h3>View Lectures</h3>
          <p>View and manage scheduled lectures.</p>
          <button onClick={() => navigate("/view-lectures")}>View</button>
        </div>

        <div className="glass-card">
          <h3>View Attendance</h3>
          <p>View student attendance records.</p>
          <button onClick={() => navigate("/view-attendance")}>View</button>
        </div>
      </div>

    </div>
  );
}

export default FacultyDashboard;