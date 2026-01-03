import express from "express";
import Councillor from "../models/Councillor.js";
import { generateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Councillor Login (No signup endpoint - credentials must be pre-existing)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find councillor
    const councillor = await Councillor.findOne({ email: email.toLowerCase() });
    if (!councillor) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if councillor is active
    if (!councillor.isActive) {
      return res.status(403).json({ message: "Councillor account is inactive" });
    }

    // Compare password
    const isMatch = await councillor.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(councillor._id, "councillor");

    res.json({
      message: "Login successful",
      token,
      councillor: councillor.toJSON(),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Get councillor profile
router.get("/profile", async (req, res) => {
  try {
    const councillorId = req.user.userId;
    const councillor = await Councillor.findById(councillorId);

    if (!councillor) {
      return res.status(404).json({ message: "Councillor not found" });
    }

    res.json(councillor.toJSON());
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
});

// ❌ NO SIGNUP ENDPOINT - Councillor accounts must be pre-created in database
// This ensures security: only pre-authorized councillors can access the system

export default router;
