import { useEffect, useState } from "react";
import API from "./api";

import "./App.css";

import Dashboard from "./components/Dashboard";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import Login from "./components/Login";

function App() {

  // =========================
  // ADMIN LOGIN STATE
  // =========================

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");

    return savedAdmin
      ? JSON.parse(savedAdmin)
      : null;
  });


  // =========================
  // STUDENT STATE
  // =========================

  const [students, setStudents] = useState([]);

  const [editStudent, setEditStudent] =
    useState(null);


  // =========================
  // FETCH STUDENTS
  // =========================

  const fetchStudents = async () => {

    try {

      const res = await API.get("/students");

      setStudents(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  // =========================
  // FETCH ONLY AFTER LOGIN
  // =========================

  useEffect(() => {

    if (isLoggedIn) {
      fetchStudents();
    }

  }, [isLoggedIn]);


  // =========================
  // LOGIN
  // =========================

  const handleLogin = (adminData) => {

    setAdmin(adminData);

    setIsLoggedIn(true);

  };


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("admin");

    setAdmin(null);

    setIsLoggedIn(false);

  };


  // =========================
  // EDIT STUDENT
  // =========================

  const handleEditStudent = (student) => {

    setEditStudent(student);

    setTimeout(() => {

      document
        .getElementById("student-form")
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }, 100);
  };


  // =========================
  // STUDENT UPDATED
  // =========================

  const handleStudentUpdated = () => {

    setEditStudent(null);

    fetchStudents();

  };


  // =========================
  // STUDENT ADDED
  // =========================

  const handleStudentAdded = () => {

    fetchStudents();

  };


  // =========================
  // STUDENT DELETED
  // =========================

  const handleStudentDeleted = () => {

    fetchStudents();

  };


  // =========================
  // SHOW LOGIN PAGE
  // =========================

  if (!isLoggedIn) {

    return (
      <Login
        onLogin={handleLogin}
      />
    );

  }


  // =========================
  // DASHBOARD
  // =========================

  return (

    <div className="app-container">


      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">

        <div className="logo-section">

          <div className="logo-icon">
            🎓
          </div>

          <div>

            <h2>
              Student Management
            </h2>

            <span>
              Admin Dashboard
            </span>

          </div>

        </div>


        <div className="navbar-right">

          <span className="dashboard-label">
            Dashboard
          </span>


          {/* ADMIN PROFILE */}

          <div className="profile">

            <div className="profile-icon">
              👤
            </div>

            <div className="profile-text">

              <strong>
                {admin?.name || "Admin"}
              </strong>

              <span>
                {admin?.role || "Administrator"}
              </span>

            </div>


            {/* LOGOUT */}

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">


        {/* PAGE HEADING */}

        <section className="page-heading">

          <div>

            <h1>
              Dashboard
            </h1>

            <p>
              Manage students, courses and
              academic records
            </p>

          </div>


          <div className="student-count">

            <span>
              Last updated
            </span>

            <strong>
              Live Data
            </strong>

          </div>

        </section>


        {/* =========================
            DASHBOARD
        ========================= */}

        <Dashboard
          students={students}
        />


        {/* =========================
            STUDENT REGISTRATION
        ========================= */}

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

            onStudentUpdated={
              handleStudentUpdated
            }

            onStudentAdded={
              handleStudentAdded
            }

          />

        </section>


        {/* =========================
            STUDENT RECORDS
        ========================= */}

        <section className="content-section">

          <div className="section-title">

            <h2>
              Student Records
            </h2>

            <p>
              View, search, edit and delete
              student records
            </p>

          </div>


          <StudentList

            students={students}

            setStudents={setStudents}

            onEdit={handleEditStudent}

            onStudentDeleted={
              handleStudentDeleted
            }

          />

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

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