import { useEffect, useState } from "react";
import API from "../api";
import "./StudentList.css";

function StudentList({
  students = [],
  onEditStudent,
  onStudentDeleted,
}) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const [courseFilter, setCourseFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  // View student
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;


  /* =========================
     LOADING
  ========================= */

  useEffect(() => {
    setLoading(false);
  }, [students]);


  /* =========================
     ERROR
  ========================= */

  useEffect(() => {
    if (!students) {
      setError("Unable to load students.");
    } else {
      setError("");
    }
  }, [students]);


  /* =========================
     UNIQUE COURSES
  ========================= */

  const courses = [
    ...new Set(
      students
        .map((student) => student.course)
        .filter(Boolean)
    ),
  ];


  /* =========================
     UNIQUE CITIES
  ========================= */

  const cities = [
    ...new Set(
      students
        .map((student) => student.city)
        .filter(Boolean)
    ),
  ];


  /* =========================
     SEARCH + FILTER
  ========================= */

  const filteredStudents = students.filter((student) => {

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      student.name?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search) ||
      student.city?.toLowerCase().includes(search) ||
      student.course?.toLowerCase().includes(search);

    const matchesCourse =
      courseFilter === "" ||
      student.course === courseFilter;

    const matchesCity =
      cityFilter === "" ||
      student.city === cityFilter;

    return (
      matchesSearch &&
      matchesCourse &&
      matchesCity
    );
  });


  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents =
    filteredStudents.slice(
      indexOfFirstStudent,
      indexOfLastStudent
    );


  /* =========================
     RESET PAGE WHEN FILTER
  ========================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    courseFilter,
    cityFilter,
  ]);


  /* =========================
     DELETE STUDENT
  ========================= */

  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await API.delete(`/students/${id}`);

      alert("Student deleted successfully");

      // Refresh parent data
      if (onStudentDeleted) {
        onStudentDeleted();
      }

    } catch (error) {

      console.log(error);

      alert("Failed to delete student");
    }
  };


  /* =========================
     EDIT STUDENT
  ========================= */

  const handleEdit = (student) => {

    if (onEditStudent) {
      onEditStudent(student);
    }
  };


  /* =========================
     VIEW STUDENT
  ========================= */

  const handleView = (student) => {
    setSelectedStudent(student);
  };


  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {

    setSearchTerm("");
    setCourseFilter("");
    setCityFilter("");
    setCurrentPage(1);
  };


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (
      <div className="student-list-container">

        <div className="loading-state">

          <div className="loading-spinner"></div>

          <h3>
            Loading Students...
          </h3>

          <p>
            Please wait while we fetch student records.
          </p>

        </div>

      </div>
    );
  }


  /* =========================
     ERROR
  ========================= */

  if (error) {

    return (
      <div className="student-list-container">

        <div className="error-state">

          <div className="error-icon">
            ⚠️
          </div>

          <h3>
            Something went wrong
          </h3>

          <p>
            {error}
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="student-list-container">


      {/* =========================
          HEADER
      ========================= */}

      <div className="student-list-header">

        <div>

          <h2>
            Student Records
          </h2>

          <p>
            Manage all registered students
          </p>

        </div>

        <div className="record-count">

          {filteredStudents.length}{" "}
          {filteredStudents.length === 1
            ? "Student"
            : "Students"}

        </div>

      </div>


      {/* =========================
          SEARCH + FILTERS
      ========================= */}

      <div className="student-filters">


        {/* Search */}

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Search by name, email, city or course..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>


        {/* Course Filter */}

        <select
          value={courseFilter}
          onChange={(e) =>
            setCourseFilter(e.target.value)
          }
        >

          <option value="">
            All Courses
          </option>

          {courses.map((course) => (

            <option
              key={course}
              value={course}
            >
              {course}
            </option>

          ))}

        </select>


        {/* City Filter */}

        <select
          value={cityFilter}
          onChange={(e) =>
            setCityFilter(e.target.value)
          }
        >

          <option value="">
            All Cities
          </option>

          {cities.map((city) => (

            <option
              key={city}
              value={city}
            >
              {city}
            </option>

          ))}

        </select>


        {/* Clear */}

        <button
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>


      {/* =========================
          EMPTY STATE
      ========================= */}

      {students.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            👨‍🎓
          </div>

          <h3>
            No Students Found
          </h3>

          <p>
            There are no student records available.
          </p>

          <p>
            Add your first student using the
            registration form above.
          </p>

        </div>

      ) : filteredStudents.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            🔍
          </div>

          <h3>
            No Matching Students
          </h3>

          <p>
            Try changing your search or filters.
          </p>

          <button
            className="retry-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        <>


          {/* =========================
              TABLE
          ========================= */}

          <div className="table-wrapper">

            <table className="student-table">

              <thead>

                <tr>

                  <th>
                    Name
                  </th>

                  <th>
                    Age
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    City
                  </th>

                  <th>
                    Course
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {currentStudents.map(
                  (student) => (

                    <tr
                      key={student._id}
                    >

                      <td>
                        <strong>
                          {student.name}
                        </strong>
                      </td>

                      <td>
                        {student.age}
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.city}
                      </td>

                      <td>

                        <span className="course-badge">
                          {student.course}
                        </span>

                      </td>

                      <td>

                        <div className="action-buttons">


                          {/* View */}

                          <button
                            className="view-btn"
                            onClick={() =>
                              handleView(student)
                            }
                            title="View Student"
                          >
                            👁️
                          </button>


                          {/* Edit */}

                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(student)
                            }
                            title="Edit Student"
                          >
                            ✏️
                          </button>


                          {/* Delete */}

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteStudent(
                                student._id
                              )
                            }
                            title="Delete Student"
                          >
                            🗑️
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>


          {/* =========================
              PAGINATION
          ========================= */}

          {totalPages > 1 && (

            <div className="pagination">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
              >
                ← Previous
              </button>


              <div className="page-numbers">

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (

                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? "active-page"
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >
                    {page}
                  </button>

                ))}

              </div>


              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
              >
                Next →
              </button>

            </div>

          )}

        </>

      )}


      {/* =========================
          VIEW STUDENT MODAL
      ========================= */}

      {selectedStudent && (

        <div
          className="student-modal-overlay"
          onClick={() =>
            setSelectedStudent(null)
          }
        >

          <div
            className="student-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  Student Details
                </h2>

                <p>
                  Complete student information
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedStudent(null)
                }
              >
                ×
              </button>

            </div>


            <div className="student-profile">

              <div className="profile-avatar">
                {selectedStudent.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <h3>
                {selectedStudent.name}
              </h3>

              <span>
                {selectedStudent.course}
              </span>

            </div>


            <div className="student-details">

              <div className="detail-item">

                <span>
                  📧 Email
                </span>

                <strong>
                  {selectedStudent.email}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  🎂 Age
                </span>

                <strong>
                  {selectedStudent.age}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  🏙️ City
                </span>

                <strong>
                  {selectedStudent.city}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  🎓 Course
                </span>

                <strong>
                  {selectedStudent.course}
                </strong>

              </div>

            </div>


            <button
              className="modal-close-btn"
              onClick={() =>
                setSelectedStudent(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default StudentList;