@echo off
title Just Buy It - Frontend [Port 5173]
color 0B
cd /d "%~dp0frontend"

echo =====================================================================
echo         JUST BUY IT - REACT 19 + VITE FRONTEND (PORT 5173)
echo =====================================================================
echo.
if not exist "node_modules" (
    echo [INFO] First time run detected: installing npm packages...
    call npm.cmd install
)

echo Starting Vite dev server...
echo Storefront URL: http://localhost:5173
echo.

call npm.cmd run dev
pause
