import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentForm.css";

function StudentForm({ editStudent, onStudentUpdated }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setAge(editStudent.age);
      setEmail(editStudent.email);
      setCity(editStudent.city);
      setCourse(editStudent.course);
    }
  }, [editStudent]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editStudent) {
        await axios.put(
          `http://localhost:5000/students/${editStudent._id}`,
          {
            name,
            age,
            email,
            city,
            course,
          }
        );

        alert("Student updated successfully");

        setName("");
        setAge("");
        setEmail("");
        setCity("");
        setCourse("");

        if (onStudentUpdated) {
          onStudentUpdated();
        }

        // Reload list after update
        window.location.reload();
      } else {
        await axios.post("http://localhost:5000/students", {
          name,
          age,
          email,
          city,
          course,
        });

        alert("New student added successfully");

        setName("");
        setAge("");
        setEmail("");
        setCity("");
        setCourse("");

        window.location.reload();
      }
    } catch (error) {
      console.log("ERROR:", error);

      if (error.response) {
        alert(error.response.data.msg || "Something went wrong");
      } else {
        alert("Server is not responding");
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>{editStudent ? "Edit Student" : "Student Registration"}</h2>

      <input
        type="text"
        value={name}
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        value={age}
        placeholder="Enter Your Age"
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <input
        type="email"
        value={email}
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        value={city}
        placeholder="Enter Your City"
        onChange={(e) => setCity(e.target.value)}
        required
      />

      <input
        type="text"
        value={course}
        placeholder="Enter Your Course"
        onChange={(e) => setCourse(e.target.value)}
        required
      />

      <button type="submit">
        {editStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;