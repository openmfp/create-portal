# Tests

This directory contains the test suite for the `@openmfp/create-portal` CLI tool.

## Test Structure

### Test Files

- **generate-portal.test.js** - End-to-end tests for the CLI tool
  - Project creation with default and custom names
  - Directory conflict handling
  - Package.json validation for all parts (root, frontend, backend)
  - README and .gitignore generation
  
- **generators.test.js** - Unit tests for individual generators
  - Backend generator tests
  - Frontend generator tests
  - Root generator tests
  
- **helpers.js** - Test utility functions
  - Temporary directory management
  - File system operations
  - Project structure validation

## Running Tests

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Test Coverage

- **26 total tests**
- CLI end-to-end tests: 8
- Backend generator tests: 5
- Frontend generator tests: 7
- Root generator tests: 5
- Helper utilities: 1

All tests use Node.js built-in test runner.

## Implementation Details

### Test Isolation

Each test uses temporary directories that are:
- Created before each test
- Cleaned up after each test
- Named with timestamps to avoid conflicts

### Skip Installation Flag

Tests use the `--skip-install` flag to avoid npm dependency installation during testing, which:
- Makes tests run faster
- Avoids network requirements
- Focuses on file generation logic

### Assertions

Tests verify:
- File existence and structure
- JSON content validation
- Template placeholder replacement
- Error handling
