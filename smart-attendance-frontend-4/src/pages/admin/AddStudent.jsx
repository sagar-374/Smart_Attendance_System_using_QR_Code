import React, { useState } from "react";

import "./AddStudent.css";
import api from "../../api/api"; // adjust path if needed


function AddStudent() {
  const [student, setStudent] = useState({
    email: "",
    name: "",
    mobile: "",
    password: "",
    rollNo: "",
    department: ""
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/student/add", student);
      alert("Student added successfully");
      setStudent({
        email: "",
        name: "",
        mobile: "",
        password: "",
        rollNo: "",
        department: ""
      });
    } catch (error) {
      alert("Error adding student");
      console.error(error);
    }
  };

  return (
    <div className="dashboard-bg">
      <div className="add-student-card">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={student.email} onChange={handleChange} required />

          <div className="two-col">
            <div>
              <label>Name</label>
              <input type="text" name="name" value={student.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Mobile</label>
              <input type="text" name="mobile" value={student.mobile} onChange={handleChange} required />
            </div>
          </div>

          <div className="two-col">
            <div>
              <label>Password</label>
              <input type="password" name="password" value={student.password} onChange={handleChange} required />
            </div>
            <div>
              <label>Roll No</label>
              <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} required />
            </div>
          </div>

          <label>Department</label>
          <select name="department" value={student.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
          </select>

          <button type="submit">Add Student</button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
