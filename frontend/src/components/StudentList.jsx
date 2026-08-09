import { useState } from "react";
import axios from "axios";
import "./StudentList.css";

function StudentList({
  students,
  setStudents,
  onEditStudent,
  onStudentDeleted,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Delete Student
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/students/${id}`);

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );

      alert("Student deleted successfully");

      if (onStudentDeleted) {
        onStudentDeleted();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete student");
    }
  };

  // Search
  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase();

    return (
      student.name?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search) ||
      student.city?.toLowerCase().includes(search) ||
      student.course?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="student-list-container">
      <h2>Student List</h2>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, email, city or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p className="no-students">
          {searchTerm
            ? "No student found matching your search."
            : "No students found."}
        </p>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>City</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.email}</td>
                  <td>{student.city}</td>
                  <td>{student.course}</td>

                  <td>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => onEditStudent(student)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;