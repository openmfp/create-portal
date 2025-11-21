import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateBackendFiles(projectDir, writeFile) {
  const templatesDir = path.join(__dirname, "templates");

  const backendPackageJson = fs.readFileSync(
    path.join(templatesDir, "package.json"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "backend", "package.json"), backendPackageJson);

  const backendTsConfig = fs.readFileSync(
    path.join(templatesDir, "tsconfig.json"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "backend", "tsconfig.json"), backendTsConfig);

  const backendTsConfigBuild = fs.readFileSync(
    path.join(templatesDir, "tsconfig.build.json"),
    "utf-8"
  );

  writeFile(
    path.join(projectDir, "backend", "tsconfig.build.json"),
    backendTsConfigBuild
  );

  const nestCliJson = fs.readFileSync(path.join(templatesDir, "nest-cli.json"), "utf-8");

  writeFile(path.join(projectDir, "backend", "nest-cli.json"), nestCliJson);

  const backendMainTs = fs.readFileSync(
    path.join(templatesDir, "src", "main.ts"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "backend", "src", "main.ts"), backendMainTs);

  const backendAppModuleTs = fs.readFileSync(
    path.join(templatesDir, "src", "app.module.ts"),
    "utf-8"
  );

  writeFile(path.join(projectDir, "backend", "src", "app.module.ts"), backendAppModuleTs);
}
