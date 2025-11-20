#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

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

const rootPackageJson = {
  name: projectName,
  version: "1.0.0",
  description: "OpenMFP Portal",
  engines: {
    node: ">=24.0.0",
    npm: ">=11.0.0",
  },
  scripts: {
    "npm:install:ui": "cd frontend && npm install",
    "npm:install:server": "cd backend && npm install",
    build: "concurrently 'npm:build:ui' 'npm:build:server'",
    "build:ui": "cd frontend && npm run build",
    "build:server": "cd backend && npm run build",
    start: "concurrently 'npm:start:ui' 'npm:start:server'",
    "start:ui": "cd frontend && npm run start",
    "start:server": "cd backend && npm run start",
    "build:ui:watch": "cd frontend && npm run build:watch",
    "start:server:watch": "cd backend && npm run start:watch",
    "start:watch": "concurrently 'npm:start:server:watch' 'npm:build:ui:watch'",
  },
  devDependencies: {
    concurrently: "^9.2.1",
  },
  private: true,
};

writeFile(
  path.join(projectDir, "package.json"),
  JSON.stringify(rootPackageJson, null, 2)
);

const backendPackageJson = {
  name: "backend",
  version: "0.0.1",
  private: true,
  license: "UNLICENSED",
  scripts: {
    build: "nest build",
    start: "nest start",
    "start:watch": "nest start --watch",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
  },
  dependencies: {
    "@nestjs/common": "^11.1.8",
    "@nestjs/core": "^11.1.8",
    "@nestjs/platform-express": "^11.1.8",
    "@nestjs/serve-static": "^5.0.4",
    "@openmfp/portal-server-lib": "^0.163.2",
    dotenv: "^17.2.3",
    "reflect-metadata": "^0.2.2",
    rxjs: "^7.8.1",
  },
  devDependencies: {
    "@nestjs/cli": "^11.0.10",
    "@nestjs/schematics": "^11.0.9",
    "@types/express": "^5.0.5",
    "@types/node": "^24.10.1",
    typescript: "^5.8.0",
  },
  type: "module",
};

writeFile(
  path.join(projectDir, "backend", "package.json"),
  JSON.stringify(backendPackageJson, null, 2)
);

const frontendPackageJson = {
  name: "frontend",
  version: "0.0.0",
  scripts: {
    ng: "ng",
    "extract-versions": "node ./build-scripts/extract-versions.js",
    prebuild: "npm run extract-versions",
    "prebuild:watch": "npm run extract-versions",
    prestart: "npm run extract-versions",
    "prestart:watch": "npm run extract-versions",
    start: "ng serve --port 4300",
    build: "ng build",
    "build:watch": "ng build --watch --configuration development",
  },
  private: true,
  dependencies: {
    "@angular/animations": "^20.0.0",
    "@angular/cdk": "^20.0.0",
    "@angular/common": "^20.3.9",
    "@angular/compiler": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/elements": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/localize": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/platform-browser-dynamic": "^20.0.0",
    "@angular/router": "^20.0.0",
    "@fundamental-ngx/cdk": "^0.57.3",
    "@fundamental-ngx/core": "^0.57.3",
    "@fundamental-ngx/i18n": "^0.57.3",
    "@luigi-project/client": "^2.25.1",
    "@luigi-project/core": "^2.25.1",
    "@luigi-project/plugin-auth-oauth2": "^2.25.1",
    "@openmfp/portal-ui-lib": "^0.183.1",
    "@ui5/webcomponents-ngx": "^0.5.6",
    "@ui5/webcomponents-base": "^2.14.0",
    "@ui5/webcomponents-fiori": "^2.14.0",
    "@ui5/webcomponents-icons": "^2.14.0",
    jmespath: "^0.16.0",
    "jwt-decode": "^4.0.0",
    lodash: "^4.17.21",
    rxjs: "^7.8.2",
    tslib: "^2.8.1",
    "zone.js": "^0.15.1",
  },
  devDependencies: {
    "@angular/build": "^20.0.0",
    "@angular/cli": "^20.0.0",
    "@angular/compiler-cli": "^20.0.0",
    nodemon: "^3.1.11",
    rimraf: "^6.1.2",
    typescript: "~5.8.0",
  },
};

writeFile(
  path.join(projectDir, "frontend", "package.json"),
  JSON.stringify(frontendPackageJson, null, 2)
);

