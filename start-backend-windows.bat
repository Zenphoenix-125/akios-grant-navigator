@echo off
echo ========================================
echo   AKIOS Backend Startup Script
echo ========================================
echo.

:: Check if we're in the right directory
if not exist "backend\main.py" (
    echo ERROR: backend\main.py not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo [1/3] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH!
    echo Please install Python 3.8+ and try again.
    pause
    exit /b 1
)

echo [2/3] Installing/updating Python dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies!
    pause
    exit /b 1
)

echo [3/3] Starting FastAPI backend server...
echo.
echo Backend will be available at: http://localhost:8000
echo API docs will be available at: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload 