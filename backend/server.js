require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());


// =========================
// ROUTES
// =========================

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);


// Student Routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);


// =========================
// MONGODB CONNECTION
// =========================

mongoose
  .connect("mongodb://127.0.0.1:27017/studentSystemDB")
  .then(() => {
    console.log("DB Connected Successfully..");
  })
  .catch((err) => {
    console.log(err);
  });


// =========================
// SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `Server is working fine on port number ${PORT}`
  );
});