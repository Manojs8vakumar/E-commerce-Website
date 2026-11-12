@echo off
setlocal
title Just Buy It - Full-Stack Launcher

echo =====================================================================
echo           JUST BUY IT [JBI] - FULL-STACK RUNNER FOR VS CODE
echo =====================================================================
echo.
echo [INFO] Working directory: %~dp0
echo.

REM 1. Check Java installation
where java >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Java is not installed or not in your PATH!
    echo Please install Java 21 LTS - e.g. Eclipse Temurin or Microsoft OpenJDK 21
    pause
    exit /b 1
)

REM 2. Check Node.js installation
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH!
    echo Please install Node.js from https://nodejs.org/ - LTS version recommended
    pause
    exit /b 1
)

REM 3. Check frontend dependencies
if not exist "%~dp0frontend\node_modules" (
    echo [INFO] Installing frontend dependencies - first-time setup...
    cd /d "%~dp0frontend"
    call npm.cmd install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Failed to install frontend dependencies!
        pause
        exit /b 1
    )
    cd /d "%~dp0"
)

echo [1/2] Starting Spring Boot Backend on Port 8082...
start "Just Buy It - Backend [Port 8082]" cmd /k "cd /d "%~dp0backend" && title Just Buy It - Backend [Port 8082] && color 0A && echo Starting Spring Boot 4 on Port 8082... && mvnw.cmd spring-boot:run -DskipTests"

echo [2/2] Starting React Vite Frontend on Port 5173...
start "Just Buy It - Frontend [Port 5173]" cmd /k "cd /d "%~dp0frontend" && title Just Buy It - Frontend [Port 5173] && color 0B && echo Starting Vite Dev Server on Port 5173... && npm.cmd run dev"

echo.
echo =====================================================================
echo   [SUCCESS] Both Backend and Frontend are starting up!
echo =====================================================================
echo   * Frontend URL:      http://localhost:5173
echo   * Backend API:       http://localhost:8082/api
echo   * H2 Database:       http://localhost:8082/h2-console
echo                        [JDBC URL: jdbc:h2:mem:justbuyitdb, User: sa]
echo.
echo   To stop both servers at any time, run: stop-all.bat
echo =====================================================================
echo.
echo Waiting a few seconds for services to initialize...
ping 127.0.0.1 -n 6 >nul 2>&1
start http://localhost:5173
echo.
echo Browser opened at http://localhost:5173.
ping 127.0.0.1 -n 3 >nul 2>&1
exit /b 0
