# Package Registry MCP Server

A Model Context Protocol (MCP) server that enables AI assistants and agents
(Claude, Cursor, Copilot, etc.) to search package registries and retrieve
up-to-date package information.

## Features

- Search NPM packages
- Search Cargo crates (Rust)
- Search NuGet packages (.NET)
- Get detailed package information including versions, dependencies, and
  metadata
- Real-time data directly from package registries

## Installation

```bash
npm install
# or
bun install
# or
yarn install
```

## Development

```bash
# Install dependencies
bun install

# Build the server
bun run build

# Format code
bun run format

# Test individual MCP tools
bun tool <tool-name> <json-arguments>
# Example: bun tool search-npm-packages '{"query": "react"}'
```

## Requirements

- Node.js 18+ or Bun runtime
- Internet connection for package registry access

## License

See LICENSE file for details.
