import { useState } from "react";
import "./App.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [editStudent, setEditStudent] = useState(null);

  const handleEditStudent = (student) => {
    setEditStudent(student);
  };

  const handleStudentUpdated = () => {
    setEditStudent(null);
  };

  return (
    <div className="App">
      <h1>Student Management System</h1>

      <StudentForm
        editStudent={editStudent}
        onStudentUpdated={handleStudentUpdated}
      />

      <StudentList onEditStudent={handleEditStudent} />
    </div>
  );
}

export default App;