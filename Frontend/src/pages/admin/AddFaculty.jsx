import React, { useState } from "react";
import api from "../../api/api"; // adjust path if needed


function AddFaculty() {
  const [faculty, setFaculty] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    code: "",
    department: "",
  });

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/faculty/add",
        faculty
      );

      alert("Faculty added successfully!");
      console.log("Saved Faculty:", response.data);

      setFaculty({
        name: "",
        email: "",
        password: "",
        mobile: "",
        code: "",
        department: "",
      });
    } catch (error) {
      console.error("Error adding faculty:", error);
      alert("Failed to add faculty");
    }
  };

  return (
    <>
    
<style>{`
  * {
    box-sizing: border-box;
    font-family: "Segoe UI", Tahoma, sans-serif;
  }
  .faculty-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0f1a, #1b2b3a);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .faculty-card {
    width: 420px;
    background: #121212;
    padding: 30px;
    border-radius: 14px;
  }
  .faculty-card h2 {
    text-align: center;
    color: #fff;
  }
  .faculty-card input {
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 8px; /* Rounded corners */
    border: 1px solid #ccc; /* Optional border */
  }
  .faculty-card button {
    width: 100%;
    padding: 12px;
    background: #4f9cff;
    color: #fff;
    border: none;
    border-radius: 8px; /* Also round the button */
    cursor: pointer;
  }
`}</style>

      <div className="faculty-page">
        <form className="faculty-card" onSubmit={handleSubmit}>
          <h2>Add Faculty</h2>

          <input name="name" placeholder="Name" value={faculty.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={faculty.email} onChange={handleChange} />
          <input name="password" placeholder="Password" value={faculty.password} onChange={handleChange} />
          <input name="mobile" placeholder="Mobile" value={faculty.mobile} onChange={handleChange} />
          <input name="code" placeholder="Faculty Code" value={faculty.code} onChange={handleChange} />
          <input name="department" placeholder="Department" value={faculty.department} onChange={handleChange} />

          <button type="submit">Add Faculty</button>
        </form>
      </div>
    </>
  );
}

export default AddFaculty;
