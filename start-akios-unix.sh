#!/bin/bash

echo "========================================"
echo "  AKIOS Grant Navigator Startup Script"
echo "========================================"
echo

# Check if we're in the right directory
if [ ! -f "backend/main.py" ]; then
    echo "ERROR: backend/main.py not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Check if we're in the right directory for frontend
if [ ! -f "package.json" ]; then
    echo "ERROR: package.json not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "[1/4] Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed or not in PATH!"
    echo "Please install Python 3.8+ and try again."
    exit 1
fi

echo "[2/4] Installing/updating Python dependencies..."
cd backend
pip3 install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Python dependencies!"
    exit 1
fi
cd ..

echo "[3/4] Starting FastAPI backend server..."
echo "Backend will be available at: http://localhost:8000"
echo "API docs will be available at: http://localhost:8000/docs"
echo

# Detect the OS and open appropriate terminal
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "Starting backend in new terminal (macOS)..."
    osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'/backend\" && python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"'
elif command -v gnome-terminal &> /dev/null; then
    # Linux with GNOME
    echo "Starting backend in new terminal (GNOME)..."
    gnome-terminal -- bash -c "cd '$(pwd)/backend' && python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload; exec bash"
elif command -v konsole &> /dev/null; then
    # Linux with KDE
    echo "Starting backend in new terminal (KDE)..."
    konsole --new-tab -e bash -c "cd '$(pwd)/backend' && python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload; exec bash"
else
    # Fallback - run in background
    echo "Starting backend in background..."
    cd backend
    python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload &
    cd ..
fi

# Wait a moment for the backend to start
sleep 3

echo "[4/4] Starting React frontend..."
echo "Frontend will be available at: http://localhost:5173 (or similar)"
echo

# Start frontend in new terminal
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "Starting frontend in new terminal (macOS)..."
    osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npm run dev"'
elif command -v gnome-terminal &> /dev/null; then
    # Linux with GNOME
    echo "Starting frontend in new terminal (GNOME)..."
    gnome-terminal -- bash -c "cd '$(pwd)' && npm run dev; exec bash"
elif command -v konsole &> /dev/null; then
    # Linux with KDE
    echo "Starting frontend in new terminal (KDE)..."
    konsole --new-tab -e bash -c "cd '$(pwd)' && npm run dev; exec bash"
else
    # Fallback - run in background
    echo "Starting frontend in background..."
    npm run dev &
fi

echo
echo "========================================"
echo "  AKIOS Grant Navigator is starting!"
echo "========================================"
echo
echo "Backend:  http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo "Frontend: http://localhost:5173 (check terminal for exact URL)"
echo
echo "Press Ctrl+C to stop all services..."
echo

# Keep the script running and handle cleanup
trap 'echo "Stopping AKIOS Grant Navigator..."; pkill -f "uvicorn main:app"; pkill -f "npm run dev"; exit 0' INT

# Wait for user to stop
while true; do
    sleep 1
done 