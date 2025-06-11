@echo off
SETLOCAL EnableDelayedExpansion

echo [START] Ngrok tunnels worden gestart...

REM Ga naar de map van dit script
cd /d %~dp0

REM Controleer of .env aanwezig is
IF NOT EXIST .env (
    echo [FOUT] .env bestand ontbreekt in /tunnel
    echo -> Maak een kopie van .env.example en vul je NGROK_AUTHTOKEN in.
    pause
    exit /b 1
)

REM Lees NGROK_AUTHTOKEN uit .env
FOR /F "usebackq delims=" %%A IN (".env") DO (
    SET "line=%%A"
    echo !line! | findstr /B "NGROK_AUTHTOKEN=" >nul
    IF !errorlevel! == 0 (
        SET !line!
    )
)

IF NOT DEFINED NGROK_AUTHTOKEN (
    echo [FOUT] Geen geldige NGROK_AUTHTOKEN gevonden in .env
    pause
    exit /b 1
)

REM Start ngrok met config (frontend + backend)
echo [AUTH] Token gevonden. Ngrok wordt gestart...
start "" cmd /k "ngrok start --all --config=ngrok-config.yml"

REM Wacht even tot tunnels actief zijn
echo [WACHTEN] Even wachten op ngrok tunnels...
timeout /t 3 >nul

REM Haal de backend tunnel URL op (localhost:8000)
FOR /F "delims=" %%A IN ('powershell -Command "(Invoke-RestMethod http://localhost:4040/api/tunnels).tunnels | Where-Object { $_.config.addr -match '8000' } | Select-Object -ExpandProperty public_url"') DO (
    SET "NGROK_BACKEND_URL=%%A"
)

IF NOT DEFINED NGROK_BACKEND_URL (
    echo [FOUT] Kan backend URL niet ophalen via ngrok API.
    pause
    exit /b 1
)

echo [INFO] Backend URL gevonden: !NGROK_BACKEND_URL!

REM Paden naar .env bestanden
SET "ENV_LOCAL=..\frontend\.env.local"
SET "ENV_PROD=..\frontend\.env.production"

REM Functie: Vervang of maak VITE_API_URL in opgegeven bestand
CALL :UpdateEnvFile "!ENV_LOCAL!"
CALL :UpdateEnvFile "!ENV_PROD!"

pause
exit /b 0

:UpdateEnvFile
SET "FILE=%~1"
IF EXIST "!FILE!" (
    echo [BEWERKEN] Bewerken van: !FILE!
    powershell -Command "(Get-Content '!FILE!') -replace '^VITE_API_URL=.*$', 'VITE_API_URL=!NGROK_BACKEND_URL!/api' | Set-Content '!FILE!'"
    echo [OK] Bijgewerkt: !FILE!
) ELSE (
    echo [MAKEN] Bestand niet gevonden, aanmaken: !FILE!
    echo VITE_API_URL=!NGROK_BACKEND_URL!/api > "!FILE!"
    echo [OK] Aangemaakt: !FILE!
)
GOTO :EOF
