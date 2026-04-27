import User from "@/models/user";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const { connection } = await mongoose.connect(uri);
    console.log(`Database Connected on ${connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

// 🍪 THIS GOES HERE ↓↓↓
export const cookieSetter = (res, token, set) => {
  const cookieValue = `token=${token}; HttpOnly; Path=/; ${
    set ? `Max-Age=${60 * 60 * 24 * 7};` : "Max-Age=0;"
  } SameSite=Strict; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`;

  res.setHeader("Set-Cookie", cookieValue);
};

export const checkAuth = async (req) => {
  try {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) return null;

    // Safely extract token from "token=<value>" format
    const tokenCookie = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("token="));

    if (!tokenCookie) return null;

    const token = tokenCookie.split("=")[1];

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ await the DB call
    const user = await User.findById(decoded._id);

    return user || null;
  } catch (err) {
    console.error("checkAuth error:", err.message);
    return null; // ✅ never throw — let the route handle null
  }
};

export const asyncError = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.error("asyncError caught:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};
