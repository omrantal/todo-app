const express = require("express");
const cookieParser = require("cookie-parser");
const argon2 = require("argon2");
const mongoose = require("mongoose");

const app = express();

const connectDB = require("./config/db");

// Parse incoming JSON requests
app.use(express.json());

// Parse cookies from incoming requests
app.use(cookieParser());

// Health check route
app.get("/api/health", (req, res) => {
  console.log("Backend is running")
  res.status(200).json({
    message: "Backend is running"
  });
});

module.exports = app;
