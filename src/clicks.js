import { readFileSync } from "fs";

const clicks = readFileSync(__dirname + "/clicks.csv", "utf8");

const lines = clicks.split("\n");

const hostnames = new Map();
for (const line of lines) {
  if (!line.length) continue;
  let parsed;
  try {
    parsed = new URL(line);
  } catch (e) {
    console.log("INVALID URL", e, line);
    process.exit();
  }
  const host = hostnames.get(parsed.hostname);
  if (host) {
    hostnames.set(parsed.hostname, host + 1);
  } else {
    hostnames.set(parsed.hostname, 1);
  }
}

console.log(
  [...hostnames]
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .slice(0, 20)
);
