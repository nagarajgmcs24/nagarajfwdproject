import express from "express";
import Citizen from "../models/Citizen.js";
import { generateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Citizen Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, wardNumber } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if citizen already exists
    const existingCitizen = await Citizen.findOne({ email: email.toLowerCase() });
    if (existingCitizen) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create new citizen
    const citizen = new Citizen({
      name,
      email: email.toLowerCase(),
      password,
      wardNumber,
    });

    await citizen.save();

    // Generate token
    const token = generateToken(citizen._id, "citizen");

    res.status(201).json({
      message: "Signup successful",
      token,
      citizen: citizen.toJSON(),
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// Citizen Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find citizen
    const citizen = await Citizen.findOne({ email: email.toLowerCase() });
    if (!citizen) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await citizen.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(citizen._id, "citizen");

    res.json({
      message: "Login successful",
      token,
      citizen: citizen.toJSON(),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Get citizen profile
router.get("/profile", async (req, res) => {
  try {
    const citizenId = req.user.userId;
    const citizen = await Citizen.findById(citizenId);

    if (!citizen) {
      return res.status(404).json({ message: "Citizen not found" });
    }

    res.json(citizen.toJSON());
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
});

export default router;
