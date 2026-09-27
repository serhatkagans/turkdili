@echo off
chcp 65001 >nul
title Kelimeden Hayale - Sunucu
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [HATA] Node.js bulunamadi. https://nodejs.org adresinden Node.js 22 veya ustunu kurun.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Paketler kuruluyor, bu ilk seferde birkac dakika surebilir...
  call npm install
  if errorlevel 1 goto hata
)

if not exist ".env.local" (
  echo [UYARI] .env.local bulunamadi. Gorevli paneli icin ADMIN_USER ve ADMIN_PASSWORD tanimlayin.
  copy /y ".env.example" ".env.local" >nul
)

echo Uygulama derleniyor...
call npm run build
if errorlevel 1 goto hata

echo.
echo Sunucu baslatiliyor: http://localhost:3000
echo Gorevli paneli:      http://localhost:3000/admin
echo Kapatmak icin bu pencereyi kapatin ya da Ctrl+C basin.
echo.
start "" cmd /c "timeout /t 4 >nul & start http://localhost:3000"
call npm start
goto son

:hata
echo.
echo [HATA] Islem basarisiz oldu. Yukaridaki mesajlari kontrol edin.
:son
pause
