#!/usr/bin/env bash
# Local preview (avoids file:// iframe restrictions in some editors)
cd "$(dirname "$0")"
echo "→ http://localhost:8080"
python3 -m http.server 8080
