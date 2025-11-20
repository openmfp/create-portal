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

## License

ISC

## Repository

- GitHub: [@openmfp/create-portal](https://github.com/openmfp/create-portal)
- npm: [@openmfp/create-portal](https://www.npmjs.com/package/@openmfp/create-portal)
- Issues: [Report issues](https://github.com/openmfp/create-portal/issues)

## Support

For questions and support, please open an issue on the GitHub repository.
