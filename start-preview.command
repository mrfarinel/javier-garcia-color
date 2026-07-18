#!/bin/bash

cd "$(dirname "$0")" || exit 1

echo "Starting Javier García portfolio preview..."
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed."
  echo "Install the current Node.js LTS version from https://nodejs.org/ and run this file again."
  echo ""
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not available."
  echo "Install the current Node.js LTS version from https://nodejs.org/ and run this file again."
  echo ""
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi

if [ ! -x "node_modules/.bin/next" ]; then
  echo "Installing dependencies..."
  npm install || {
    echo ""
    echo "Dependency installation failed."
    read -n 1 -s -r -p "Press any key to close..."
    exit 1
  }
fi

PORT=3000

if command -v lsof >/dev/null 2>&1 && lsof -iTCP:3000 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port 3000 is already in use."
  echo "Starting the preview on port 3001 instead."
  PORT=3001
fi

if command -v lsof >/dev/null 2>&1 && lsof -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port ${PORT} is already in use."
  echo "Close the other preview window or stop the old server, then run this file again."
  echo ""
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi

URL="http://localhost:${PORT}"

echo ""
echo "Starting local server on ${URL}"
echo "Leave this Terminal window open while reviewing the website."
echo ""

npm run dev -- --hostname localhost --port "${PORT}" &
SERVER_PID=$!

cleanup() {
  if kill -0 "${SERVER_PID}" >/dev/null 2>&1; then
    kill "${SERVER_PID}" >/dev/null 2>&1
  fi
}

trap cleanup EXIT

echo "Waiting for the website to be ready..."

ATTEMPTS=0
MAX_ATTEMPTS=60

until curl -fsS "${URL}" >/dev/null 2>&1; do
  if ! kill -0 "${SERVER_PID}" >/dev/null 2>&1; then
    echo ""
    echo "The server failed to start."
    echo "Check the messages above for the exact error."
    echo ""
    read -n 1 -s -r -p "Press any key to close..."
    exit 1
  fi

  ATTEMPTS=$((ATTEMPTS + 1))

  if [ "${ATTEMPTS}" -ge "${MAX_ATTEMPTS}" ]; then
    echo ""
    echo "The server did not respond at ${URL}."
    echo "Check the messages above, then run this file again."
    echo ""
    read -n 1 -s -r -p "Press any key to close..."
    exit 1
  fi

  sleep 1
done

echo "Website ready: ${URL}"
open "${URL}"

wait "${SERVER_PID}"

echo ""
echo "The preview server stopped."
read -n 1 -s -r -p "Press any key to close..."
