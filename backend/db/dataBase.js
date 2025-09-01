const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb+srv://Safian:safian@cluster0.vdjtytx.mongodb.net/").then((data) => {
    console.log(`mongodb is connected with server ${data.connection.host}`);
  });
};

module.exports = connectDB;
