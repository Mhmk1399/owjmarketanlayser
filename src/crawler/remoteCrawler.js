export class RemoteCrawler {
  constructor({ baseUrl, token = null, logger }) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.token = token;
    this.logger = logger;
    this.state = { status: "unknown", contactEndpointAttempts: 0, remote: true };
    this.timer = null;
  }

  headers() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async request(path, options = {}) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: { ...this.headers(), ...(options.headers || {}) },
      signal: AbortSignal.timeout(120_000),
    });
    const body = await response.json();
    if (!response.ok) throw Object.assign(new Error(body.message || `Crawler control returned ${response.status}`), { status: response.status });
    if (body?.state) this.state = body.state;
    return body;
  }

  async refresh() {
    try { this.state = await this.request("/state"); }
    catch (error) { this.state = { ...this.state, status: "unavailable", error: error.message, remote: true }; }
    return this.state;
  }

  startPolling(intervalMs = 5_000) {
    void this.refresh();
    this.timer = setInterval(() => void this.refresh(), intervalMs);
    this.timer.unref?.();
  }

  stopPolling() { if (this.timer) clearInterval(this.timer); }
  snapshot() { return this.state; }
  start() { return this.request("/crawl", { method: "POST" }); }
  startAreaJob(areaId) { return this.request(`/area-jobs/${encodeURIComponent(areaId)}`, { method: "POST" }); }
  getAreaJob(jobId) { return this.request(`/area-jobs/status/${encodeURIComponent(jobId)}`); }
  refetchListing(token) { return this.request(`/refetch/${encodeURIComponent(token)}`, { method: "POST" }); }
}
