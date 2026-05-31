# Expo Phone Preview

A tiny local browser tool that shows an Expo Web app inside a phone frame.

It is useful when Expo prints something like:

```text
› Web: http://localhost:8081
```

Paste that line into the preview and see the app without opening a real phone,
Android Studio, or Xcode. Expo keeps its normal hot reload, so changes from VS
Code appear immediately.

## Features

- No dependencies.
- Works with Expo Web on `localhost`.
- Accepts the full Expo line or a plain URL.
- Includes iPhone, Android, and tablet frame sizes.
- Has quick reload and open-in-tab actions.

## Requirements

- Node.js 18 or newer.
- An Expo app running with web enabled.

## Usage

Clone the repo and run:

```bash
npm install
npm start
```

Open the URL printed by the tool, usually:

```text
http://localhost:4173
```

Then paste your Expo Web line:

```text
› Web: http://localhost:8081
```

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

## Test

```bash
npm test
```

## License

MIT
