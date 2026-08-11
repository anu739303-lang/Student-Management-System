import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import Dashboard from "./components/Dashboard";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEditStudent = (student) => {
    setEditStudent(student);

    // Scroll to registration form
    setTimeout(() => {
      document
        .getElementById("student-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleStudentUpdated = () => {
    setEditStudent(null);
    fetchStudents();
  };

  const handleStudentAdded = () => {
    fetchStudents();
  };

  const handleStudentDeleted = () => {
    fetchStudents();
  };

  return (
    <div className="app-container">

      {/* Navbar */}
      <header className="navbar">
        <div className="logo-section">
          <div className="logo-icon">🎓</div>

          <div>
            <h2>Student Management</h2>
            <span>Admin Dashboard</span>
          </div>
        </div>

        <div className="navbar-right">
          <span className="dashboard-label">
            Dashboard
          </span>

          <div className="profile">
            <div className="profile-icon">👤</div>

            <div className="profile-text">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="main-content">

        {/* Page Heading */}
        <section className="page-heading">
          <div>
            <h1>Dashboard</h1>

            <p>
              Manage students, courses and academic records
            </p>
          </div>

          <div className="student-count">
            <span>Last updated</span>
            <strong>Live Data</strong>
          </div>
        </section>


        {/* Dashboard Cards + Charts */}
        <Dashboard students={students} />


        {/* Registration */}
        <section
          id="student-form"
          className="content-section"
        >
          <div className="section-title">
            <h2>
              {editStudent
                ? "Edit Student"
                : "Student Registration"}
            </h2>

            <p>
              {editStudent
                ? "Update the student's information"
                : "Add a new student to the system"}
            </p>
          </div>

          <StudentForm
            editStudent={editStudent}
            onStudentUpdated={handleStudentUpdated}
            onStudentAdded={handleStudentAdded}
          />
        </section>


        {/* Student List */}
        <section className="content-section">

          <div className="section-title">
            <h2>Student Records</h2>

            <p>
              View, search, edit and delete student records
            </p>
          </div>

          <StudentList
            students={students}
            setStudents={setStudents}
            onEditStudent={handleEditStudent}
            onStudentDeleted={handleStudentDeleted}
          />

        </section>

      </main>


      {/* Footer */}
      <footer className="footer">
        <p>
          © 2026 Student Management System
        </p>

        <span>
          Built with React & Node.js
        </span>
      </footer>

    </div>
  );
}

export default App;