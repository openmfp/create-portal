import { execSync } from "child_process";
import assert from "node:assert";
import { afterEach, beforeEach, describe, it } from "node:test";
import path from "path";
import { cleanupDir, createTempDir, fileExists } from "./helpers.js";

function toText(value) {
  if (typeof value === "string") {
    return value;
  }
  if (Buffer.isBuffer(value)) {
    return value.toString("utf-8");
  }
  return "";
}

function tailLines(text, maxLines = 120) {
  if (!text) {
    return "";
  }
  return text.split("\n").slice(-maxLines).join("\n").trim();
}

function runStep({ stepName, command, cwd, timeout }) {
  try {
    execSync(command, {
      cwd,
      stdio: "pipe",
      encoding: "utf-8",
      timeout,
    });
  } catch (error) {
    const stdout = tailLines(toText(error.stdout));
    const stderr = tailLines(toText(error.stderr));
    const status = error.status ?? "unknown";
    const signal = error.signal ?? "none";
    throw new Error(
      [
        `Integration step failed: ${stepName}`,
        `Command: ${command}`,
        `Working directory: ${cwd}`,
        `Exit code: ${status}`,
        `Signal: ${signal}`,
        "",
        "stderr (tail):",
        stderr || "<empty>",
        "",
        "stdout (tail):",
        stdout || "<empty>",
      ].join("\n")
    );
  }
}

describe("create-portal integration", () => {
  let testDir;

  beforeEach(() => {
    testDir = createTempDir();
  });

  afterEach(() => {
    if (testDir) {
      cleanupDir(testDir);
    }
  });

  it(
    "should install dependencies and build generated portal",
    { timeout: 1800000 },
    () => {
      const cliPath = path.join(process.cwd(), "src", "generate-portal.js");
      const smokeProjectName = "smoke-portal";
      const projectDir = path.join(testDir, smokeProjectName);

      runStep({
        stepName: "generate portal",
        command: `node ${cliPath} ${smokeProjectName} --skip-install`,
        cwd: testDir,
        timeout: 120000,
      });
      runStep({
        stepName: "install root dependencies",
        command: "npm install",
        cwd: projectDir,
        timeout: 600000,
      });
      runStep({
        stepName: "install frontend dependencies",
        command: "npm run npm:install:ui",
        cwd: projectDir,
        timeout: 600000,
      });
      runStep({
        stepName: "install backend dependencies",
        command: "npm run npm:install:server",
        cwd: projectDir,
        timeout: 600000,
      });
      runStep({
        stepName: "build generated portal",
        command: "npm run build",
        cwd: projectDir,
        timeout: 600000,
      });

      assert.ok(
        fileExists(path.join(projectDir, "frontend", "dist")),
        "Frontend build output should exist"
      );
      assert.ok(
        fileExists(path.join(projectDir, "backend", "dist")),
        "Backend build output should exist"
      );
    }
  );
});
