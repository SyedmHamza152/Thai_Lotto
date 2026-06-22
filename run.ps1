# Start backend and open the app home page (index.html) in your default browser
$root = $PSScriptRoot
$backend = Join-Path $root "backend"
$python = Join-Path $backend ".venv\Scripts\python.exe"

if (-not (Test-Path $python)) {
    Write-Host "Virtual env not found. Run once:"
    Write-Host "  cd backend"
    Write-Host "  python -m venv .venv"
    Write-Host "  .\.venv\Scripts\python.exe -m pip install -r requirements.txt"
    exit 1
}

Set-Location $backend
& $python run_dev.py
