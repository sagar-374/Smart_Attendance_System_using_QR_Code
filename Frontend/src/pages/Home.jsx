import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>📊 Smart Attendance System</h1>
        <p className="hero-subtitle">
          A modern, secure platform to manage attendance for
          Admins, Faculty, and Students.
        </p>

        <div className="card-container">
          <div className="role-card admin">
            <h2>🛠️ Admin</h2>
            <p>Manage faculty and students</p>
            <Link to="/admin-login" className="btn">
              🔐 Admin Login
            </Link>
          </div>

          <div className="role-card faculty">
            <h2>👩‍🏫 Faculty</h2>
            <p>Start lectures & view attendance</p>
            <Link to="/faculty-login" className="btn">
              🎓 Faculty Login
            </Link>
          </div>

          <div className="role-card student">
            <h2>🎒 Student</h2>
            <p>Mark attendance using QR</p>
            <Link to="/student-login" className="btn">
              📱 Student Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
