
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./StartLecture.css";
import "./ViewAttendance.css";
import api from "../../api/api";


function StartLecture() {
  const navigate = useNavigate();

  const [lecture, setLecture] = useState({
    lectureId: "",
    title: "",
    facultyName: "",
    startTime: "",
    startPeriod: "AM",
    endTime: "",
    endPeriod: "AM",
    room: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecture((prev) => ({ ...prev, [name]: value }));
  };

  const to24Hour = (time, period) => {
    let [h, m] = time.split(":");
    h = parseInt(h);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${m}`;
  };

  const startLecture = async () => {
    if (
      !lecture.lectureId ||
      !lecture.title ||
      !lecture.facultyName ||
      !lecture.startTime ||
      !lecture.endTime ||
      !lecture.room
    ) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      lectureId: lecture.lectureId,
      title: lecture.title,
      facultyName: lecture.facultyName,
      startTime: to24Hour(lecture.startTime, lecture.startPeriod),
      endTime: to24Hour(lecture.endTime, lecture.endPeriod),
      room: lecture.room
    };

    try {
      const res = await api.post(
        "/api/lecture/start",
        payload
      );

      // Navigate to QR page
      navigate(`/lecture-qr/${res.data.id}`);
    } catch (err) {
      alert("Failed to start lecture");
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Start Lecture</h2>

        <input
          name="lectureId"
          placeholder="Lecture ID"
          value={lecture.lectureId}
          onChange={handleChange}
        />

        <input
          name="title"
          placeholder="Lecture Title"
          value={lecture.title}
          onChange={handleChange}
        />

        <input
          name="facultyName"
          placeholder="Faculty Name"
          value={lecture.facultyName}
          onChange={handleChange}
        />

        <div className="time-group">
          <input
            type="time"
            name="startTime"
            value={lecture.startTime}
            onChange={handleChange}
          />
          <select
            name="startPeriod"
            value={lecture.startPeriod}
            onChange={handleChange}
          >
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>

        <div className="time-group">
          <input
            type="time"
            name="endTime"
            value={lecture.endTime}
            onChange={handleChange}
          />
          <select
            name="endPeriod"
            value={lecture.endPeriod}
            onChange={handleChange}
          >
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>

        <input
          name="room"
          placeholder="Room"
          value={lecture.room}
          onChange={handleChange}
        />

        <button onClick={startLecture}>
          Start Lecture
        </button>
      </div>
    </div>
  );
}

export default StartLecture;
