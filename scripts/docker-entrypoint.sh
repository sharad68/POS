#!/usr/bin/env bash
set -e

echo "==> [1/6] Installing npm dependencies"
npm install

echo "==> [2/6] Building web app (Vite -> dist)"
npm run build

# Vite outputs to "dist" (NOT "out" like Next.js)
if [ ! -d "dist" ]; then
  echo "ERROR: dist/ folder not found. Vite build failed."
  exit 1
fi

echo "==> [3/6] Adding Android platform (if missing)"
if [ ! -d "android" ]; then
  npx cap add android
fi

echo "==> [4/6] Syncing web assets into Android project"
npx cap sync android

echo "==> [5/6] Building debug APK with Gradle"
cd android
chmod +x ./gradlew
# On arm64 Linux, point AGP at the SDK's native aapt2 (the default one from Maven is x86_64-only)
./gradlew assembleDebug \
  -Pandroid.aapt2FromMavenOverride="${ANDROID_SDK_ROOT}/build-tools/34.0.0/aapt2"
cd ..

echo "==> [6/6] Copying APK to generated/builds/apk/"
mkdir -p generated/builds/apk
cp android/app/build/outputs/apk/debug/app-debug.apk generated/builds/apk/

echo "==> DONE. APK is at generated/builds/apk/app-debug.apk"
