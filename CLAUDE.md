# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server that enables AI assistants to
search package registries (NPM, Cargo, NuGet) and retrieve up-to-date package
information. The server exposes tools for searching packages and getting
detailed package metadata.

## Common Commands

```bash
# Install dependencies
bun install

# Build the server (outputs to dist/)
bun run build

# Format code with Prettier
bun run format

# Test individual MCP tools
bun tool <tool-name> <json-arguments>
# Examples:
# bun tool search-npm-packages '{"query": "react"}'
# bun tool get-npm-package-details '{"name": "react"}'
# bun tool list-npm-package-versions '{"name": "react", "limit": 50}'
```

## Architecture

- **Runtime**: Uses Bun as the primary runtime and build tool
- **Entry point**: `src/index.ts` (currently contains placeholder code)
- **Build target**: Node.js compatible output in `dist/`
- **Dependencies**:
  - `@modelcontextprotocol/sdk` for MCP server implementation
  - `zod` for schema validation
- **Package manager**: Yarn (specified in packageManager field)

## TypeScript Configuration

The project uses strict TypeScript with modern ESNext features and bundler
module resolution. Key settings:

- Strict mode enabled with additional safety checks
- Bundle-compatible module resolution
- ESNext target for latest JavaScript features

## Code Style Guidelines

- Separate imports of third party packages and local files
- Sort import in alphabetical order, based on the package name or import path.
  Separate packages and local file imports with an empty line.

## Development Workflow

- Run bun format and bun typecheck when you've finished making changes
