#!/usr/bin/env bash
set -e

# Always run from the project root (one level up from scripts/)
cd "$(dirname "$0")/.."

IMAGE=pos-android-builder
APK_IN_IMAGE=/app/android/app/build/outputs/apk/debug/app-debug.apk

echo "==> Building image (the full Android build runs inside it)..."
docker build --platform linux/amd64 -f docker/Dockerfile -t "$IMAGE" .

echo "==> Extracting APK from the built image..."
mkdir -p generated/builds/apk
CID=$(docker create --platform linux/amd64 "$IMAGE")
docker cp "$CID:$APK_IN_IMAGE" generated/builds/apk/app-debug.apk
docker rm "$CID" >/dev/null

echo ""
echo "==> DONE. APK is at generated/builds/apk/app-debug.apk"
ls -lh generated/builds/apk/app-debug.apk
