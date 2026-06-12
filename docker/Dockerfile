# syntax=docker/dockerfile:1
# Build as linux/amd64 (x86-64): the Android SDK's aapt2 ships x86-64-only,
# so the whole toolchain must be x86-64. On Apple Silicon this runs under emulation.
FROM --platform=linux/amd64 ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV ANDROID_HOME=/opt/android-sdk
ENV ANDROID_SDK_ROOT=/opt/android-sdk

# System dependencies + Java 21 (Capacitor 8 compiles its Android code for Java 21).
# Symlink the JDK to a fixed, arch-independent path so JAVA_HOME works on amd64 AND arm64.
RUN apt-get update && apt-get install -y \
    curl unzip git openjdk-21-jdk ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s "$(dirname "$(dirname "$(readlink -f "$(which javac)")")")" /opt/java-21

ENV JAVA_HOME=/opt/java-21

# Node 22 (Capacitor 8 CLI requires Node >=22)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Android SDK command-line tools
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools \
    && curl -fsSL https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -o /tmp/cmdtools.zip \
    && unzip -q /tmp/cmdtools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools \
    && mv ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools ${ANDROID_SDK_ROOT}/cmdline-tools/latest \
    && rm /tmp/cmdtools.zip

ENV PATH=${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools

# Accept licenses + install SDK 34 packages
RUN yes | sdkmanager --licenses \
    && sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

WORKDIR /app

# --- Build the app INSIDE the image (no bind mounts: avoids the Docker Desktop VirtioFS bug) ---

# 1) Install JS deps first so this layer is cached unless package files change
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm install

# 2) Copy the rest of the source (see .dockerignore for what is excluded)
COPY . .

# 3) Build web (Vite -> dist), add + sync Android, then assemble the debug APK.
#    Image is x86-64, so the default aapt2 just works (no override needed).
RUN --mount=type=cache,target=/root/.gradle \
    npm run build \
    && test -d dist \
    && npx cap add android \
    && npx cap sync android \
    && cd android \
    && chmod +x ./gradlew \
    && ./gradlew assembleDebug

# Final APK lives at: /app/android/app/build/outputs/apk/debug/app-debug.apk
