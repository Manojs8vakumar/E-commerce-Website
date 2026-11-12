@echo off
title Just Buy It - Backend [Port 8082]
color 0A
cd /d "%~dp0backend"

echo =====================================================================
echo         JUST BUY IT - SPRING BOOT 4 BACKEND (PORT 8082)
echo =====================================================================
echo.
echo Starting Spring Boot with Maven Wrapper on port 8082...
echo Database console: http://localhost:8082/h2-console
echo REST API:         http://localhost:8082/api/products
echo.

mvnw.cmd spring-boot:run -DskipTests
pause
