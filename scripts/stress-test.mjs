import http from "node:http";
import https from "node:https";
import { performance } from "node:perf_hooks";

const target = new URL(process.env.STRESS_TEST_URL ?? "http://127.0.0.1:3000");
const durationSeconds = Number(process.env.STRESS_TEST_DURATION ?? "30");
const connections = Number(process.env.STRESS_TEST_CONNECTIONS ?? "20");
const paths = (process.env.STRESS_TEST_PATHS ?? "/,/berita,/jurusan,/virtual-tour")
  .split(",")
  .map((path) => path.trim())
  .filter(Boolean);

if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
  throw new Error("STRESS_TEST_DURATION harus berupa angka positif dalam detik.");
}

if (!Number.isInteger(connections) || connections <= 0) {
  throw new Error("STRESS_TEST_CONNECTIONS harus berupa bilangan bulat positif.");
}

if (paths.length === 0) {
  throw new Error("STRESS_TEST_PATHS harus berisi minimal satu path.");
}

const isLocalTarget = ["127.0.0.1", "localhost", "::1"].includes(target.hostname);
if (!isLocalTarget && process.env.STRESS_TEST_ALLOW_REMOTE !== "true") {
  throw new Error("Target remote diblokir. Set STRESS_TEST_ALLOW_REMOTE=true setelah memiliki izin untuk mengujinya.");
}

const transport = target.protocol === "https:" ? https : http;
const agent = target.protocol === "https:"
  ? new https.Agent({ keepAlive: true, maxSockets: connections })
  : new http.Agent({ keepAlive: true, maxSockets: connections });
const stopAt = performance.now() + durationSeconds * 1000;
const latencies = [];
const failures = [];
let completed = 0;
let nextPath = 0;

function request(path) {
  return new Promise((resolve) => {
    const startedAt = performance.now();
    const requestOptions = {
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port || undefined,
      path: `${target.pathname.replace(/\/$/, "")}${path}`,
      method: "GET",
      headers: { Host: target.host },
      agent,
      timeout: 15_000,
    };

    const requestHandle = transport.request(requestOptions, (response) => {
      response.resume();
      response.on("end", () => {
        latencies.push(performance.now() - startedAt);
        completed += 1;
        if ((response.statusCode ?? 500) >= 400) {
          failures.push(`${path}: HTTP ${response.statusCode}`);
        }
        resolve();
      });
    });

    requestHandle.on("timeout", () => requestHandle.destroy(new Error("request timeout")));
    requestHandle.on("error", (error) => {
      latencies.push(performance.now() - startedAt);
      completed += 1;
      failures.push(`${path}: ${error.message}`);
      resolve();
    });
    requestHandle.end();
  });
}

async function worker() {
  while (performance.now() < stopAt) {
    const path = paths[nextPath % paths.length];
    nextPath += 1;
    await request(path);
  }
}

function percentile(values, ratio) {
  const index = Math.max(0, Math.ceil(values.length * ratio) - 1);
  return values[index] ?? 0;
}

console.log(`Stress test ${target.origin}: ${connections} koneksi selama ${durationSeconds}s`);
await Promise.all(Array.from({ length: connections }, worker));
agent.destroy();

latencies.sort((left, right) => left - right);
console.log(JSON.stringify({
  completed,
  failed: failures.length,
  requestsPerSecond: Number((completed / durationSeconds).toFixed(2)),
  latencyMs: {
    p50: Number(percentile(latencies, 0.5).toFixed(2)),
    p95: Number(percentile(latencies, 0.95).toFixed(2)),
    p99: Number(percentile(latencies, 0.99).toFixed(2)),
    max: Number((latencies.at(-1) ?? 0).toFixed(2)),
  },
  failures: failures.slice(0, 20),
}, null, 2));

if (failures.length > 0) {
  process.exitCode = 1;
}
