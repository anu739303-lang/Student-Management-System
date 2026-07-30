const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT =5000;

//Enabling Cors
app.use(cors());

//Global Middleware
app.use(express.json());

// Mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/studentSystemDB").then(
   
    ()=>{console.log("DB Connected Suceesfully..")}
).catch((err)=>{
    console.log(err);
})



//Routing
const studentRoutes = require("./routes/studentRoutes");
app.use("/students",studentRoutes);

//server listen
app.listen(PORT,()=>{
    console.log(`server is working fine on port number ${PORT}`)
})