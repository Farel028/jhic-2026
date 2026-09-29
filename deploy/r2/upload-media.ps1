param(
  [string]$Bucket = "jhic-assets"
)

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\.."))
$publicRoot = Join-Path $projectRoot "public"
$mediaRoots = @(
  (Join-Path $publicRoot "panda\idle"),
  (Join-Path $publicRoot "tours")
)

foreach ($mediaRoot in $mediaRoots) {
  Get-ChildItem -LiteralPath $mediaRoot -File -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Substring($publicRoot.Length).TrimStart("\", "/").Replace("\", "/")
    $contentType = switch ($_.Extension.ToLowerInvariant()) {
      ".webm" { "video/webm"; break }
      ".jpg" { "image/jpeg"; break }
      ".jpeg" { "image/jpeg"; break }
      default { "application/octet-stream" }
    }

    Write-Host "Upload $relativePath"
    & npx.cmd --yes wrangler@latest r2 object put "$Bucket/$relativePath" --file $_.FullName --content-type $contentType --cache-control "public, max-age=31536000, immutable"
    if ($LASTEXITCODE -ne 0) {
      throw "Upload gagal: $relativePath"
    }
  }
}
