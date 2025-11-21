# @openmfp/create-portal

A CLI tool for scaffolding OpenMFP Portal projects with a full-stack setup.

## Overview

`create-portal` is a project generator that creates a complete OpenMFP Portal application with:

- **Frontend**: Angular application with OpenMFP Portal UI library
- **Backend**: NestJS server with OpenMFP Portal server library
- Pre-configured build and development scripts
- Modern development environment setup

## Prerequisites

- Node.js >= 24.0.0
- npm >= 11.0.0

## Installation

### Using npx

```bash
npx @openmfp/create-portal my-portal
```

### Custom Project Name

Create a portal with a specific name:

```bash
npx @openmfp/create-portal my-awesome-portal
```

The script will:

1. Create the project directory
2. Generate all necessary configuration files
3. Set up frontend and backend structures
4. Install all dependencies automatically
5. Display the complete project structure

## Generated Project Structure

```
my-portal/
├── backend/
│   ├── src/
│   │   ├── main.ts
│   │   └── app.module.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.build.json
│   └── nest-cli.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── app.routes.ts
│   │   ├── assets/
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── build-scripts/
│   │   └── extract-versions.js
│   ├── angular.json
│   ├── package.json
│   ├── proxy.config.json
│   ├── tsconfig.json
│   └── tsconfig.app.json
├── package.json
├── README.md
└── .gitignore
```

## Generated Project Features

### Backend (NestJS)

- **Framework**: NestJS with Express
- **Dependencies**:
  - `@openmfp/portal-server-lib` - OpenMFP Portal server library
  - `@nestjs/serve-static` - Static file serving
  - TypeScript support with ES modules
- **Configuration**:
  - TypeScript configuration for Node 16+ with ES modules
  - NestJS CLI configuration
  - Static file serving from frontend build

### Frontend (Angular)

- **Framework**: Angular 20+
- **UI Libraries**:
  - `@openmfp/portal-ui-lib` - OpenMFP Portal UI components
  - `@luigi-project/core` & `@luigi-project/client` - Micro-frontend framework
  - `@fundamental-ngx/core` - SAP Fundamental library
  - `@ui5/webcomponents-ngx` - UI5 Web Components
- **Features**:
  - Development proxy configuration for backend API
  - Environment-based configuration
  - Asset management and bundling
  - Dependency version extraction script

### Root Level

- **Monorepo Setup**: Manages both frontend and backend
- **Concurrency**: Parallel execution of frontend and backend scripts
- **Scripts**: Unified commands to build, start, and develop both applications

## Available Scripts in Generated Project

### Root Directory

```bash
npm install            # Install all dependencies (root, frontend, backend)
npm start              # Start both frontend and backend
npm run build          # Build both applications
npm run start:watch    # Start with watch mode for development
```

### Individual Components

```bash
npm run start:ui       # Start frontend only
npm run start:server   # Start backend only
npm run build:ui       # Build frontend only
npm run build:server   # Build backend only
```

## Development Workflow

After creating a new portal:

```bash
cd my-portal
npm start
```

The application will be available at:

- **Frontend**: http://localhost:4300
- **Backend**: http://localhost:3000

The frontend includes a proxy configuration that forwards `/rest/**` requests to the backend server.

## Build & Deployment

### Build for Production

```bash
npm run build
```

This creates optimized builds:

- Frontend build: `frontend/dist/frontend/browser/`
- Backend build: `backend/dist/`

The backend serves both the API and the static frontend files.

## Configuration

### Portal Options

Customize the portal behavior by modifying:

- **Backend**: `backend/src/app.module.ts` - `PortalModuleOptions`
- **Frontend**: `frontend/src/main.ts` - `PortalOptions`

## Troubleshooting

### Directory Already Exists

If the target directory already exists, the script will exit with an error. Choose a different project name or remove the existing directory.

### Dependency Installation Fails

If automatic installation fails, you can manually install dependencies:

```bash
cd my-portal
npm install
cd frontend && npm install
cd ../backend && npm install
```

### Node Version Mismatch

Ensure you have Node.js version 24 or higher:

```bash
node --version
```

## Development

### Running Tests

This project includes comprehensive tests for the CLI tool and generators:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Test Coverage

The test suite includes:

- **CLI Tests**: End-to-end tests for the project generation process
- **Generator Tests**: Unit tests for backend, frontend, and root generators
- **Structure Tests**: Validation of generated project structure and files

All tests use Node.js built-in test runner (requires Node.js >= 18).

### Skip Dependency Installation

For testing or development purposes, you can skip automatic dependency installation:

```bash
npx @openmfp/create-portal my-portal --skip-install
```

Then manually install dependencies:

```bash
cd my-portal
npm install
```

## Technologies

### Core Technologies

- **TypeScript** - Type-safe JavaScript
- **Node.js** - JavaScript runtime
- **Angular** - Frontend framework
- **NestJS** - Backend framework

### OpenMFP Libraries

- `@openmfp/portal-ui-lib` - Portal UI components and utilities
- `@openmfp/portal-server-lib` - Portal server functionality

### UI Libraries

- **Luigi Project** - Micro-frontend framework
- **SAP Fundamental NGX** - Enterprise UI components
- **UI5 Web Components** - SAP UI5 components for Angular

## Repository

- GitHub: [@openmfp/create-portal](https://github.com/openmfp/create-portal)
- npm: [@openmfp/create-portal](https://www.npmjs.com/package/@openmfp/create-portal)
- Issues: [Report issues](https://github.com/openmfp/create-portal/issues)

## Contributing

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file in this repository for instructions on how to contribute to openMFP.

## Code of Conduct

Please refer to the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file in this repository for information on the expected Code of Conduct for contributing to openMFP.

## Licensing

Copyright 2025 SAP SE or an SAP affiliate company and openMFP contributors. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/openmfp/portal).


## Support

For questions and support, please open an issue on the GitHub repository.
