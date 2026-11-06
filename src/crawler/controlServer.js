import http from "node:http";

function json(response, status, body) {
  const data = JSON.stringify(body);
  response.writeHead(status, { "content-type": "application/json", "content-length": Buffer.byteLength(data) });
  response.end(data);
}

export function createCrawlerControlServer({ crawler, token = null, logger }) {
  return http.createServer(async (request, response) => {
    const requestToken = request.headers.authorization?.replace(/^Bearer\s+/i, "") || null;
    if (token && requestToken !== token) return json(response, 401, { error: "unauthorized" });
    try {
      const url = new URL(request.url, "http://crawler-control");
      if (request.method === "GET" && url.pathname === "/health") return json(response, 200, { status: "ok", role: "crawler" });
      if (request.method === "GET" && url.pathname === "/state") return json(response, 200, crawler.snapshot());
      if (request.method === "POST" && url.pathname === "/crawl") return json(response, 202, await Promise.resolve(crawler.start()));
      let match = url.pathname.match(/^\/area-jobs\/([^/]+)$/);
      if (request.method === "POST" && match) return json(response, 202, await Promise.resolve(crawler.startAreaJob(match[1])));
      match = url.pathname.match(/^\/area-jobs\/status\/([^/]+)$/);
      if (request.method === "GET" && match) return json(response, 200, await Promise.resolve(crawler.getAreaJob(match[1])));
      match = url.pathname.match(/^\/refetch\/([^/]+)$/);
      if (request.method === "POST" && match) return json(response, 200, await crawler.refetchListing(match[1]));
      return json(response, 404, { error: "not-found" });
    } catch (error) {
      logger.error("crawler.control.failure", "Crawler control request failed", { error: error.stack || error.message });
      return json(response, 500, { error: "internal-error", message: error.message });
    }
  });
}
