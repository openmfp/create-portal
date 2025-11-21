import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateRootFiles(projectDir, projectName, writeFile) {
  const templatesDir = path.join(__dirname, "templates");

  const rootPackageJson = fs
    .readFileSync(path.join(templatesDir, "package.json"), "utf-8")
    .replace(/{{projectName}}/g, projectName);

  writeFile(path.join(projectDir, "package.json"), rootPackageJson);

  const readme = fs
    .readFileSync(path.join(templatesDir, "README.md"), "utf-8")
    .replace(/{{projectName}}/g, projectName);

  writeFile(path.join(projectDir, "README.md"), readme);

  const gitignore = fs.readFileSync(path.join(templatesDir, ".gitignore"), "utf-8");

  writeFile(path.join(projectDir, ".gitignore"), gitignore);
}
