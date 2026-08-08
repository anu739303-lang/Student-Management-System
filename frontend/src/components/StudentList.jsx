import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentList.css";

function StudentList() {
  const [students, setStudents] = useState([]);

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

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/students/${id}`);

      setStudents(
        students.filter((student) => student._id !== id)
      );

      alert("Student deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete student");
    }
  };

  return (
    <div className="student-list-container">
      <h2>Student List</h2>

      {students.length === 0 ? (
        <p className="no-students">No students found.</p>
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
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.email}</td>
                  <td>{student.city}</td>
                  <td>{student.course}</td>

                  <td>
                    <button
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