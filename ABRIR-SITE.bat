@echo off
title Portfolio Jose Alves - NAO FECHE esta janela
cd /d "%~dp0"
if not exist node_modules (
  echo Instalando dependencias pela primeira vez...
  call npm install
)
start "" cmd /c "timeout /t 6 >nul & start http://localhost:3000"
call npm run dev
pause
