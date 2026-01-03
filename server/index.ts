// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { handleDemo } from "./routes/demo";
// import { connectDB } from "./db.js";
// import citizenAuthRoutes from "./routes/citizenAuthRoutes.js";
// import councillorAuthRoutes from "./routes/councillorAuthRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js";
// import { authenticateUser } from "./middleware/authMiddleware.js";

// let dbConnected = false;

// async function initializeDB() {
//   if (!dbConnected) {
//     try {
//       await connectDB();
//       dbConnected = true;
//       console.log("Database initialized");
//     } catch (error) {
//       console.error("Failed to connect to database:", error);
//     }
//   }
// }

// export function createServer() {
//   const app = express();

//   // Middleware
//   app.use(cors());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Initialize database on startup
//   initializeDB();

//   // Example API routes
//   app.get("/api/ping", (_req, res) => {
//     const ping = process.env.PING_MESSAGE ?? "ping";
//     res.json({ message: ping });
//   });

//   app.get("/api/demo", handleDemo);

//   // Citizen authentication routes
//   app.use("/api/citizen", citizenAuthRoutes);

//   // Councillor authentication routes
//   app.use("/api/councillor", councillorAuthRoutes);

//   // Complaint routes (requires authentication)
//   app.use("/api/complaints", authenticateUser, complaintRoutes);

//   // Health check endpoint
//   app.get("/api/health", (req, res) => {
//     res.json({
//       status: "ok",
//       dbConnected,
//       timestamp: new Date().toISOString(),
//     });
//   });

//   return app;
// }
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

import citizenAuthRoutes from "./routes/citizenAuthRoutes.js";
import councillorAuthRoutes from "./routes/councillorAuthRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/citizen", citizenAuthRoutes);
app.use("/api/councillor", councillorAuthRoutes);
app.use("/api/complaints", complaintRoutes);

// Health check
app.get("/", (_req, res) => {
  res.send("✅ Fix My Ward Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
