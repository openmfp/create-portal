import fs from "fs";
import path from "path";

export function createTempDir(prefix = "test-portal-") {
  const tempDir = path.join(process.cwd(), `${prefix}${Date.now()}`);
  fs.mkdirSync(tempDir, { recursive: true });
  return tempDir;
}

export function cleanupDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

export function fileExists(filePath) {
  return fs.existsSync(filePath);
}

export function readJsonFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

export function readFile(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

export function checkProjectStructure(projectDir) {
  const expectedFiles = [
    "package.json",
    "README.md",
    ".gitignore",
    "backend/package.json",
    "backend/tsconfig.json",
    "backend/nest-cli.json",
    "backend/src/main.ts",
    "backend/src/app.module.ts",
    "frontend/package.json",
    "frontend/angular.json",
    "frontend/tsconfig.json",
    "frontend/src/main.ts",
    "frontend/src/index.html",
  ];

  return expectedFiles.every((file) => fileExists(path.join(projectDir, file)));
}
