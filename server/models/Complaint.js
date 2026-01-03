import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Road", "Water", "Garbage", "Drainage", "Electricity", "Others"],
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    wardNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: null,
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
    },
    assignedCouncillor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Councillor",
      default: null,
    },
    remarks: {
      type: String,
      default: null,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    resolutionDate: {
      type: Date,
      default: null,
    },
    attachments: [
      {
        url: String,
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create index for ward number for efficient querying
ComplaintSchema.index({ wardNumber: 1 });
ComplaintSchema.index({ reportedBy: 1 });
ComplaintSchema.index({ assignedCouncillor: 1 });

export default mongoose.model("Complaint", ComplaintSchema);
