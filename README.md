# 📌 Fix My Ward: Community Problem Tracker

A full-stack web application empowering citizens to report civic issues and enabling ward councillors to manage and resolve complaints efficiently.

**Status**: ✅ **COMPLETE** - Ready to use and customize

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your MongoDB URI

# 3. Seed sample councillors
npm run seed:councillors

# 4. Start development server
npm run dev
```

Visit: **http://localhost:5173**

---

## 🎯 Key Features

### For Citizens
✅ Sign up and create account  
✅ Report issues with photo, description, and category  
✅ Select or auto-detect ward location  
✅ Track complaint status in real-time  
✅ View public complaints in their ward  

### For Ward Councillors
✅ **Login ONLY** (no signup allowed)  
✅ View complaints for assigned ward  
✅ Update complaint status  
✅ Add remarks and resolution details  
✅ View ward statistics and metrics  

---

## 📱 Pages & Routes

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Intro, features, login links |
| Citizen Signup | `/citizen-signup` | Create account |
| Citizen Login | `/citizen-login` | Sign in |
| Councillor Login | `/councillor-login` | **Login only, no signup** |
| Citizen Dashboard | `/citizen-dashboard` | View complaints, report issues |
| Councillor Dashboard | `/councillor-dashboard` | Manage ward complaints |
| Submit Complaint | `/submit-complaint` | Report new issue |

---

## 🔐 Sample Councillor Credentials

After running `npm run seed:councillors`:

```
Ward 1: rajesh.ward1@municipal.gov / SecurePass123!
Ward 2: priya.ward2@municipal.gov / SecurePass456!
Ward 3: amit.ward3@municipal.gov / SecurePass789!
Ward 4: neha.ward4@municipal.gov / SecurePass012!
Ward 5: vikram.ward5@municipal.gov / SecurePass345!
```

---

## 🗄️ Database Models

### Citizen
```
name, email, password, wardNumber, phoneNumber, city
```

### Councillor
```
name, email, password, wardNumber, city, phoneNumber, isActive
```

### Complaint
```
title, description, category, wardNumber, location, imageUrl,
status, reportedBy, assignedCouncillor, remarks, priority
```

---

## 🔌 API Endpoints

### Citizen Auth
- `POST /api/citizen/signup` - Register
- `POST /api/citizen/login` - Login
- `GET /api/citizen/profile` - Get profile

### Councillor Auth
- `POST /api/councillor/login` - Login only
- `GET /api/councillor/profile` - Get profile
- ❌ No signup endpoint

### Complaints
- `POST /api/complaints/create` - Submit complaint
- `GET /api/complaints/my-complaints` - User's complaints
- `GET /api/complaints/ward-complaints` - Ward's complaints
- `GET /api/complaints/:id` - Get details
- `PUT /api/complaints/:id/update-status` - Update status
- `GET /api/complaints/stats/ward-stats` - Ward stats

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express 5 |
| Database | MongoDB |
| Auth | JWT + Bcrypt |
| UI | shadcn/ui components |

---

## 🎨 Design

- **Theme**: Modern purple accent (#A78BFA)
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG compliant
- **Components**: Reusable, well-organized

---

## 📚 Documentation

Read these files for detailed information:

1. **QUICK_START.md** - 30-second setup & testing
2. **SETUP_GUIDE.md** - Comprehensive installation guide
3. **IMPLEMENTATION_CHECKLIST.md** - Step-by-step checklist
4. **PROJECT_SUMMARY.md** - Complete feature list

---

## 🔐 Security Features

✅ **No councillor signup** - Login only with pre-existing credentials  
✅ **Password hashing** - Bcrypt with 10 salt rounds  
✅ **JWT authentication** - Secure token-based access  
✅ **Role-based access** - Separate routes for citizens/councillors  
✅ **Ward isolation** - Councillors see only their ward  
✅ **Input validation** - All inputs validated  

---

## 📂 Project Structure

```
fix-my-ward/
├── client/                 # React frontend
│   ├── pages/             # All page components
│   ├── components/        # Reusable components
│   ├── App.tsx           # Router
│   └── global.css        # Theme
├── server/               # Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── seed/            # Database seeding
│   └── index.ts         # Server setup
├── SETUP_GUIDE.md       # Detailed setup
├── QUICK_START.md       # Quick reference
├── PROJECT_SUMMARY.md   # Features overview
├── .env.example         # Env template
└── package.json         # Dependencies
```

---

## ⚡ Common Commands

```bash
npm run dev                  # Start dev server
npm run build               # Build for production
npm run seed:councillors    # Seed sample data
npm run typecheck          # Check TypeScript
npm run format.fix         # Format code
```

---

## 🧪 Testing

### Test as Citizen
1. Homepage → "Sign Up"
2. Create account
3. Log in
4. View dashboard

### Test as Councillor
1. Homepage → "Councillor Login"
2. Use sample credentials
3. View ward dashboard

---

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build:client
```

### Backend (Heroku/Railway)
```bash
npm run build:server
```

Set environment variables in production:
- `MONGODB_URI`
- `JWT_SECRET` (strong random string)
- `NODE_ENV=production`

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB error | Ensure mongod is running |
| Port conflict | Change PORT in .env |
| Councillor login fails | Check email/password (case-sensitive) |
| Seed script fails | Verify MongoDB connection |
| Module not found | Run `npm install` |

See `SETUP_GUIDE.md` for more help.

---

## 📞 Support

- Read `SETUP_GUIDE.md` for detailed instructions
- Check `QUICK_START.md` for API examples
- Review code comments for implementation details
- Check `IMPLEMENTATION_CHECKLIST.md` for next steps

---

## ✅ What's Included

- ✅ Complete React frontend
- ✅ Full Express backend
- ✅ MongoDB models & seeding
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Responsive design
- ✅ Complete documentation
- ✅ Setup scripts
- ✅ Sample data
- ✅ Error handling

---

## 🎓 College Project Ready

This implementation is suitable for:
- ✅ Clean code structure
- ✅ Proper documentation
- ✅ Complete feature set
- ✅ Security implementation
- ✅ Database design
- ✅ API design
- ✅ Responsive UI
- ✅ Production patterns

---

## 📄 License

This project is provided for educational purposes.

---

## 🎉 Ready to Go!

Everything you need is set up and ready to use. Start with:

```bash
npm run dev
```

**Enjoy building with Fix My Ward!** 🚀

---

*Built with React, Node.js, MongoDB, and Tailwind CSS*  
*Designed for modern, efficient community problem tracking*
