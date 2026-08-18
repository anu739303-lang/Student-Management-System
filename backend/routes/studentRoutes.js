const express = require("express");
const Student = require("../models/Student");
const authMiddleware = require("../middleware/authMiddleware");

const Router = express.Router();


// ========================================
// PROTECT ALL STUDENT ROUTES
// ========================================

Router.use(authMiddleware);


// ========================================
// CREATE NEW STUDENT
// ========================================

Router.post("/", async (req, res) => {
  try {

    const student = await Student.create(req.body);

    res.status(201).json({
      msg: "Student created successfully",
      student,
    });

  } catch (error) {

    console.log("CREATE STUDENT ERROR:", error);

    // Duplicate email
    if (error.code === 11000) {

      return res.status(400).json({
        msg: "Email already exists. Please use a different email.",
      });

    }

    res.status(500).json({
      msg: "Failed to create student",
      error: error.message,
    });

  }
});


// ========================================
// VIEW ALL STUDENTS
// ========================================

Router.get("/", async (req, res) => {

  try {

    const students = await Student.find();

    res.status(200).json(students);

  } catch (error) {

    res.status(500).json({
      msg: "Failed to fetch students",
      error: error.message,
    });

  }

});


// ========================================
// VIEW STUDENT BY ID
// ========================================

Router.get("/:id", async (req, res) => {

  try {

    const student = await Student.findById(
      req.params.id
    );

    if (!student) {

      return res.status(404).json({
        msg: "Student not found",
      });

    }

    res.status(200).json(student);

  } catch (error) {

    res.status(400).json({
      msg: "Invalid student ID",
    });

  }

});


// ========================================
// DELETE STUDENT
// ========================================

Router.delete("/:id", async (req, res) => {

  try {

    const student =
      await Student.findByIdAndDelete(
        req.params.id
      );

    if (!student) {

      return res.status(404).json({
        msg: "Student not found",
      });

    }

    res.status(200).json({
      msg: "Student deleted successfully",
      student,
    });

  } catch (error) {

    res.status(400).json({
      msg: "Invalid student ID",
    });

  }

});


// ========================================
// UPDATE STUDENT
// ========================================

Router.put("/:id", async (req, res) => {

  try {

    const student =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!student) {

      return res.status(404).json({
        msg: "Student not found",
      });

    }

    res.status(200).json({
      msg: "Student updated successfully",
      student,
    });

  } catch (error) {

    console.log(
      "UPDATE STUDENT ERROR:",
      error
    );

    res.status(500).json({
      msg: "Failed to update student",
      error: error.message,
    });

  }

});


module.exports = Router;