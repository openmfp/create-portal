import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateFrontendFiles(projectDir, writeFile, createDir) {
  const templatesDir = path.join(__dirname, "templates");

  const frontendPackageJson = fs.readFileSync(
    path.join(templatesDir, "package.json"),
    "utf-8"
  );

  writeFile(
    path.join(projectDir, "frontend", "package.json"),
    frontendPackageJson
  );

  const frontendTsConfig = fs.readFileSync(
    path.join(templatesDir, "tsconfig.json"),
    "utf-8"
  );

  writeFile(
    path.join(projectDir, "frontend", "tsconfig.json"),
    frontendTsConfig
  );

  const frontendTsConfigApp = fs.readFileSync(
    path.join(templatesDir, "tsconfig.app.json"),
    "utf-8"
  );

  writeFile(
    path.join(projectDir, "frontend", "tsconfig.app.json"),
    frontendTsConfigApp
  );

  const angularJson = fs.readFileSync(
    path.join(templatesDir, "angular.json"),
    "utf-8"
  );

  writeFile(
    path.join(projectDir, "frontend", "angular.json"),
    angularJson
  );

  const proxyConfig = fs.readFileSync(
    path.join(templatesDir, "proxy.config.json"),
    "utf-8"
  );

  writeFile(
    path.join(projectDir, "frontend", "proxy.config.json"),
    proxyConfig
  );

  const frontendMainTs = fs.readFileSync(
    path.join(templatesDir, "src", "main.ts"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "frontend", "src", "main.ts"), frontendMainTs);

  const indexHtml = fs.readFileSync(
    path.join(templatesDir, "src", "index.html"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "frontend", "src", "index.html"), indexHtml);

  const stylesScss = fs.readFileSync(
    path.join(templatesDir, "src", "styles.scss"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "frontend", "src", "styles.scss"), stylesScss);

  const appRoutesTs = fs.readFileSync(
    path.join(templatesDir, "src", "app", "app.routes.ts"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "frontend", "src", "app", "app.routes.ts"), appRoutesTs);

  const environmentTs = fs.readFileSync(
    path.join(templatesDir, "src", "environments", "environment.ts"),
    "utf-8"
  );

  writeFile(
    path.join(projectDir, "frontend", "src", "environments", "environment.ts"),
    environmentTs
  );

  const environmentProdTs = fs.readFileSync(
    path.join(templatesDir, "src", "environments", "environment.prod.ts"),
    "utf-8"
  );

  writeFile(
    path.join(projectDir, "frontend", "src", "environments", "environment.prod.ts"),
    environmentProdTs
  );

  const extractVersionsJs = fs.readFileSync(
    path.join(templatesDir, "build-scripts", "extract-versions.js"),
    "utf-8"
  );

  writeFile(
    path.join(projectDir, "frontend", "build-scripts", "extract-versions.js"),
    extractVersionsJs
  );

  const gitkeep = fs.readFileSync(
    path.join(templatesDir, "src", "assets", ".gitkeep"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "frontend", "src", "assets", ".gitkeep"), gitkeep);

  const favicon = fs.readFileSync(
    path.join(templatesDir, "src", "favicon.ico"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "frontend", "src", "favicon.ico"), favicon);
}
