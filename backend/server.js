const app = require("./app");
const connectDB = require("./db/dataBase");
require("dotenv").config({
  path: "backend/config/.env", 
});
const cloudinary = require("cloudinary");
const express = require("express");
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// HANDLING UNCAUGHT EXCEPTIONS

process.on("uncaughtException", (err) => {
  console.log(`Error, ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// CONFIG
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
// CONNECT DB
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// CREATE SERVER

const server = app.listen(process.env.PORT, () => {
  console.log(`server is runnig on http://localhost:${process.env.PORT}`);
});

// UNHANDLE PROMISE REJECTION
process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server for  ${err.message}`);
  console.log(`shutting down the server for Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
