const mongoose = require("mongoose");

let connectionPromise;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Reusing existing MongoDB connection");

    return mongoose.connection;
  }

  if (!connectionPromise) {
    console.log("Creating new MongoDB connection");

    connectionPromise = mongoose.connect(process.env.MONGODB_URI)
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  } else {
    console.log("Reusing existing MongoDB connection promise");
  }

  return connectionPromise;
}

module.exports = connectDB;