@echo off
title TDSCOMS Localhost Server (E:\TDSCOMS)
cd /d "%~dp0"

echo =================================================================
echo                 TDSCOMS LOCALHOST SERVER
echo               Running on E:\TDSCOMS (Local PC)
echo =================================================================
echo.

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node.js detected.
    echo Starting Node.js server and opening browser at http://localhost:3000/ ...
    start "" http://localhost:3000/
    node server.js
) else (
    echo [INFO] Node.js not found in PATH.
    echo Using Windows built-in PowerShell server on http://localhost:3000/ ...
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
)

pause
