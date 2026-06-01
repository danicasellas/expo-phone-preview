import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_DEVICE_SCALE,
  DEVICE_SCALE_STEP,
  formatDeviceScale,
  getNextDeviceScale,
  normalizeDeviceScale,
} from "../public/preview-scale.mjs";

describe("device scale", () => {
  it("normalizes persisted values within the supported range", () => {
    assert.equal(normalizeDeviceScale("1.1"), 1.1);
    assert.equal(normalizeDeviceScale("5"), 1.3);
    assert.equal(normalizeDeviceScale("0.2"), 0.7);
    assert.equal(normalizeDeviceScale("bad"), DEFAULT_DEVICE_SCALE);
  });

  it("increments and decrements by a fixed step", () => {
    assert.equal(getNextDeviceScale(1, 1), 1 + DEVICE_SCALE_STEP);
    assert.equal(getNextDeviceScale(1, -1), 1 - DEVICE_SCALE_STEP);
  });

  it("formats scale as a readable percentage", () => {
    assert.equal(formatDeviceScale(1), "100%");
    assert.equal(formatDeviceScale(1.3), "130%");
  });
});
