import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import path from "path";
import { generateBackendFiles } from "../src/scripts/backend/backend-generator.js";
import { generateFrontendFiles } from "../src/scripts/frontend/frontend-generator.js";
import { generateRootFiles } from "../src/scripts/root/root-generator.js";
import {
  createTempDir,
  cleanupDir,
  fileExists,
  readJsonFile,
  readFile,
} from "./helpers.js";
import fs from "fs";

function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFile(filePath, content) {
  createDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
}

describe("Backend Generator", () => {
  let testDir;

  beforeEach(() => {
    testDir = createTempDir("test-backend-");
  });

  afterEach(() => {
    cleanupDir(testDir);
  });

  it("should generate backend files", () => {
    generateBackendFiles(testDir, writeFile);

    assert.ok(
      fileExists(path.join(testDir, "backend", "package.json")),
      "Should create backend package.json"
    );
    assert.ok(
      fileExists(path.join(testDir, "backend", "tsconfig.json")),
      "Should create tsconfig.json"
    );
    assert.ok(
      fileExists(path.join(testDir, "backend", "tsconfig.build.json")),
      "Should create tsconfig.build.json"
    );
    assert.ok(
      fileExists(path.join(testDir, "backend", "nest-cli.json")),
      "Should create nest-cli.json"
    );
    assert.ok(
      fileExists(path.join(testDir, "backend", "src", "main.ts")),
      "Should create main.ts"
    );
    assert.ok(
      fileExists(path.join(testDir, "backend", "src", "app.module.ts")),
      "Should create app.module.ts"
    );
  });

  it("should generate valid backend package.json", () => {
    generateBackendFiles(testDir, writeFile);

    const packageJson = readJsonFile(
      path.join(testDir, "backend", "package.json")
    );

    assert.strictEqual(packageJson.name, "backend");
    assert.ok(packageJson.dependencies["@nestjs/core"]);
    assert.ok(packageJson.dependencies["@openmfp/portal-server-lib"]);
    assert.ok(packageJson.scripts.build);
    assert.ok(packageJson.scripts.start);
  });

  it("should generate valid nest-cli.json", () => {
    generateBackendFiles(testDir, writeFile);

    const nestCli = readJsonFile(path.join(testDir, "backend", "nest-cli.json"));

    assert.strictEqual(nestCli.collection, "@nestjs/schematics");
    assert.strictEqual(nestCli.sourceRoot, "src");
  });

  it("should generate main.ts with bootstrap function", () => {
    generateBackendFiles(testDir, writeFile);

    const mainTs = readFile(path.join(testDir, "backend", "src", "main.ts"));

    assert.ok(mainTs.includes("async function bootstrap()"));
    assert.ok(mainTs.includes("NestFactory.create"));
    assert.ok(mainTs.includes("AppModule"));
  });

  it("should generate app.module.ts with PortalModule", () => {
    generateBackendFiles(testDir, writeFile);

    const appModuleTs = readFile(
      path.join(testDir, "backend", "src", "app.module.ts")
    );

    assert.ok(appModuleTs.includes("PortalModule"));
    assert.ok(appModuleTs.includes("@openmfp/portal-server-lib"));
    assert.ok(appModuleTs.includes("export class AppModule"));
  });
});

