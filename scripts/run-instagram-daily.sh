#!/bin/sh
set -eu

app_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$app_dir"
mkdir -p var

node_binary=${NODE_BINARY:-node}
exec flock -n var/instagram-sync.lock "$node_binary" scripts/sync-instagram.mjs
