# Fix My Ward: Community Problem Tracker - Setup Guide

## 📋 Project Overview

Fix My Ward is a full-stack web application that enables citizens to report civic issues (pothole, water, garbage, etc.) and allows ward councillors to manage and resolve these complaints efficiently.

## 🏗️ Project Structure

```
fix-my-ward/
├── client/                 # Frontend (React + Vite + Tailwind)
│   ├── pages/
│   │   ├── Index.tsx              # Homepage
│   │   ├── CitizenSignup.tsx       # Citizen signup page
│   │   ├── CitizenLogin.tsx        # Citizen login page
│   │   ├── CouncillorLogin.tsx     # Councillor login (no signup)
│   │   ├── CitizenDashboard.tsx    # Citizen dashboard
│   │   ├── CouncillorDashboard.tsx # Councillor dashboard
│   │   └── SubmitComplaint.tsx     # Report issue form
│   ├── components/         # Reusable UI components
│   ├── App.tsx            # Main app with routing
│   └── global.css         # Global styles and variables
│
├── server/                 # Backend (Node.js + Express)
│   ├── models/
│   │   ├── Citizen.js              # Citizen schema
│   │   ├── Councillor.js           # Councillor schema
│   │   └── Complaint.js            # Complaint schema
│   ├── routes/
│   │   ├── citizenAuthRoutes.js    # Citizen login/signup
│   │   ├── councillorAuthRoutes.js # Councillor login only
│   │   └── complaintRoutes.js      # Complaint CRUD
│   ├── middleware/
│   │   └── authMiddleware.js       # Authentication & authorization
│   ├── seed/
│   │   └── councillorSeed.js       # Seed councillors to DB
│   ├── db.js              # MongoDB connection
│   └── index.ts           # Main server file
│
├── .env.example           # Environment variables template
├── package.json           # Dependencies
└── SETUP_GUIDE.md        # This file
```

## 🛠️ Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: Local or Atlas (cloud) instance
- **npm** or **pnpm**: Package manager

## 📦 Installation Steps

### 1. Clone and Install Dependencies

```bash
# Install all dependencies
npm install
# or
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and configure:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/fix-my-ward

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fix-my-ward

# JWT Secret (change to a strong random string)
JWT_SECRET=your-super-secret-key-12345

# Server Configuration
PORT=3000
NODE_ENV=development
PING_MESSAGE=pong
```

### 3. Set Up MongoDB

#### Option A: Local MongoDB

```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string and add to `.env`

### 4. Seed Councillor Accounts

Before using the application, seed the database with sample councillor accounts:

```bash
npm run seed:councillors
```

This will create 5 sample councillors:

| Email | Password | Ward | City |
|-------|----------|------|------|
| rajesh.ward1@municipal.gov | SecurePass123! | Ward 1 | Mumbai |
| priya.ward2@municipal.gov | SecurePass456! | Ward 2 | Mumbai |
| amit.ward3@municipal.gov | SecurePass789! | Ward 3 | Mumbai |
| neha.ward4@municipal.gov | SecurePass012! | Ward 4 | Mumbai |
| vikram.ward5@municipal.gov | SecurePass345! | Ward 5 | Mumbai |

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## 🚀 Usage

### As a Citizen

1. Visit the homepage
2. Click "Sign up" to create an account
3. Provide: Name, Email, Password, Ward Number (optional)
4. Log in with your credentials
5. Click "Report Issue" to submit a complaint
6. Track your complaints on the dashboard
7. Monitor status updates from councillors

### As a Ward Councillor

1. Visit the homepage
2. Click "Councillor Login"
3. Use pre-existing credentials (from seed data)
4. Access the councillor dashboard
5. View all complaints in your assigned ward
6. Update complaint status (Pending → In Progress → Resolved)
7. Add remarks and resolution details
8. View ward statistics

## 🔐 Security Features

✅ **Password Hashing**: Bcrypt for secure password storage
✅ **JWT Authentication**: Token-based API authentication
✅ **Role-Based Access**: Separate access for citizens and councillors
✅ **No Councillor Signup**: Only pre-authorized councillors via database
✅ **Ward Isolation**: Councillors can only see complaints for their ward

## 📝 Database Schema

### Citizen Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  wardNumber: String,
  phoneNumber: String,
  address: String,
  city: String,
  role: "citizen",
  createdAt: Date,
  updatedAt: Date
}
```

