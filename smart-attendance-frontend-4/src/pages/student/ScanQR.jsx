import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // ✅ use axios instance

function ScanQR() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);

  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (!student) {
      navigate("/student-login");
      return;
    }

    if (scannerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scannerRef.current.render(
      async (decodedText) => {
        if (isProcessingRef.current) return; // 🔒 prevent double scan
        isProcessingRef.current = true;

        try {
          const qrData = JSON.parse(decodedText);

          await scannerRef.current.clear();
          scannerRef.current = null;

          await api.post("/api/attendance/mark", {
            lectureId: qrData.lectureId,
            token: qrData.token,
            rollNo: student.rollNo,
            name: student.name,
          });

          setMessage("success");

          setTimeout(() => {
            navigate("/student-dashboard");
          }, 1500);
        } catch (err) {
          console.error(err);

          if (err.response?.status === 409) {
            setMessage("already-marked");
          } else if (err.response?.status === 410) {
            setMessage("expired");
          } else {
            setMessage("error");
          }
        }
      },
      () => {}
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [navigate, student]);

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
        <h2 style={{ color: "#f8fafc", marginBottom: "8px" }}>
          Scan Lecture QR
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "#cbd5f5",
            marginBottom: "20px",
            lineHeight: "1.6",
          }}
        >
          Align the QR code within the frame to mark your attendance.
        </p>

        <div
          id="qr-reader"
          style={{
            width: "280px",
            margin: "0 auto",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        />

        {message === "success" && (
          <p style={{ marginTop: "18px", color: "#4ade80" }}>
            ✅ Attendance marked successfully!
          </p>
        )}

        {message === "already-marked" && (
          <p style={{ marginTop: "18px", color: "#facc15" }}>
            ⚠️ Attendance already marked
          </p>
        )}

        {message === "expired" && (
          <p style={{ marginTop: "18px", color: "#f87171" }}>
            ❌ QR code expired
          </p>
        )}

        {message === "error" && (
          <p style={{ marginTop: "18px", color: "#f87171" }}>
            ❌ Invalid QR code
          </p>
        )}
      </div>
    </div>
  );
}

export default ScanQR;
