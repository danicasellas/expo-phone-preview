import { extractPreviewUrl } from "./preview-url.mjs";
import {
  MAX_DEVICE_SCALE,
  MIN_DEVICE_SCALE,
  formatDeviceScale,
  getNextDeviceScale,
  normalizeDeviceScale,
} from "./preview-scale.mjs";

const frame = document.querySelector("#preview-frame");
const form = document.querySelector("#preview-form");
const input = document.querySelector("#preview-url");
const status = document.querySelector("#preview-status");
const openTarget = document.querySelector("#open-target");
const reloadButton = document.querySelector("#reload-preview");
const phoneFrame = document.querySelector("#phone-frame");
const deviceButtons = [...document.querySelectorAll(".device-button")];
const scaleDownButton = document.querySelector("#device-scale-down");
const scaleUpButton = document.querySelector("#device-scale-up");
const scaleValue = document.querySelector("#device-scale-value");

const initialTarget = new URL(window.location.href).searchParams.get("url");
const savedTarget = window.localStorage.getItem("phone-preview-url");
const savedScale = window.localStorage.getItem("phone-preview-scale");
let currentScale = normalizeDeviceScale(savedScale);

function setPreviewUrl(value) {
  const url = extractPreviewUrl(value);
  frame.src = url;
  input.value = url;
  status.textContent = `Showing ${url}`;
  openTarget.href = url;
  window.localStorage.setItem("phone-preview-url", url);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  setPreviewUrl(input.value);
});

reloadButton.addEventListener("click", () => {
  frame.src = frame.src;
});

function setDeviceScale(scale) {
  currentScale = normalizeDeviceScale(scale);
  phoneFrame.style.setProperty("--device-scale", currentScale);
  scaleValue.textContent = formatDeviceScale(currentScale);
  scaleDownButton.disabled = currentScale <= MIN_DEVICE_SCALE;
  scaleUpButton.disabled = currentScale >= MAX_DEVICE_SCALE;
  window.localStorage.setItem("phone-preview-scale", String(currentScale));
}

scaleDownButton.addEventListener("click", () => {
  setDeviceScale(getNextDeviceScale(currentScale, -1));
});

scaleUpButton.addEventListener("click", () => {
  setDeviceScale(getNextDeviceScale(currentScale, 1));
});

deviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const device = button.dataset.device;
    phoneFrame.dataset.device = device;
    deviceButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
  });
});

setPreviewUrl(initialTarget || savedTarget || "");
setDeviceScale(currentScale);