### Councillor Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  wardNumber: String (unique),
  city: String,
  phoneNumber: String,
  role: "councillor",
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaint Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: "Road" | "Water" | "Garbage" | "Drainage" | "Electricity" | "Others",
  imageUrl: String,
  wardNumber: String,
  location: String,
  latitude: Number,
  longitude: Number,
  status: "Pending" | "In Progress" | "Resolved",
  reportedBy: ObjectId (ref: Citizen),
  assignedCouncillor: ObjectId (ref: Councillor),
  remarks: String,
  priority: "Low" | "Medium" | "High",
  resolutionDate: Date,
  attachments: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Citizen Authentication

- `POST /api/citizen/signup` - Register new citizen
- `POST /api/citizen/login` - Citizen login
- `GET /api/citizen/profile` - Get citizen profile (requires auth)

### Councillor Authentication

- `POST /api/councillor/login` - Councillor login only
- `GET /api/councillor/profile` - Get councillor profile (requires auth)
- ❌ NO signup endpoint for councillors

### Complaints

- `POST /api/complaints/create` - Create complaint (citizen only)
- `GET /api/complaints/my-complaints` - Get citizen's complaints
- `GET /api/complaints/ward-complaints` - Get ward's complaints (councillor only)
- `GET /api/complaints/:id` - Get complaint details
- `PUT /api/complaints/:id/update-status` - Update status & remarks (councillor only)
- `GET /api/complaints/stats/ward-stats` - Get ward statistics (councillor only)

## 🧪 Testing the Application

### Test Citizen Flow

1. Sign up: Provide name, email, password, ward
2. Log in with created credentials
3. Submit a complaint with photo
4. View complaint on dashboard

### Test Councillor Flow

1. Log in with seed credentials (e.g., rajesh.ward1@municipal.gov / SecurePass123!)
2. View complaints for your ward
3. Update complaint status to "In Progress"
4. Add remarks and mark as "Resolved"
5. Check ward statistics

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED
```

**Solution**: Ensure MongoDB is running
```bash
# Check if mongod is running
mongod --version

# Start MongoDB
mongod
```

### "Invalid token" Error

**Solution**: The JWT_SECRET might have changed. Log in again to get a new token.

### Councillor "Login Failed"

**Solution**: Use exact credentials from seed output. Check:
- Email is lowercase
- Password is case-sensitive
- Email exists in database

```bash
# Re-run seed if needed
npm run seed:councillors
```

## 📦 Adding New Councillors

To add more councillors:

1. Edit `server/seed/councillorSeed.js`
2. Add entries to `sampleCouncillors` array
3. Run: `npm run seed:councillors`

Example:
```javascript
{
  name: "New Councillor Name",
  email: "newemail@municipal.gov",
  password: "NewPassword123!",
  wardNumber: "Ward 6",
  city: "Mumbai",
  phoneNumber: "+91-9876543215",
}
```

## 🎨 Customization

### Change Primary Color

Edit `client/global.css`:
```css
--primary: 262.1 80% 50.6%;  /* Change these HSL values */
```

### Change City/Ward Info

Edit `server/seed/councillorSeed.js`:
```javascript
city: "YourCity",  // Change city
wardNumber: "Ward X",  // Change ward naming
```

### Update Brand Name

Edit `client/pages/Index.tsx` and search for "Fix My Ward" to change it.

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)

## 🤝 Contributing

This is a college project. Feel free to extend and customize it for your use case.

## 📄 License

This project is provided as-is for educational purposes.

---

**Happy coding! 🚀**

For issues or questions, refer to the code comments or reach out to your team lead.