const backendTsConfig = {
  compilerOptions: {
    module: "NodeNext",
    moduleResolution: "node16",
    esModuleInterop: true,
    declaration: true,
    removeComments: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    allowSyntheticDefaultImports: true,
    target: "ES2022",
    sourceMap: true,
    outDir: "./dist",
    baseUrl: "./",
    incremental: true,
    skipLibCheck: true,
    strictNullChecks: false,
    noImplicitAny: false,
    strictBindCallApply: false,
    forceConsistentCasingInFileNames: false,
    noFallthroughCasesInSwitch: false,
  },
};

writeFile(
  path.join(projectDir, "backend", "tsconfig.json"),
  JSON.stringify(backendTsConfig, null, 2)
);

const backendTsConfigBuild = {
  extends: "./tsconfig.json",
  exclude: ["node_modules", "test", "dist", "**/*spec.ts"],
};

writeFile(
  path.join(projectDir, "backend", "tsconfig.build.json"),
  JSON.stringify(backendTsConfigBuild, null, 2)
);

const nestCliJson = {
  collection: "@nestjs/schematics",
  sourceRoot: "src",
};

writeFile(
  path.join(projectDir, "backend", "nest-cli.json"),
  JSON.stringify(nestCliJson, null, 2)
);

const backendMainTs = `import { AppModule } from './app.module.js';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
`;

writeFile(path.join(projectDir, "backend", "src", "main.ts"), backendMainTs);

const backendAppModuleTs = `import { Module } from '@nestjs/common';
import { PortalModule, PortalModuleOptions } from '@openmfp/portal-server-lib';
import { config } from 'dotenv';
import * as path from 'node:path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

config({ path: './.env' });

const portalOptions: PortalModuleOptions = {
  frontendDistSources: path.join(
    __dirname,
    '../..',
    'frontend/dist/frontend/browser',
  ),
};

@Module({
  imports: [PortalModule.create(portalOptions)],
})
export class AppModule {}
`;

writeFile(path.join(projectDir, "backend", "src", "app.module.ts"), backendAppModuleTs);

const frontendTsConfig = {
  compileOnSave: false,
  compilerOptions: {
    outDir: "./dist/out-tsc",
    strict: true,
    noImplicitOverride: true,
    noPropertyAccessFromIndexSignature: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    skipLibCheck: true,
    esModuleInterop: true,
    sourceMap: true,
    declaration: false,
    experimentalDecorators: true,
    moduleResolution: "node",
    importHelpers: true,
    target: "ES2022",
    module: "ES2022",
    useDefineForClassFields: false,
    lib: ["ES2022", "dom"],
    resolveJsonModule: true,
  },
  angularCompilerOptions: {
    enableI18nLegacyMessageIdFormat: false,
    strictInjectionParameters: true,
    strictInputAccessModifiers: true,
    strictTemplates: true,
  },
};

writeFile(
  path.join(projectDir, "frontend", "tsconfig.json"),
  JSON.stringify(frontendTsConfig, null, 2)
);

const frontendTsConfigApp = {
  extends: "./tsconfig.json",
  compilerOptions: {
    outDir: "./out-tsc/app",
    types: [],
  },
  files: ["src/main.ts"],
  include: ["src/**/*.d.ts"],
};

writeFile(
  path.join(projectDir, "frontend", "tsconfig.app.json"),
  JSON.stringify(frontendTsConfigApp, null, 2)
);

const angularJson = {
  $schema: "./node_modules/@angular/cli/lib/config/schema.json",
  version: 1,
  newProjectRoot: "projects",
  projects: {
    frontend: {
      projectType: "application",
      schematics: {
        "@schematics/angular:component": {
          style: "scss",
        },
      },
      root: "",
      sourceRoot: "src",
      prefix: "app",
      architect: {
        build: {
          builder: "@angular/build:application",
          options: {
            outputPath: {
              base: "dist/frontend",
            },
            index: "src/index.html",
            polyfills: ["zone.js", "@angular/localize/init"],
            tsConfig: "tsconfig.app.json",
            inlineStyleLanguage: "scss",
            assets: [
              "src/favicon.ico",
              "src/assets",
              {
                glob: "**",
                input: "node_modules/@openmfp/portal-ui-lib/assets/",
                output: "/assets/",
              },
              {
                glob: "**",
                input: "node_modules/@luigi-project/core",
                output: "/luigi-core",
              },
            ],
            styles: ["src/styles.scss"],
            scripts: [],
            browser: "src/main.ts",
          },
          configurations: {
            production: {
              budgets: [
                {
                  type: "initial",
                  maximumWarning: "500kb",
                  maximumError: "2mb",
                },
                {
                  type: "anyComponentStyle",
                  maximumWarning: "2kb",
                  maximumError: "4kb",
                },
              ],
              fileReplacements: [
                {
                  replace: "src/environments/environment.ts",
                  with: "src/environments/environment.prod.ts",
                },
              ],
              outputHashing: "all",
            },
            development: {
              optimization: false,
              extractLicenses: false,
              sourceMap: true,
              namedChunks: true,
            },
          },
          defaultConfiguration: "production",
        },
        serve: {
          builder: "@angular/build:dev-server",
          options: {
            proxyConfig: "proxy.config.json",
          },
          configurations: {
            production: {
              buildTarget: "frontend:build:production",
            },
            development: {
              buildTarget: "frontend:build:development",
            },
          },
          defaultConfiguration: "development",
        },
      },
    },
  },
  cli: {
    analytics: false,
  },
};

