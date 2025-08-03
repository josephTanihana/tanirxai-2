@echo off
title AI Code Assistant - Starting...
echo.
echo ========================================
echo    AI Code Assistant - 100,000+ Languages
echo ========================================
echo.
echo Starting AI Code Assistant...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    echo.
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "index.html" (
    echo ERROR: index.html not found
    echo Please run this script from the AI-Code-Assistant-Website directory
    echo.
    pause
    exit /b 1
)

echo Python found. Starting server...
echo.
echo The AI Code Assistant will be available at:
echo http://localhost:8000
echo.
echo Mobile version: http://localhost:8000/mobile-app.html
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the Python HTTP server
python -m http.server 8000

echo.
echo Server stopped.
pause 