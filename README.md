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
npx @openmfp/create-portal
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
## Repository

- GitHub: [@openmfp/create-portal](https://github.com/openmfp/create-portal)
- npm: [@openmfp/create-portal](https://www.npmjs.com/package/@openmfp/create-portal)

## Contributing

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file in this repository for instructions on how to contribute to openMFP.

## Code of Conduct

Please refer to the [CODE_OF_CONDUCT.md](https://github.com/openmfp/create-portal?tab=coc-ov-file) file in this repository for information on the expected Code of Conduct for contributing to openMFP.

## Licensing

Please see our [LICENSE](https://github.com/openmfp/create-portal?tab=coc-ov-file) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/openmfp/create-portal).

## Support

For questions and support, please open an issue on the GitHub repository.
