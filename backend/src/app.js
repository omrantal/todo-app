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

// Argon2 check route
app.get("/api/test/argon2", async (req, res) => {
  try {
    const password = "test-password-123";

    const hash = await argon2.hash(password, {
      type: argon2.argon2id
    });

    const verified = await argon2.verify(hash, password);

    res.status(200).json({
      hashGenerated: typeof hash === "string",
      verificationPassed: verified,
      hash: hash
    });
  } catch (error) {
    console.error("Argon2 test failed:", error);

    res.status(500).json({
      error: "ARGON2_TEST_FAILED"
    });
  }
});

// MongoDB connection test
app.get("/api/test/db", async (req, res) => {
  try {
    await connectDB();

    res.status(200).json({
      connected: true,
      database: mongoose.connection.name
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    res.status(500).json({
      connected: false,
      error: "DATABASE_CONNECTION_FAILED"
    });
  }
});

module.exports = app;
