$ErrorActionPreference = "Stop"

$Port = 8765
$BindAddress = "0.0.0.0"
$LocalHostName = "127.0.0.1"
$Url = "http://${LocalHostName}:${Port}/app/"
$Root = $PSScriptRoot
$ProfileDir = Join-Path $env:LOCALAPPDATA "fertilizer-data-app\profile"

function Test-LocalApp {
  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

function Find-Python {
  $candidates = @(
    "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe",
    "python",
    "py"
  )

  foreach ($candidate in $candidates) {
    try {
      $command = Get-Command $candidate -ErrorAction Stop
      return $command.Source
    } catch {
      if (Test-Path -LiteralPath $candidate) {
        return $candidate
      }
    }
  }

  throw "Python was not found. Install Python or start a local web server manually."
}

function Find-AppBrowser {
  $candidates = @(
    "$env:ProgramFiles(x86)\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
  )

  foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate) {
      return $candidate
    }
  }

  return $null
}

if (-not (Test-LocalApp)) {
  $python = Find-Python
  Start-Process `
    -FilePath $python `
    -ArgumentList @("-m", "http.server", "$Port", "--bind", $BindAddress) `
    -WorkingDirectory $Root `
    -WindowStyle Hidden

  $ready = $false
  for ($i = 0; $i -lt 20; $i += 1) {
    Start-Sleep -Milliseconds 250
    if (Test-LocalApp) {
      $ready = $true
      break
    }
  }

  if (-not $ready) {
    throw "Local app server did not start on $Url"
  }
}

$browser = Find-AppBrowser
if ($browser) {
  Start-Process `
    -FilePath $browser `
    -ArgumentList @("--app=$Url", "--user-data-dir=$ProfileDir", "--window-size=430,860")
} else {
  Start-Process $Url
}

$lanAddress = (ipconfig | Select-String "IPv4 Address|IPv4 アドレス" | ForEach-Object {
  if ($_.Line -match ":\s*([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)") {
    $Matches[1]
  }
} | Where-Object { $_ -notlike "127.*" -and $_ -notlike "172.*" } | Select-Object -First 1)

if ($lanAddress) {
  Write-Host "iPhone Safari URL: http://${lanAddress}:${Port}/app/"
}
