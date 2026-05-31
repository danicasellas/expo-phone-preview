# Expo Phone Preview

A tiny desktop and local-browser tool that shows an Expo Web app inside a phone
frame.

It is useful when Expo prints a line like:

```text
Web: http://localhost:8081
```

Paste that line into the preview and see the app without opening a real phone,
Android Studio, or Xcode. Expo keeps its normal hot reload, so changes from VS
Code appear immediately.

## Features

- Desktop app for Windows and macOS.
- Optional local web mode for development.
- Works with Expo Web on `localhost`.
- Accepts the full Expo line or a plain URL.
- Includes iPhone, Android, and tablet frame sizes.
- Has quick reload and open-in-tab actions.

## Requirements

- An Expo app running with web enabled.
- Node.js 18 or newer if you want to run from source.

## Download

Use the files from GitHub Releases:

- Windows: download the `.exe` installer or portable `.exe`.
- macOS: download the `.dmg` or `.zip`.

The desktop app does not require opening `http://localhost:4173`. It opens the
phone preview directly.

Your Expo project still needs to run its own web server, usually:

```bash
npx expo start --web
```

Then paste the Expo Web URL:

```text
http://localhost:8081
```

## Run From Source

```bash
npm install
npm run desktop
```

## Local Web Mode

If you prefer the browser version, run:

```bash
npm start
```

Open the URL printed by the tool, usually:

```text
http://localhost:4173
```

Then paste your Expo Web line:

```text
Web: http://localhost:8081
```

## Build Locally

Build a local Windows app folder:

```bash
npm run dist:win
```

Open:

```text
dist/win-unpacked/Expo Phone Preview.exe
```

Build a Windows installer:

```bash
npm run dist:win:installer
```

Build macOS packages on macOS:

```bash
npm run dist:mac
```

The GitHub Actions workflow builds Windows and macOS packages from the public
repo. Trigger it manually from the Actions tab, or push a tag like `v0.1.0` to
attach the generated files to a GitHub Release. GitHub standard runners are free
for public repositories, which keeps release builds low-cost.

## Custom Port

Use the `PREVIEW_PHONE_PORT` environment variable:

```bash
PREVIEW_PHONE_PORT=4300 npm start
```

On Windows PowerShell:

```powershell
$env:PREVIEW_PHONE_PORT=4300; npm start
```

## Notes

This preview uses an `iframe`, so it works best with local dev servers like
Expo Web that allow being embedded. If another app blocks iframes with security
headers, open that app in a normal browser tab instead.

The default builds are unsigned to keep costs low. Windows SmartScreen and macOS
Gatekeeper can show warnings for unsigned apps. Paid code signing can be added
later if the project needs a smoother install experience.

## Test

```bash
npm test
```

## License

MIT
