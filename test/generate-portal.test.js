import { execSync } from "child_process";
import assert from "node:assert";
import { afterEach, beforeEach, describe, it } from "node:test";
import path from "path";
import {
  checkProjectStructure,
  cleanupDir,
  createTempDir,
  fileExists,
  readFile,
  readJsonFile,
} from "./helpers.js";

describe("create-portal CLI", () => {
  let testDir;
  let projectName;

  beforeEach(() => {
    testDir = createTempDir();
    projectName = "test-project";
  });

  afterEach(() => {
    if (testDir) {
      cleanupDir(testDir);
    }
  });

  it("should create a new portal project with default name", () => {
    const cliPath = path.join(process.cwd(), "src", "generate-portal.js");
    const originalCwd = process.cwd();

    try {
      process.chdir(testDir);
      execSync(`node ${cliPath} my-portal --skip-install`, {
        stdio: "ignore",
        timeout: 120000,
      });

      const projectDir = path.join(testDir, "my-portal");
      assert.ok(fileExists(projectDir), "Project directory should exist");
      assert.ok(
        checkProjectStructure(projectDir),
        "Project structure should be complete"
      );
    } finally {
      process.chdir(originalCwd);
    }
  });

  it("should create a new portal project with custom name", () => {
    const cliPath = path.join(process.cwd(), "src", "generate-portal.js");
    const originalCwd = process.cwd();

    try {
      process.chdir(testDir);
      execSync(`node ${cliPath} ${projectName} --skip-install`, {
        stdio: "ignore",
        timeout: 120000,
      });

      const projectDir = path.join(testDir, projectName);
      assert.ok(fileExists(projectDir), "Project directory should exist");
      assert.ok(
        checkProjectStructure(projectDir),
        "Project structure should be complete"
      );
    } finally {
      process.chdir(originalCwd);
    }
  });

  it("should fail if directory already exists", () => {
    const cliPath = path.join(process.cwd(), "src", "generate-portal.js");
    const originalCwd = process.cwd();

    try {
      process.chdir(testDir);

      execSync(`node ${cliPath} ${projectName} --skip-install`, {
        stdio: "ignore",
        timeout: 120000,
      });

      assert.throws(
        () => {
          execSync(`node ${cliPath} ${projectName} --skip-install`, { stdio: "pipe" });
        },
        {
          name: "Error",
        }
      );
    } finally {
      process.chdir(originalCwd);
    }
  });

  it("should create valid root package.json", () => {
    const cliPath = path.join(process.cwd(), "src", "generate-portal.js");
    const originalCwd = process.cwd();

    try {
      process.chdir(testDir);
      execSync(`node ${cliPath} ${projectName} --skip-install`, {
        stdio: "ignore",
        timeout: 120000,
      });

      const projectDir = path.join(testDir, projectName);
      const packageJson = readJsonFile(path.join(projectDir, "package.json"));

      assert.strictEqual(packageJson.name, projectName);
      assert.strictEqual(packageJson.version, "1.0.0");
      assert.ok(packageJson.scripts.build, "Should have build script");
      assert.ok(packageJson.scripts.start, "Should have start script");
      assert.ok(packageJson.devDependencies.concurrently, "Should have concurrently");
    } finally {
      process.chdir(originalCwd);
    }
  });

  it("should create valid backend package.json", () => {
    const cliPath = path.join(process.cwd(), "src", "generate-portal.js");
    const originalCwd = process.cwd();

    try {
      process.chdir(testDir);
      execSync(`node ${cliPath} ${projectName} --skip-install`, {
        stdio: "ignore",
        timeout: 120000,
      });

      const projectDir = path.join(testDir, projectName);
      const packageJson = readJsonFile(path.join(projectDir, "backend", "package.json"));

      assert.strictEqual(packageJson.name, "backend");
      assert.ok(packageJson.dependencies["@nestjs/core"]);
      assert.ok(packageJson.dependencies["@openmfp/portal-server-lib"]);
      assert.ok(packageJson.scripts.build, "Should have build script");
      assert.ok(packageJson.scripts.start, "Should have start script");
    } finally {
      process.chdir(originalCwd);
    }
  });

  it("should create valid frontend package.json", () => {
    const cliPath = path.join(process.cwd(), "src", "generate-portal.js");
    const originalCwd = process.cwd();

    try {
      process.chdir(testDir);
      execSync(`node ${cliPath} ${projectName} --skip-install`, {
        stdio: "ignore",
        timeout: 120000,
      });

      const projectDir = path.join(testDir, projectName);
      const packageJson = readJsonFile(path.join(projectDir, "frontend", "package.json"));

      assert.strictEqual(packageJson.name, "frontend");
      assert.ok(packageJson.dependencies["@angular/core"]);
      assert.ok(packageJson.dependencies["@openmfp/portal-ui-lib"]);
      assert.ok(packageJson.scripts.build, "Should have build script");
      assert.ok(packageJson.scripts.start, "Should have start script");
    } finally {
      process.chdir(originalCwd);
    }
  });

  it("should create .gitignore file", () => {
    const cliPath = path.join(process.cwd(), "src", "generate-portal.js");
    const originalCwd = process.cwd();

    try {
      process.chdir(testDir);
      execSync(`node ${cliPath} ${projectName} --skip-install`, {
        stdio: "ignore",
        timeout: 120000,
      });

      const projectDir = path.join(testDir, projectName);
      const gitignore = readFile(path.join(projectDir, ".gitignore"));

      assert.ok(gitignore.includes("node_modules/"));
      assert.ok(gitignore.includes("dist/"));
      assert.ok(gitignore.includes(".env"));
    } finally {
      process.chdir(originalCwd);
    }
  });

  it("should create README.md with project name", () => {
    const cliPath = path.join(process.cwd(), "src", "generate-portal.js");
    const originalCwd = process.cwd();

    try {
      process.chdir(testDir);
      execSync(`node ${cliPath} ${projectName} --skip-install`, {
        stdio: "ignore",
        timeout: 120000,
      });

      const projectDir = path.join(testDir, projectName);
      const readme = readFile(path.join(projectDir, "README.md"));

      assert.ok(readme.includes(`# ${projectName}`));
      assert.ok(readme.includes("OpenMFP Portal"));
    } finally {
      process.chdir(originalCwd);
    }
  });
});
