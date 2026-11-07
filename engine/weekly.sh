#!/usr/bin/env bash
# Build, publish and queue one week of SurahLink TikTok slideshows.
# Usage: engine/weekly.sh <week-label>    e.g. engine/weekly.sh week-2026-11-16
set -euo pipefail
WEEK="$1"
cd "$(dirname "$0")"
[ -d node_modules/quran-json ] || npm install --silent
node build.js "$WEEK" --verify-only        # fails loudly if any Arabic/translation doesn't match the dataset
node build.js "$WEEK"
cd ..
git add -A
git -c user.name="SurahLink Bot" -c user.email="szia-lang@users.noreply.github.com" commit -qm "Week $WEEK: build TikTok slideshows"
git push
echo "Waiting 11 minutes for GitHub Pages to publish..."
sleep 660
cd engine
NODE_NO_WARNINGS=1 NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node queue.js "$WEEK"
cd .. && git add -A && git -c user.name="SurahLink Bot" -c user.email="szia-lang@users.noreply.github.com" commit -qm "Week $WEEK: queued in Buffer" && git push || true
