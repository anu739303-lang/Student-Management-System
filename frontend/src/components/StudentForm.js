import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentForm.css";

function StudentForm({
  editStudent,
  onStudentUpdated,
  onStudentAdded,
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [course, setCourse] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fill form when editing
  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name || "");
      setAge(editStudent.age || "");
      setEmail(editStudent.email || "");
      setCity(editStudent.city || "");
      setCourse(editStudent.course || "");
    }
  }, [editStudent]);

  // Clear form
  const clearForm = () => {
    setName("");
    setAge("");
    setEmail("");
    setCity("");
    setCourse("");
  };

  // Validation
  const validateForm = () => {
    if (!name.trim()) {
      return "Please enter student name.";
    }

    if (name.trim().length < 2) {
      return "Name must contain at least 2 characters.";
    }

    if (!age) {
      return "Please enter student age.";
    }

    if (Number(age) < 1 || Number(age) > 100) {
      return "Age must be between 1 and 100.";
    }

    if (!email.trim()) {
      return "Please enter email.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!city.trim()) {
      return "Please enter city.";
    }

    if (!course.trim()) {
      return "Please enter course.";
    }

    return "";
  };

  // Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const studentData = {
        name: name.trim(),
        age: Number(age),
        email: email.trim(),
        city: city.trim(),
        course: course.trim(),
      };

      // UPDATE
      if (editStudent) {
        await axios.put(
          `http://localhost:5000/students/${editStudent._id}`,
          studentData
        );

        setSuccess("Student updated successfully!");

        clearForm();

        if (onStudentUpdated) {
          onStudentUpdated();
        }
      }

      // ADD
      else {
        await axios.post(
          "http://localhost:5000/students",
          studentData
        );

        setSuccess("Student added successfully!");

        clearForm();

        if (onStudentAdded) {
          onStudentAdded();
        }
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(
          error.response.data?.msg ||
          "Something went wrong. Please try again."
        );
      } else {
        setError(
          "Unable to connect to server. Please make sure backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Cancel Edit
  const cancelEdit = () => {
    clearForm();
    setError("");
    setSuccess("");

    if (onStudentUpdated) {
      onStudentUpdated();
    }
  };

  return (
    <div className="student-form">

      <form onSubmit={submitHandler}>

        {/* Error Message */}
        {error && (
          <div className="form-message error-message">
            ❌ {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="form-message success-message">
            ✅ {success}
          </div>
        )}

        {/* Name */}
        <input
          type="text"
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />

        {/* Age */}
        <input
          type="number"
          value={age}
          placeholder="Enter Your Age"
          onChange={(e) => setAge(e.target.value)}
          disabled={loading}
        />

        {/* Email */}
        <input
          type="email"
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        {/* City */}
        <input
          type="text"
          value={city}
          placeholder="Enter Your City"
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
        />

        {/* Course */}
        <input
          type="text"
          value={course}
          placeholder="Enter Your Course"
          onChange={(e) => setCourse(e.target.value)}
          disabled={loading}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? editStudent
              ? "Updating Student..."
              : "Adding Student..."
            : editStudent
            ? "Update Student"
            : "Add Student"}
        </button>

        {/* Cancel */}
        {editStudent && !loading && (
          <button
            type="button"
            className="cancel-btn"
            onClick={cancelEdit}
          >
            Cancel Edit
          </button>
        )}

      </form>

    </div>
  );
}

export default StudentForm;