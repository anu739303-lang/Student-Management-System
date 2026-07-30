const express = require("express");
const Student = require("../models/Student");
const Router = express.Router();

//Create New Student
Router.post("/",async(req,res)=>{
    try{
    const student = await Student.create(req.body);
    res.status(201).json({
        msg:"student created successfully...",
        student
    })
    } catch(error){
        res.status(500).json({
            msg:error
        })
    }
})

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
    
    



module.exports= Router;