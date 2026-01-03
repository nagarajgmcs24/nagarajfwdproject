import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Generate JWT token
export function generateToken(userId, userType) {
  return jwt.sign({ userId, userType }, JWT_SECRET, { expiresIn: "7d" });
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Middleware to check if user is authenticated
export function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1] || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decoded;
  next();
}

// Middleware to check if user is a citizen
export function isCitizen(req, res, next) {
  if (req.user?.userType !== "citizen") {
    return res.status(403).json({ message: "Access denied. Citizen privileges required." });
  }
  next();
}

// Middleware to check if user is a councillor
export function isCouncillor(req, res, next) {
  if (req.user?.userType !== "councillor") {
    return res.status(403).json({ message: "Access denied. Councillor privileges required." });
  }
  next();
}
