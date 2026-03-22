# 🗄️ Local MongoDB Setup Guide

## Quick Setup for Local Development

Instead of MongoDB Atlas, you can use a local MongoDB instance for development.

---

## 📦 Installation

### macOS (using Homebrew)
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB service
brew services start mongodb-community@7.0

# Verify it's running
mongosh
```

### Linux (Ubuntu/Debian)
```bash
# Import MongoDB public key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Add MongoDB repository
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh
```

### Windows
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer (choose "Complete" installation)
3. Install as a Windows Service
4. MongoDB will start automatically

---

## ⚙️ Configuration

### 1. Update .env.local

```env
# MongoDB (Local)
MONGODB_URI=mongodb://localhost:27017/helio-aegis
```

### 2. Verify Connection

```bash
# Connect to MongoDB shell
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/...
# Using MongoDB: 7.0.x
```

---

## 🚀 Usage

### Start MongoDB (if not running)

**macOS:**
```bash
brew services start mongodb-community@7.0
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
MongoDB runs as a service automatically

### Stop MongoDB

**macOS:**
```bash
brew services stop mongodb-community@7.0
```

**Linux:**
```bash
sudo systemctl stop mongod
```

**Windows:**
```bash
net stop MongoDB
```

---

## 🔍 MongoDB Shell Commands

```bash
# Connect to MongoDB
mongosh

# Show databases
show dbs

# Use helio-aegis database
use helio-aegis

# Show collections
show collections

# View users
db.users.find().pretty()

# View homepage
db.homepages.find().pretty()

# View projects
db.projects.find().pretty()

# Count documents
db.projects.countDocuments()

# Drop database (careful!)
db.dropDatabase()
```

---

## 🛠️ MongoDB Compass (GUI)

Download MongoDB Compass for a visual interface:
https://www.mongodb.com/try/download/compass

**Connection String:**
```
mongodb://localhost:27017
```

---

## 📊 Advantages of Local MongoDB

✅ **Free** - No cost for development
✅ **Fast** - No network latency
✅ **Offline** - Works without internet
✅ **Privacy** - Data stays on your machine
✅ **Easy Reset** - Drop database anytime

---

## ⚠️ Important Notes

### Data Persistence
Local MongoDB data is stored in:
- **macOS/Linux:** `/usr/local/var/mongodb`
- **Windows:** `C:\Program Files\MongoDB\Server\7.0\data`

### Backup
```bash
# Backup database
mongodump --db helio-aegis --out ./backup

# Restore database
mongorestore --db helio-aegis ./backup/helio-aegis
```

### Reset Database
```bash
# Drop and reseed
mongosh helio-aegis --eval "db.dropDatabase()"
npm run seed
```

---

## 🔄 Switching to MongoDB Atlas Later

When ready for production:

1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/helio-aegis
   ```
5. Run seed script again
6. Deploy to Vercel with Atlas connection string

---

## 🐛 Troubleshooting

### "Connection refused"
```bash
# Check if MongoDB is running
brew services list  # macOS
sudo systemctl status mongod  # Linux
```

### "Command not found: mongosh"
```bash
# Install MongoDB Shell
brew install mongosh  # macOS
```

### Port 27017 already in use
```bash
# Find process using port
lsof -i :27017

# Kill process
kill -9 <PID>
```

---

## ✅ Quick Test

```bash
# 1. Start MongoDB
brew services start mongodb-community@7.0

# 2. Verify connection
mongosh

# 3. Exit shell
exit

# 4. Run seed script
npm run seed

# 5. Start dev server
npm run dev

# 6. Login at http://localhost:3000/admin/login
```

---

**Local MongoDB is now configured!** 🎉

Continue with `CMS_QUICKSTART.md` for the rest of the setup.
