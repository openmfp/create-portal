#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { generateBackendFiles } from "./scripts/backend/backend-generator.js";
import { generateFrontendFiles } from "./scripts/frontend/frontend-generator.js";
import { generateRootFiles } from "./scripts/root/root-generator.js";

const args = process.argv.slice(2);
const projectName = args[0] || "my-portal";

console.log(`\n🚀 Creating portal: ${projectName}\n`);

const projectDir = path.join(process.cwd(), projectName);

if (fs.existsSync(projectDir)) {
  console.error(`❌ Directory "${projectName}" already exists!`);
  process.exit(1);
}

function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFile(filePath, content) {
  createDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
}

function displayProjectStructure(dir, prefix = "", isRoot = true) {
  if (fs.statSync(dir).isDirectory()) {
    const items = fs
      .readdirSync(dir)
      .filter((item) => !item.startsWith(".") && item !== "node_modules")
      .map((item) => ({
        name: item,
        path: path.join(dir, item),
        isDirectory: fs.statSync(path.join(dir, item)).isDirectory(),
      }))
      .sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });

    items.forEach((item, index) => {
      const isLastItem = index === items.length - 1;
      const connector = isLastItem ? "└── " : "├── ";

      console.log(prefix + connector + item.name + (item.isDirectory ? "/" : ""));

      if (item.isDirectory) {
        const newPrefix = prefix + (isLastItem ? "    " : "│   ");
        displayProjectStructure(item.path, newPrefix, false);
      }
    });
  }
}

createDir(projectDir);

generateRootFiles(projectDir, projectName, writeFile);
generateBackendFiles(projectDir, writeFile);
generateFrontendFiles(projectDir, writeFile, createDir);

console.log("✅ Project structure created successfully!");
displayProjectStructure(projectDir);
console.log("\n📦 Installing dependencies...\n");

process.chdir(projectDir);

try {
  console.log("Installing root dependencies...");
  execSync("npm install", { stdio: "inherit" });

  console.log("\nInstalling frontend dependencies...");
  execSync("npm run npm:install:ui", { stdio: "inherit" });

  console.log("\nInstalling backend dependencies...");
  execSync("npm run npm:install:server", { stdio: "inherit" });

  console.log("\n✅ All dependencies installed successfully!\n");
  console.log("🎉 Portal created successfully!\n");
  console.log("To get started:\n");
  console.log(`  cd ${projectName}`);
  console.log("  npm start\n");
  console.log("Frontend: http://localhost:4300");
  console.log("Backend: http://localhost:3000\n");
} catch (error) {
  console.error("\n❌ Error installing dependencies:", error.message);
  console.log("\nYou can install dependencies manually:");
  console.log(`  cd ${projectName}`);
  console.log("  npm install\n");
  process.exit(1);
}
