const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "public");
const requestedPort = Number(process.env.PREVIEW_PHONE_PORT || process.argv[2] || 4173);
const startPort = Number.isFinite(requestedPort) ? requestedPort : 4173;
const maxPort = startPort + 30;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function sendFile(response, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(content);
  });
}

function createServer() {
  return http.createServer((request, response) => {
    const requestUrl = new URL(request.url, "http://localhost");
    const pathname =
      requestUrl.pathname === "/" ? "/index.html" : decodeURIComponent(requestUrl.pathname);
    const filePath = path.normalize(path.join(root, pathname));

    if (!filePath.startsWith(root)) {
      response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Forbidden");
      return;
    }

    sendFile(response, filePath);
  });
}

function listen(port) {
  const server = createServer();

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && port < maxPort) {
      listen(port + 1);
      return;
    }

    console.error(error.message);
    process.exitCode = 1;
  });

  server.listen(port, () => {
    console.log(`Phone preview: http://localhost:${port}`);
    console.log("Paste your Expo line, for example: › Web: http://localhost:8081");
  });
}

listen(startPort);
