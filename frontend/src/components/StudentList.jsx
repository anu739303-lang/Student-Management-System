import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentList.css";

function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "http://localhost:5000/students"
      );

      setStudents(res.data);
    } catch (error) {
      console.log(error);

      setError(
        "Unable to load students. Please check your server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete Student
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/students/${id}`
      );

      setStudents(
        students.filter(
          (student) => student._id !== id
        )
      );

      alert("Student deleted successfully");

    } catch (error) {
      console.log(error);

      alert("Failed to delete student");
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="student-list-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>

          <h3>Loading Students...</h3>

          <p>
            Please wait while we fetch student records.
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="student-list-container">
        <div className="error-state">

          <div className="error-icon">
            ⚠️
          </div>

          <h3>Something went wrong</h3>

          <p>{error}</p>

          <button
            className="retry-btn"
            onClick={fetchStudents}
          >
            🔄 Try Again
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="student-list-container">

      <h2>Student List</h2>

      {/* Empty State */}
      {students.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            👨‍🎓
          </div>

          <h3>No Students Found</h3>

          <p>
            There are no student records available.
          </p>

          <p>
            Add your first student using the
            registration form above.
          </p>

        </div>

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
                      className="edit-btn"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteStudent(student._id)
                      }
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