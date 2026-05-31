import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { extractPreviewUrl } from "../public/preview-url.mjs";

describe("extractPreviewUrl", () => {
  it("extracts the URL from Expo Web output", () => {
    assert.equal(
      extractPreviewUrl("› Web: http://localhost:8081"),
      "http://localhost:8081/"
    );
  });

  it("accepts a direct localhost URL", () => {
    assert.equal(
      extractPreviewUrl("localhost:8081"),
      "http://localhost:8081/"
    );
  });

  it("falls back to Expo's default web URL when input is empty", () => {
    assert.equal(extractPreviewUrl(""), "http://localhost:8081/");
  });
});
