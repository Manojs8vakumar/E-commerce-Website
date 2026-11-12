#!/usr/bin/env bash
# Just Buy It - Full-Stack Runner for Bash / Git Bash / macOS / Linux

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "====================================================================="
echo "          JUST BUY IT (JBI) - FULL-STACK RUNNER FOR VS CODE          "
echo "====================================================================="

# Check Java
if ! command -v java &> /dev/null; then
    echo "[ERROR] Java is not installed or not in your PATH! Please install Java 21."
    exit 1
fi

# Check Node
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in your PATH! Please install Node.js."
    exit 1
fi

# Frontend node_modules check
if [ ! -d "$ROOT_DIR/frontend/node_modules" ]; then
    echo "[INFO] Installing frontend dependencies..."
    (cd "$ROOT_DIR/frontend" && npm install)
fi

echo "[1/2] Starting Spring Boot Backend on Port 8082..."
(cd "$ROOT_DIR/backend" && (./mvnw spring-boot:run -DskipTests || ./mvnw.cmd spring-boot:run -DskipTests)) &
BACKEND_PID=$!

echo "[2/2] Starting React Vite Frontend on Port 5173..."
(cd "$ROOT_DIR/frontend" && npm run dev) &
FRONTEND_PID=$!

echo ""
echo "====================================================================="
echo "  [SUCCESS] Both servers running in background!"
echo "  * Frontend: http://localhost:5173"
echo "  * Backend:  http://localhost:8082/api"
echo "====================================================================="

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM
wait
