@echo off
title Just Buy It - Port Cleaner
echo =====================================================================
echo     STOPPING RUNNING JUST BUY IT SERVERS (PORTS 8082 AND 5173)
echo =====================================================================
echo.

REM 1. Stop backend on port 8082
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8082 ^| findstr LISTENING') do (
    echo [INFO] Found backend process PID %%a on port 8082. Terminating...
    taskkill /F /PID %%a >nul 2>&1
)

REM 2. Stop frontend on port 5173
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do (
    echo [INFO] Found frontend process PID %%a on port 5173. Terminating...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo [DONE] Ports 8082 and 5173 are now free.
ping 127.0.0.1 -n 3 >nul 2>&1
exit /b 0
