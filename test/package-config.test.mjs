import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));

describe("desktop package config", () => {
  it("defines Electron entrypoint and desktop scripts", () => {
    assert.equal(packageJson.main, "electron/main.cjs");
    assert.equal(packageJson.scripts.desktop, "electron .");
    assert.equal(packageJson.scripts["dist:win"], "electron-builder --win --dir");
    assert.equal(
      packageJson.scripts["dist:win:installer"],
      "electron-builder --win --publish never"
    );
    assert.equal(
      packageJson.scripts["dist:mac"],
      "electron-builder --mac --universal --publish never"
    );
  });

  it("packages the static preview and Electron shell for Windows and macOS", () => {
    assert.equal(packageJson.build.productName, "Expo Phone Preview");
    assert.deepEqual(packageJson.build.files, [
      "electron/**/*",
      "public/**/*",
      "README.md",
      "LICENSE",
      "package.json",
    ]);
    assert.deepEqual(packageJson.build.win.target, ["nsis", "portable"]);
    assert.equal(packageJson.build.win.signAndEditExecutable, false);
    assert.deepEqual(packageJson.build.mac.target, ["dmg", "zip"]);
  });
});