writeFile(
  path.join(projectDir, "frontend", "angular.json"),
  JSON.stringify(angularJson, null, 2)
);

const proxyConfig = {
  "/rest/**": {
    target: "http://localhost:3000",
    changeOrigin: true,
    secure: false,
    logLevel: "debug",
  },
};

writeFile(
  path.join(projectDir, "frontend", "proxy.config.json"),
  JSON.stringify(proxyConfig, null, 2)
);

const frontendMainTs = `import { bootstrapApplication } from '@angular/platform-browser';
import {
  PortalComponent,
  PortalOptions,
  providePortal,
} from '@openmfp/portal-ui-lib';

const portalOptions: PortalOptions = {};

bootstrapApplication(PortalComponent, {
  providers: [providePortal(portalOptions)],
}).catch((err) => console.error(err));
`;

writeFile(path.join(projectDir, "frontend", "src", "main.ts"), frontendMainTs);

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>OpenMFP Portal</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/luigi-core/luigi_horizon.css" />
</head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <script src="/luigi-core/luigi.js"></script>
        <app-portal></app-portal>
    </body>
</html>
`;

writeFile(path.join(projectDir, "frontend", "src", "index.html"), indexHtml);

const stylesScss = `/* You can add global styles to this file, and also import other style files */
`;

writeFile(path.join(projectDir, "frontend", "src", "styles.scss"), stylesScss);

const appRoutesTs = `import { Routes } from '@angular/router';

export const routes: Routes = [];
`;

writeFile(path.join(projectDir, "frontend", "src", "app", "app.routes.ts"), appRoutesTs);

const environmentTs = `export const environment = {
  production: false,
};
`;

writeFile(
  path.join(projectDir, "frontend", "src", "environments", "environment.ts"),
  environmentTs
);

const environmentProdTs = `export const environment = {
  production: true,
};
`;

writeFile(
  path.join(projectDir, "frontend", "src", "environments", "environment.prod.ts"),
  environmentProdTs
);

const extractVersionsJs = `const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const outputPath = path.join(__dirname, '..', 'src', 'assets', 'dependencies-versions.json');

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const versions = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(versions, null, 2));
  
  console.log('✓ Dependencies versions extracted');
} catch (error) {
  console.error('Error extracting versions:', error);
  process.exit(1);
}
`;

writeFile(
  path.join(projectDir, "frontend", "build-scripts", "extract-versions.js"),
  extractVersionsJs
);

createDir(path.join(projectDir, "frontend", "src", "assets"));
writeFile(path.join(projectDir, "frontend", "src", "assets", ".gitkeep"), "");
writeFile(path.join(projectDir, "frontend", "src", "favicon.ico"), "");

const readme = `# ${projectName}

OpenMFP Portal

## Prerequisites

- Node.js >= 24.0.0
- npm >= 11.0.0

## Installation

\`\`\`bash
npm install
\`\`\`

This will install dependencies for both frontend and backend.

## Development

Start both frontend and backend in development mode:

\`\`\`bash
npm start
\`\`\`

- Frontend will be available at: http://localhost:4300
- Backend will be available at: http://localhost:3000

## Build

Build both frontend and backend:

\`\`\`bash
npm run build
\`\`\`

## Project Structure

- \`backend/\` - NestJS backend application
- \`frontend/\` - Angular frontend application

## Available Scripts

- \`npm start\` - Start both frontend and backend in development mode
- \`npm run build\` - Build both applications
- \`npm run start:ui\` - Start only frontend
- \`npm run start:server\` - Start only backend
- \`npm run build:ui\` - Build only frontend
- \`npm run build:server\` - Build only backend
`;

writeFile(path.join(projectDir, "README.md"), readme);

const gitignore = `node_modules/
dist/
.angular/
.env
*.log
coverage/
.DS_Store
.yalc/
yalc.lock
`;

writeFile(path.join(projectDir, ".gitignore"), gitignore);

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
