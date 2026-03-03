@echo off
REM Script de configuración inicial del proyecto para Windows

echo.
echo ================================================
echo    Dentist Agenda - Setup Inicial (Windows)
echo ================================================
echo.

REM Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no esta instalado
    echo Descargalo desde: https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] Node.js %NODE_VERSION% encontrado
)

echo.

REM Instalar Backend
echo Instalando Backend...
cd Backend
call npm install
if errorlevel 1 (
    echo [ERROR] No se pudo instalar Backend
    pause
    exit /b 1
) else (
    echo [OK] Backend instalado correctamente
)
cd ..

echo.

REM Instalar Frontend
echo Instalando Frontend...
cd Frontend
call npm install
if errorlevel 1 (
    echo [ERROR] No se pudo instalar Frontend
    pause
    exit /b 1
) else (
    echo [OK] Frontend instalado correctamente
)
cd ..

echo.
echo ================================================
echo [OK] Configuracion inicial completada!
echo ================================================
echo.
echo Pasos siguientes:
echo   1. Configura Backend\.env con tus datos de MySQL
echo   2. Inicia el Backend: cd Backend ^&^& npm run dev
echo   3. Inicia el Frontend: cd Frontend ^&^& npm start
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:4200
echo.
pause
