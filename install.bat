@echo off
REM Installation script for AmulyaAI on Windows

echo.
echo ================================================
echo  AmulyaAI - Next.js SaaS Platform Setup
echo ================================================
echo.

REM Check Node.js installation
echo Checking Node.js installation...
for /f "tokens=*" %%i in ('node --version 2^>nul') do set NODE_VERSION=%%i

if "%NODE_VERSION%"=="" (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from https://nodejs.org
    echo Download LTS version (18.x or higher)
    echo.
    pause
    exit /b 1
) else (
    echo   ✓ Node.js %NODE_VERSION% installed
)

REM Check npm
echo Checking npm installation...
for /f "tokens=*" %%i in ('npm --version 2^>nul') do set NPM_VERSION=%%i
if "%NPM_VERSION%"=="" (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
) else (
    echo   ✓ npm %NPM_VERSION% installed
)

echo.
echo ================================================
echo  Installing dependencies...
echo ================================================
echo.

REM Install dependencies
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo ================================================
echo  Setup Complete!
echo ================================================
echo.
echo Next steps:
echo   1. Create .env.local file (copy from .env.example)
echo   2. Add your API keys to .env.local:
echo      - Supabase URL and API key
echo      - Stripe API keys
echo      - OpenAI API key
echo   3. Run: npm run dev
echo   4. Open http://localhost:3000
echo.
echo For detailed setup instructions, see SETUP_GUIDE.md
echo.
pause
