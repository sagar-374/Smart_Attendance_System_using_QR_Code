import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import api from "../../api/api"; // ✅ use centralized axios instance

function LectureQR() {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  const [lecture, setLecture] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/api/lecture/${lectureId}`) // ✅ baseURL handled by api.js
      .then((res) => {
        setLecture(res.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load lecture details");
      });
  }, [lectureId]);

  if (error) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px", color: "#f87171" }}>
        {error}
      </p>
    );
  }

  if (!lecture) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px", color: "#e5e7eb" }}>
        Loading...
      </p>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #020617, #0f172a)",
        color: "#e5e7eb",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(14px)",
          borderRadius: "18px",
          padding: "28px 24px",
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
        }}
      >
        <h2 style={{ color: "#f8fafc", marginBottom: "6px" }}>
          {lecture.title}
        </h2>

        <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "12px" }}>
          Lecture ID: {lecture.lectureId}
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#cbd5f5",
            marginBottom: "20px",
          }}
        >
          Students can scan the QR code below to mark their attendance.
        </p>

        {lecture.qrToken ? (
          <div
            style={{
              background: "#ffffff",
              padding: "14px",
              borderRadius: "14px",
              display: "inline-block",
              marginBottom: "22px",
            }}
          >
            <QRCode
              value={JSON.stringify({
                lectureId: lecture.lectureId,
                token: lecture.qrToken,
              })}
              size={220}
            />
          </div>
        ) : (
          <p style={{ color: "#facc15", marginBottom: "20px" }}>
            QR code not generated yet
          </p>
        )}

        <button
          onClick={() => navigate(`/view-attendance/${lectureId}`)}
          disabled={!lecture.qrToken}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            cursor: lecture.qrToken ? "pointer" : "not-allowed",
            fontSize: "15px",
            fontWeight: "500",
            background: lecture.qrToken
              ? "linear-gradient(135deg, #3b82f6, #60a5fa)"
              : "#475569",
            color: "#020617",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            opacity: lecture.qrToken ? 1 : 0.7,
          }}
        >
          View Attendance
        </button>
      </div>
    </div>
  );
}

export default LectureQR;