describe("Frontend Generator", () => {
  let testDir;

  beforeEach(() => {
    testDir = createTempDir("test-frontend-");
  });

  afterEach(() => {
    cleanupDir(testDir);
  });

  it("should generate frontend files", () => {
    generateFrontendFiles(testDir, writeFile, createDir);

    assert.ok(
      fileExists(path.join(testDir, "frontend", "package.json")),
      "Should create frontend package.json"
    );
    assert.ok(
      fileExists(path.join(testDir, "frontend", "angular.json")),
      "Should create angular.json"
    );
    assert.ok(
      fileExists(path.join(testDir, "frontend", "tsconfig.json")),
      "Should create tsconfig.json"
    );
    assert.ok(
      fileExists(path.join(testDir, "frontend", "src", "main.ts")),
      "Should create main.ts"
    );
    assert.ok(
      fileExists(path.join(testDir, "frontend", "src", "index.html")),
      "Should create index.html"
    );
  });

  it("should generate valid frontend package.json", () => {
    generateFrontendFiles(testDir, writeFile, createDir);

    const packageJson = readJsonFile(
      path.join(testDir, "frontend", "package.json")
    );

    assert.strictEqual(packageJson.name, "frontend");
    assert.ok(packageJson.dependencies["@angular/core"]);
    assert.ok(packageJson.dependencies["@openmfp/portal-ui-lib"]);
    assert.ok(packageJson.scripts.build);
    assert.ok(packageJson.scripts.start);
  });

  it("should generate valid angular.json", () => {
    generateFrontendFiles(testDir, writeFile, createDir);

    const angularJson = readJsonFile(
      path.join(testDir, "frontend", "angular.json")
    );

    assert.ok(angularJson.projects.frontend);
    assert.strictEqual(
      angularJson.projects.frontend.projectType,
      "application"
    );
    assert.ok(angularJson.projects.frontend.architect.build);
    assert.ok(angularJson.projects.frontend.architect.serve);
  });

  it("should generate main.ts with bootstrapApplication", () => {
    generateFrontendFiles(testDir, writeFile, createDir);

    const mainTs = readFile(path.join(testDir, "frontend", "src", "main.ts"));

    assert.ok(mainTs.includes("bootstrapApplication"));
    assert.ok(mainTs.includes("PortalComponent"));
    assert.ok(mainTs.includes("providePortal"));
  });

  it("should generate index.html with Luigi", () => {
    generateFrontendFiles(testDir, writeFile, createDir);

    const indexHtml = readFile(
      path.join(testDir, "frontend", "src", "index.html")
    );

    assert.ok(indexHtml.includes("OpenMFP Portal"));
    assert.ok(indexHtml.includes("luigi.js"));
    assert.ok(indexHtml.includes("app-portal"));
  });

  it("should generate proxy.config.json", () => {
    generateFrontendFiles(testDir, writeFile, createDir);

    const proxyConfig = readJsonFile(
      path.join(testDir, "frontend", "proxy.config.json")
    );

    assert.ok(proxyConfig["/rest/**"]);
    assert.strictEqual(
      proxyConfig["/rest/**"].target,
      "http://localhost:3000"
    );
  });

  it("should generate extract-versions.js build script", () => {
    generateFrontendFiles(testDir, writeFile, createDir);

    const extractVersions = readFile(
      path.join(testDir, "frontend", "build-scripts", "extract-versions.js")
    );

    assert.ok(extractVersions.includes("dependencies-versions.json"));
    assert.ok(extractVersions.includes("packageJson.dependencies"));
  });
});

describe("Root Generator", () => {
  let testDir;
  const projectName = "test-project";

  beforeEach(() => {
    testDir = createTempDir("test-root-");
  });

  afterEach(() => {
    cleanupDir(testDir);
  });

  it("should generate root files", () => {
    generateRootFiles(testDir, projectName, writeFile);

    assert.ok(
      fileExists(path.join(testDir, "package.json")),
      "Should create package.json"
    );
    assert.ok(
      fileExists(path.join(testDir, "README.md")),
      "Should create README.md"
    );
    assert.ok(
      fileExists(path.join(testDir, ".gitignore")),
      "Should create .gitignore"
    );
  });

  it("should generate package.json with correct project name", () => {
    generateRootFiles(testDir, projectName, writeFile);

    const packageJson = readJsonFile(path.join(testDir, "package.json"));

    assert.strictEqual(packageJson.name, projectName);
    assert.strictEqual(packageJson.version, "1.0.0");
    assert.ok(packageJson.scripts.build);
    assert.ok(packageJson.scripts.start);
    assert.ok(packageJson.devDependencies.concurrently);
  });

  it("should generate README.md with correct project name", () => {
    generateRootFiles(testDir, projectName, writeFile);

    const readme = readFile(path.join(testDir, "README.md"));

    assert.ok(readme.includes(`# ${projectName}`));
    assert.ok(readme.includes("OpenMFP Portal"));
    assert.ok(readme.includes("npm start"));
  });

  it("should generate .gitignore with common patterns", () => {
    generateRootFiles(testDir, projectName, writeFile);

    const gitignore = readFile(path.join(testDir, ".gitignore"));

    assert.ok(gitignore.includes("node_modules/"));
    assert.ok(gitignore.includes("dist/"));
    assert.ok(gitignore.includes(".env"));
  });

  it("should replace all placeholders in templates", () => {
    const customName = "my-custom-portal";
    generateRootFiles(testDir, customName, writeFile);

    const packageJson = readJsonFile(path.join(testDir, "package.json"));
    const readme = readFile(path.join(testDir, "README.md"));

    assert.strictEqual(packageJson.name, customName);
    assert.ok(readme.includes(`# ${customName}`));
    assert.ok(!readme.includes("{{projectName}}"));
  });
});
