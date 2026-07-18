#!/bin/zsh
cd "/Users/mrfarinel/Documents/Codex/2026-06-24/create-a-professional-portfolio-website-for" || exit 1

export PATH="/Users/mrfarinel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/mrfarinel/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin:$PATH"

echo "Starting Javier Garcia portfolio preview..."
echo "Open this URL when you see Ready:"
echo "http://127.0.0.1:3006"
echo ""

"/Users/mrfarinel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" \
  "/Users/mrfarinel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pnpm/bin/pnpm.mjs" \
  dev --hostname 127.0.0.1 --port 3006
