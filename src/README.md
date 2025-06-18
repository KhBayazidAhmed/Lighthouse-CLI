# Lighthouse CLI - Code Structure

This document describes the organized structure of the Lighthouse CLI codebase.

## Directory Structure

```
src/
├── index.ts                 # Main entry point
├── commands/               # CLI command definitions
│   └── index.ts
├── services/               # Business logic services
│   ├── audit.ts           # Single audit functionality
│   ├── batch.ts           # Batch audit functionality
│   ├── compare.ts         # URL comparison functionality
│   └── monitor.ts         # Monitoring functionality
├── utils/                  # Utility functions
│   ├── lighthouse.ts      # Lighthouse-specific utilities
│   ├── file.ts           # File operations
│   ├── display.ts        # Console output formatting
│   └── report.ts         # Report generation
├── types/                  # TypeScript type definitions
│   └── index.ts
└── constants/              # Application constants
    └── index.ts
```

## Architecture Overview

### Separation of Concerns

1. **Entry Point** (`index.ts`): Minimal main file that sets up the CLI program
2. **Commands** (`commands/`): CLI command definitions and option parsing
3. **Services** (`services/`): Core business logic for each feature
4. **Utils** (`utils/`): Reusable utility functions
5. **Types** (`types/`): TypeScript interfaces and type definitions
6. **Constants** (`constants/`): Configuration values and defaults

### Key Design Principles

- **Single Responsibility**: Each module has a clear, focused purpose
- **Dependency Injection**: Services depend on utilities, not the other way around
- **Type Safety**: Strong TypeScript typing throughout
- **Reusability**: Common functionality extracted into utilities
- **Maintainability**: Small, focused functions that are easy to test and modify

## Module Descriptions

### Services
- `audit.ts`: Handles single URL audits with spinner and output
- `batch.ts`: Manages multiple URL audits with concurrency control
- `compare.ts`: Compares performance metrics between two URLs
- `monitor.ts`: Continuous monitoring with alerting

### Utils
- `lighthouse.ts`: Chrome launcher and Lighthouse configuration
- `file.ts`: File I/O operations and path management
- `display.ts`: Console output formatting and colors
- `report.ts`: Report generation in different formats

### Benefits of This Structure

1. **Easier Testing**: Each module can be tested independently
2. **Better Maintainability**: Changes are localized to specific modules
3. **Improved Readability**: Code is organized by functionality
4. **Reduced Coupling**: Modules have clear interfaces and dependencies
5. **Scalability**: Easy to add new features without affecting existing code

## Usage

The refactored code maintains the same CLI interface while providing a much cleaner internal structure for development and maintenance. 