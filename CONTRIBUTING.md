# Contributing to Package Registry MCP Server

Thank you for your interest in contributing! This guide will help you get set up
for development.

## Prerequisites

- [Bun](https://bun.sh/) runtime (recommended) or Node.js 18+

## Getting Started

```bash
# Clone the repository
git clone https://github.com/artmann/package-registry-mcp.git
cd package-registry-mcp

# Install dependencies
bun install
```

## Development Commands

```bash
# Build the server (outputs to dist/)
bun run build

# Format code with Prettier
bun run format

# Type check
bun run typecheck
```

## Testing MCP Tools

You can test individual MCP tools locally using the `bun tool` command:

```bash
bun tool <tool-name> <json-arguments>
```

### NPM Examples

```bash
bun tool search-npm-packages '{"query": "react"}'
bun tool get-npm-package-details '{"name": "react"}'
bun tool list-npm-package-versions '{"name": "react", "limit": 50}'
```

### crates.io Examples

```bash
bun tool search-cargo-packages '{"query": "serde"}'
bun tool get-cargo-package-details '{"name": "serde"}'
bun tool list-cargo-package-versions '{"name": "serde", "limit": 50}'
```

### NuGet Examples

```bash
bun tool search-nuget-packages '{"query": "newtonsoft"}'
bun tool get-nuget-package-details '{"name": "Newtonsoft.Json"}'
bun tool list-nuget-package-versions '{"name": "Newtonsoft.Json", "limit": 50}'
```

### PyPI Examples

```bash
bun tool get-pypi-package-details '{"name": "requests"}'
bun tool list-pypi-package-versions '{"name": "django", "limit": 50}'
```

### Go Examples

```bash
bun tool get-golang-package-details '{"module": "github.com/gin-gonic/gin"}'
bun tool list-golang-package-versions '{"module": "github.com/gorilla/mux", "limit": 50}'
```

## Code Style

- Separate imports of third-party packages and local files
- Sort imports alphabetically by package name or import path
- Separate package imports from local file imports with an empty line

## Workflow

Before submitting changes:

1. Run `bun run format` to format your code
2. Run `bun run typecheck` to verify types

## Architecture

- **Runtime**: Uses Bun as the primary runtime and build tool
- **Entry point**: `src/index.ts`
- **Build target**: Node.js compatible output in `dist/`
- **Dependencies**:
  - `@modelcontextprotocol/sdk` for MCP server implementation
  - `zod` for schema validation
