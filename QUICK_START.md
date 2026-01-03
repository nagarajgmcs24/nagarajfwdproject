# Fix My Ward - Quick Start Guide

## ⚡ 30-Second Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env and add your MongoDB URI (local or cloud)
```

### 3. Seed Councillors
```bash
npm run seed:councillors
```

### 4. Start Development
```bash
npm run dev
```

Visit: http://localhost:5173

---

## 🎯 Quick Test

### Test as Citizen
1. Homepage → "Sign Up" → Create account
2. Log in with your credentials
3. Click "Report Issue" to submit a complaint
4. View on dashboard

### Test as Councillor
1. Homepage → "Councillor Login"
2. Use these credentials:
   - Email: `rajesh.ward1@municipal.gov`
   - Password: `SecurePass123!`
3. View complaints in your ward
4. Update status and add remarks

---

## 📦 MongoDB Setup (Choose One)

### Option A: Local MongoDB
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Download from mongodb.com and follow installer

# In .env:
MONGODB_URI=mongodb://localhost:27017/fix-my-ward
```

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account & cluster
3. Get connection string
4. In `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fix-my-ward
```

---

## 🚀 API Testing

### Create Complaint (Citizen)
```bash
curl -X POST http://localhost:3000/api/complaints/create \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_JWT_TOKEN" \
  -d '{
    "title": "Pothole on Main Street",
    "description": "Large pothole near the market",
    "category": "Road",
    "wardNumber": "Ward 1",
    "location": "Main Street, Market Area"
  }'
```

### Get Ward Complaints (Councillor)
```bash
curl -X GET http://localhost:3000/api/complaints/ward-complaints \
  -H "Authorization: YOUR_JWT_TOKEN"
```

### Update Complaint (Councillor)
```bash
curl -X PUT http://localhost:3000/api/complaints/COMPLAINT_ID/update-status \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_JWT_TOKEN" \
  -d '{
    "status": "In Progress",
    "remarks": "Work started on fixing the pothole",
    "priority": "High"
  }'
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `client/pages/Index.tsx` | Beautiful homepage |
| `client/pages/CitizenSignup.tsx` | Citizen registration |
| `client/pages/CouncillorLogin.tsx` | Councillor login (no signup!) |
| `server/models/Citizen.js` | Citizen database schema |
| `server/models/Councillor.js` | Councillor database schema |
| `server/models/Complaint.js` | Complaint database schema |
| `server/routes/citizenAuthRoutes.js` | Citizen auth APIs |
| `server/routes/councillorAuthRoutes.js` | Councillor auth APIs |
| `server/routes/complaintRoutes.js` | Complaint management APIs |
| `server/seed/councillorSeed.js` | Pre-load sample councillors |

---

## 🔐 Pre-Seeded Councillors

After running `npm run seed:councillors`, you can log in as:

```
Ward 1: rajesh.ward1@municipal.gov / SecurePass123!
Ward 2: priya.ward2@municipal.gov / SecurePass456!
Ward 3: amit.ward3@municipal.gov / SecurePass789!
Ward 4: neha.ward4@municipal.gov / SecurePass012!
Ward 5: vikram.ward5@municipal.gov / SecurePass345!
```

---

## 🎨 Customization

### Change Primary Color
Edit `client/global.css`, line 18:
```css
--primary: 262.1 80% 50.6%;  /* Change HSL values */
```

### Add More Councillors
Edit `server/seed/councillorSeed.js` and add to `sampleCouncillors` array, then run:
```bash
npm run seed:councillors
```

### Change Port
Edit `.env`:
```
PORT=8000
```

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module 'mongoose'" | Run `npm install` |
| MongoDB connection error | Check if `mongod` is running |
| "Invalid token" on API call | Log in again to get new JWT |
| Councillor login fails | Check exact email/password (case-sensitive) |
| Port already in use | Change PORT in `.env` |

---

## 📚 What Was Built

### Frontend (React + Vite + Tailwind)
- ✅ Modern homepage with features & CTA
- ✅ Citizen signup/login pages
- ✅ Councillor login only (NO signup)
- ✅ Dashboards for both user types
- ✅ Complaint submission form
- ✅ Beautiful color scheme (purple primary)

### Backend (Node.js + Express)
- ✅ JWT authentication system
- ✅ Separate routes for citizens & councillors
- ✅ Complaint CRUD operations
- ✅ Ward-based access control
- ✅ Password hashing with bcrypt
- ✅ MongoDB models & schemas

### Database (MongoDB)
- ✅ Citizen collection
- ✅ Councillor collection (pre-seeded)
- ✅ Complaint collection with indexing

---

## 🚀 Deployment Checklist

- [ ] Change `JWT_SECRET` in `.env` to random string
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas for cloud database
- [ ] Build frontend: `npm run build:client`
- [ ] Build backend: `npm run build:server`
- [ ] Deploy to Netlify/Vercel/Heroku
- [ ] Update API endpoints if needed
- [ ] Seed councillors in production DB

---

## 📞 Support

Refer to `SETUP_GUIDE.md` for detailed instructions or contact your team.

---

**Happy coding! 🎉**
