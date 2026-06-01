export const DEFAULT_DEVICE_SCALE = 1;
export const DEVICE_SCALE_STEP = 0.1;
export const MIN_DEVICE_SCALE = 0.7;
export const MAX_DEVICE_SCALE = 1.3;

export function normalizeDeviceScale(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return DEFAULT_DEVICE_SCALE;
  }

  return clampDeviceScale(roundScale(numericValue));
}

export function getNextDeviceScale(currentScale, direction) {
  return normalizeDeviceScale(
    currentScale + Math.sign(direction) * DEVICE_SCALE_STEP
  );
}

export function formatDeviceScale(scale) {
  return `${Math.round(normalizeDeviceScale(scale) * 100)}%`;
}

function clampDeviceScale(scale) {
  return Math.min(MAX_DEVICE_SCALE, Math.max(MIN_DEVICE_SCALE, scale));
}

function roundScale(scale) {
  return Math.round(scale * 10) / 10;
}
