const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name:{
    type: String,
  },
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("authUser", authSchema);
