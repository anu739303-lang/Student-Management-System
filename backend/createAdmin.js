require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/studentSystemDB"
    );

    console.log("MongoDB connected successfully");


    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");

      await mongoose.connection.close();

      return;
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );


    // Create admin
    const admin = new Admin({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "Administrator",
    });


    // Save admin
    await admin.save();

    console.log("Admin created successfully!");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin123");


    // Close database connection
    await mongoose.connection.close();

  } catch (error) {

    console.log(
      "Error creating admin:",
      error
    );

    process.exit(1);
  }
};

createAdmin();