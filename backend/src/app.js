const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Parse cookies from incoming requests
app.use(cookieParser());

// Test route
app.get("/api/health", (req, res) => {
  console.log("Backend is running")
  res.status(200).json({
    message: "Backend is running"
  });
});

module.exports = app;
