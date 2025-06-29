# AKIOS Grant Navigator - Startup Scripts

This directory contains startup scripts to easily launch your full-stack AKIOS Grant Navigator application.

## 🚀 Quick Start

### Windows Users
```bash
# Start both backend and frontend (recommended)
start-akios-windows.bat

# Or start only the backend
start-backend-windows.bat
```

### Mac/Linux Users
```bash
# Make the script executable (first time only)
chmod +x start-akios-unix.sh

# Start both backend and frontend (recommended)
./start-akios-unix.sh

# Or start only the backend
cd backend
python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

## 📋 What These Scripts Do

### Full Stack Scripts (`start-akios-*.bat/sh`)
1. **Check Prerequisites**: Verify Python and Node.js are installed
2. **Install Dependencies**: Install Python packages from `backend/requirements.txt`
3. **Start Backend**: Launch FastAPI server on `http://localhost:8000`
4. **Start Frontend**: Launch React dev server (usually on `http://localhost:5173`)
5. **Open Terminals**: Each service runs in its own terminal window

### Backend Only Scripts (`start-backend-windows.bat`)
- Only starts the FastAPI backend server
- Useful for development or when you only need the API

## 🌐 Access Points

Once running, you can access:

- **Frontend Application**: `http://localhost:5173` (or check terminal for exact URL)
- **Backend API**: `http://localhost:8000`
- **API Documentation**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/api/health`

## 🔧 Prerequisites

### Required Software
- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Git** (for cloning the repository)

### Required Files
- `backend/main.py` - FastAPI application
- `backend/requirements.txt` - Python dependencies
- `package.json` - Node.js dependencies

## 🛠️ Troubleshooting

### Common Issues

**"Python is not installed or not in PATH"**
- Install Python from [python.org](https://python.org)
- Make sure to check "Add Python to PATH" during installation

**"backend/main.py not found"**
- Run the script from the project root directory (where `package.json` is located)

**"Port 8000 is already in use"**
- Kill existing Python processes: `taskkill /F /IM python.exe` (Windows)
- Or use a different port: `--port 8001`

**"npm run dev fails"**
- Install Node.js dependencies: `npm install`
- Make sure you're in the project root directory

### Manual Startup (if scripts fail)

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

**Frontend:**
```bash
npm install
npm run dev
```

## 📝 Script Features

- ✅ **Error Checking**: Validates prerequisites and file locations
- ✅ **Dependency Management**: Automatically installs Python packages
- ✅ **Multi-Terminal**: Each service runs in its own window
- ✅ **Cross-Platform**: Works on Windows, Mac, and Linux
- ✅ **Clean Shutdown**: Proper cleanup on script termination (Unix)

## 🎯 Next Steps

1. Run the startup script
2. Wait for both services to start
3. Open your browser to the frontend URL
4. Test the application by searching for grants
5. Check the API docs at `http://localhost:8000/docs`

Your AKIOS Grant Navigator should now be fully operational! 🎉 