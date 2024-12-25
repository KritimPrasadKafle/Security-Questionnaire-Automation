const { mongoose } = require('mongoose');
const { dotenv } = require('dotenv');
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL; const Connection = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
}

module.exports = { Connection };