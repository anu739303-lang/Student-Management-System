import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import Dashboard from "./components/Dashboard";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  // Fetch students
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

  // Edit student
  const handleEditStudent = (student) => {
    setEditStudent(student);
  };

  // After update
  const handleStudentUpdated = () => {
    setEditStudent(null);
    fetchStudents();
  };

  // After adding
  const handleStudentAdded = () => {
    fetchStudents();
  };

  // After deleting
  const handleStudentDeleted = () => {
    fetchStudents();
  };

  return (
    <div className="App">
      <h1>Student Management System</h1>

      {/* Dashboard */}
      <Dashboard students={students} />

      {/* Student Form */}
      <StudentForm
        editStudent={editStudent}
        onStudentUpdated={handleStudentUpdated}
        onStudentAdded={handleStudentAdded}
      />

      {/* Student List */}
      <StudentList
        students={students}
        setStudents={setStudents}
        onEditStudent={handleEditStudent}
        onStudentDeleted={handleStudentDeleted}
      />
    </div>
  );
}

export default App;