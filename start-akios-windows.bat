@echo off
echo ========================================
echo   AKIOS Grant Navigator Startup Script
echo ========================================
echo.

:: Check if we're in the right directory
if not exist "backend\main.py" (
    echo ERROR: backend\main.py not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

:: Check if we're in the right directory for frontend
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo [1/4] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH!
    echo Please install Python 3.8+ and try again.
    pause
    exit /b 1
)

echo [2/4] Installing/updating Python dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies!
    pause
    exit /b 1
)

echo [3/4] Starting FastAPI backend server...
echo Backend will be available at: http://localhost:8000
echo API docs will be available at: http://localhost:8000/docs
echo.
echo Starting server in background...
start "AKIOS Backend" cmd /k "cd backend && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

:: Wait a moment for the backend to start
timeout /t 3 /nobreak >nul

echo [4/4] Starting React frontend...
echo Frontend will be available at: http://localhost:5173 (or similar)
echo.
echo Starting frontend in new terminal...
start "AKIOS Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   AKIOS Grant Navigator is starting!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo Frontend: http://localhost:5173 (check terminal for exact URL)
echo.
echo Press any key to close this window...
pause >nul 