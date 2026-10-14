@echo off
chcp 65001 >nul
echo ==============================================
echo   MapleLand Tracker - Auto Sync to GitHub
echo ==============================================

set GIT_EXE=C:\Users\Karim\AppData\Local\Programs\Git\cmd\git.exe

if not exist "%GIT_EXE%" (
    echo [ERROR] Git not found at %GIT_EXE%
    pause
    exit /b 1
)

cd /d "%~dp0"

echo [1/3] Adding changes...
"%GIT_EXE%" add .

set /p MSG="Enter commit message (or press ENTER for default): "
if "%MSG%"=="" set MSG=Update MapleLand Tracker: %date% %time%

echo [2/3] Committing changes...
"%GIT_EXE%" commit -m "%MSG%"

echo [3/3] Pushing to GitHub...
"%GIT_EXE%" push origin main

if %errorlevel% equ 0 (
    echo.
    echo ==============================================
    echo  [SUCCESS] All changes synced to GitHub!
    echo ==============================================
) else (
    echo.
    echo [NOTE] Push failed. If this is your first push, make sure your remote is configured or run:
    echo        git remote add origin https://github.com/your-username/repo-name.git
)

echo.
pause
