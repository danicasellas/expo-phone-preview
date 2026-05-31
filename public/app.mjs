import { extractPreviewUrl } from "./preview-url.mjs";

const frame = document.querySelector("#preview-frame");
const form = document.querySelector("#preview-form");
const input = document.querySelector("#preview-url");
const status = document.querySelector("#preview-status");
const openTarget = document.querySelector("#open-target");
const reloadButton = document.querySelector("#reload-preview");
const phoneFrame = document.querySelector("#phone-frame");
const deviceButtons = [...document.querySelectorAll(".device-button")];

const initialTarget = new URL(window.location.href).searchParams.get("url");
const savedTarget = window.localStorage.getItem("phone-preview-url");

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
