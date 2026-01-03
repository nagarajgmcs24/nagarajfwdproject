import mongoose from "mongoose";
import Councillor from "../models/Councillor.js";
import { connectDB } from "../db.js";
import bcrypt from "bcrypt";

// Sample councillor data - one per ward
const sampleCouncillors = [
  {
    name: "Rajesh Kumar",
    email: "rajesh.ward1@municipal.gov",
    password: "SecurePass123!", // Will be hashed
    wardNumber: "Ward 1",
    city: "Mumbai",
    phoneNumber: "+91-9876543210",
  },
  {
    name: "Priya Sharma",
    email: "priya.ward2@municipal.gov",
    password: "SecurePass456!", // Will be hashed
    wardNumber: "Ward 2",
    city: "Mumbai",
    phoneNumber: "+91-9876543211",
  },
  {
    name: "Amit Patel",
    email: "amit.ward3@municipal.gov",
    password: "SecurePass789!", // Will be hashed
    wardNumber: "Ward 3",
    city: "Mumbai",
    phoneNumber: "+91-9876543212",
  },
  {
    name: "Neha Gupta",
    email: "neha.ward4@municipal.gov",
    password: "SecurePass012!", // Will be hashed
    wardNumber: "Ward 4",
    city: "Mumbai",
    phoneNumber: "+91-9876543213",
  },
  {
    name: "Vikram Singh",
    email: "vikram.ward5@municipal.gov",
    password: "SecurePass345!", // Will be hashed
    wardNumber: "Ward 5",
    city: "Mumbai",
    phoneNumber: "+91-9876543214",
  },
];

async function seedCouncillors() {
  try {
    await connectDB();

    // Clear existing councillors (optional - comment out to preserve existing data)
    // await Councillor.deleteMany({});

    console.log("🌱 Seeding councillors...");

    for (const councillorData of sampleCouncillors) {
      // Check if councillor already exists
      const existingCouncillor = await Councillor.findOne({
        email: councillorData.email,
      });

      if (existingCouncillor) {
        console.log(
          `⏭️  Councillor ${councillorData.email} already exists. Skipping...`,
        );
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(councillorData.password, salt);

      const councillor = new Councillor({
        ...councillorData,
        password: hashedPassword,
        role: "councillor",
        isActive: true,
      });

      await councillor.save();
      console.log(
        `✅ Created councillor: ${councillorData.name} (${councillorData.wardNumber})`,
      );
    }

    console.log("\n🎉 Councillor seeding completed!");
    console.log("\n📋 Sample Login Credentials:");
    console.log("----------------------------------------");
    sampleCouncillors.forEach((councillor) => {
      console.log(`Email: ${councillor.email}`);
      console.log(`Password: ${councillor.password}`);
      console.log(`Ward: ${councillor.wardNumber}`);
      console.log("----------------------------------------");
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seedCouncillors();
