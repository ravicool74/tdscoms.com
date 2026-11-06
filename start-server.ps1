# TDSCOMS Native Windows Localhost Server
$port = 3000
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  TDSCOMS Localhost Server is running!" -ForegroundColor Green
    Write-Host "  URL: $prefix" -ForegroundColor Yellow
    Write-Host "  Serving from: $PSScriptRoot" -ForegroundColor Gray
    Write-Host "  Keep this window open. Press Ctrl+C to stop." -ForegroundColor White
    Write-Host "==========================================================" -ForegroundColor Cyan
    
    # Open browser automatically
    Start-Process $prefix

    $mime = @{
        ".html" = "text/html; charset=utf-8"
        ".js"   = "text/javascript; charset=utf-8"
        ".css"  = "text/css; charset=utf-8"
        ".json" = "application/json"
        ".png"  = "image/png"
        ".jpg"  = "image/jpeg"
        ".jpeg" = "image/jpeg"
        ".svg"  = "image/svg+xml"
        ".ico"  = "image/x-icon"
    }

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($localPath) -or $localPath -eq '/') {
            $localPath = "index.html"
        }
        $fullPath = Join-Path $PSScriptRoot $localPath

        if (Test-Path $fullPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
            $response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $fallback = Join-Path $PSScriptRoot "404.html"
            if (Test-Path $fallback -PathType Leaf) {
                $response.StatusCode = 200
                $response.ContentType = "text/html; charset=utf-8"
                $bytes = [System.IO.File]::ReadAllBytes($fallback)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
        }
        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Error starting HTTP listener: $_" -ForegroundColor Red
    Write-Host "Opening file directly in browser as fallback..." -ForegroundColor Yellow
    Start-Process (Join-Path $PSScriptRoot "index.html")
} finally {
    if ($listener.IsListening) { $listener.Stop() }
}
