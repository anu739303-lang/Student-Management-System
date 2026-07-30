import  { useState } from "react";
import axios from "axios";

function StudentForm() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [course, setCourse] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

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
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={name}
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        type="number"
        value={age}
        placeholder="Enter Your Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <br />

      <input
        type="email"
        value={email}
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="text"
        value={city}
        placeholder="Enter Your City"
        onChange={(e) => setCity(e.target.value)}
      />
      <br />

      <input
        type="text"
        value={course}
        placeholder="Enter Your Course"
        onChange={(e) => setCourse(e.target.value)}
      />
      <br /><br />

      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;