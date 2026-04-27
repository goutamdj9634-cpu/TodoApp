

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
    minLength: [6, "password too short"],
  },
});

// ✅ Important fix for Next.js hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
