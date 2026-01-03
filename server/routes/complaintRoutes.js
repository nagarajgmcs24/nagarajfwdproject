import express from "express";
import Complaint from "../models/Complaint.js";
import Councillor from "../models/Councillor.js";
import { authenticateUser, isCitizen, isCouncillor } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create complaint (Citizen only)
router.post("/create", authenticateUser, isCitizen, async (req, res) => {
  try {
    const { title, description, category, wardNumber, location, imageUrl } = req.body;

    // Validation
    if (!title || !description || !category || !wardNumber) {
      return res.status(400).json({ message: "Title, description, category, and ward number are required" });
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      wardNumber,
      location,
      imageUrl,
      reportedBy: req.user.userId,
    });

    // Assign to the ward's councillor if exists
    const councillor = await Councillor.findOne({ wardNumber });
    if (councillor) {
      complaint.assignedCouncillor = councillor._id;
    }

    await complaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint: complaint.toJSON(),
    });
  } catch (error) {
    console.error("Create complaint error:", error);
    res.status(500).json({ message: "Failed to create complaint", error: error.message });
  }
});

// Get all complaints by citizen
router.get("/my-complaints", authenticateUser, isCitizen, async (req, res) => {
  try {
    const complaints = await Complaint.find({ reportedBy: req.user.userId })
      .populate("reportedBy", "name email")
      .populate("assignedCouncillor", "name email wardNumber")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error("Fetch complaints error:", error);
    res.status(500).json({ message: "Failed to fetch complaints", error: error.message });
  }
});

// Get complaints for a ward (Councillor only)
router.get("/ward-complaints", authenticateUser, isCouncillor, async (req, res) => {
  try {
    const councillor = await Councillor.findById(req.user.userId);

    if (!councillor) {
      return res.status(404).json({ message: "Councillor not found" });
    }

    const complaints = await Complaint.find({ wardNumber: councillor.wardNumber })
      .populate("reportedBy", "name email phoneNumber wardNumber")
      .populate("assignedCouncillor", "name email")
      .sort({ createdAt: -1 });

    res.json({
      ward: councillor.wardNumber,
      complaints,
    });
  } catch (error) {
    console.error("Fetch ward complaints error:", error);
    res.status(500).json({ message: "Failed to fetch complaints", error: error.message });
  }
});

// Get complaint details
router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("reportedBy", "name email phoneNumber wardNumber")
      .populate("assignedCouncillor", "name email wardNumber");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Check permissions
    const isCitizenOwner = complaint.reportedBy._id.equals(req.user.userId);
    const isAssignedCouncillor = complaint.assignedCouncillor?._id.equals(req.user.userId);

    if (!isCitizenOwner && !isAssignedCouncillor && req.user.userType !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(complaint);
  } catch (error) {
    console.error("Fetch complaint error:", error);
    res.status(500).json({ message: "Failed to fetch complaint", error: error.message });
  }
});

// Update complaint status and remarks (Councillor only)
router.put("/:id/update-status", authenticateUser, isCouncillor, async (req, res) => {
  try {
    const { status, remarks, priority } = req.body;

    // Validation
    if (!status || !["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Valid status is required" });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Check if councillor is assigned to this complaint's ward
    const councillor = await Councillor.findById(req.user.userId);
    if (complaint.wardNumber !== councillor.wardNumber) {
      return res.status(403).json({ message: "You can only update complaints in your ward" });
    }

    complaint.status = status;
    if (remarks) complaint.remarks = remarks;
    if (priority) complaint.priority = priority;

    if (status === "Resolved") {
      complaint.resolutionDate = new Date();
    }

    await complaint.save();

    res.json({
      message: "Complaint updated successfully",
      complaint: complaint.toJSON(),
    });
  } catch (error) {
    console.error("Update complaint error:", error);
    res.status(500).json({ message: "Failed to update complaint", error: error.message });
  }
});

// Get ward statistics (Councillor only)
router.get("/stats/ward-stats", authenticateUser, isCouncillor, async (req, res) => {
  try {
    const councillor = await Councillor.findById(req.user.userId);

    if (!councillor) {
      return res.status(404).json({ message: "Councillor not found" });
    }

    const complaints = await Complaint.find({ wardNumber: councillor.wardNumber });

    const stats = {
      totalComplaints: complaints.length,
      pending: complaints.filter((c) => c.status === "Pending").length,
      inProgress: complaints.filter((c) => c.status === "In Progress").length,
      resolved: complaints.filter((c) => c.status === "Resolved").length,
      categoryBreakdown: {},
    };

    // Count by category
    complaints.forEach((complaint) => {
      stats.categoryBreakdown[complaint.category] = (stats.categoryBreakdown[complaint.category] || 0) + 1;
    });

    res.json(stats);
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Failed to fetch statistics", error: error.message });
  }
});

export default router;
