const express = require("express");
const Student = require("../models/Student");
const Router = express.Router();

// Create New Student
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

// View all Students
Router.get("/",async(req,res)=>{
    try{
    const student = await Student.find();
    res.status(201).json(student)
        
        
    } catch(error){
        res.status(501).json({
            msg:error
        })
    }
})


//View student with Id
Router.get("/:id",async(req,res)=>{
    try{
    const student = await Student.findById(req.params.id);
    if(!student){
        res.satuts(404).json({
            msg:"student not found"
        })
    }
    } catch(error){
        res.status(501).json({
            msg:"imposter id"
        })
    }
})
    
    

// Delete student with ID
Router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

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
    res.status(500).json({
      msg: "Invalid student ID",
    });
  }
});


module.exports= Router;