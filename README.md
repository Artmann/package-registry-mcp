# Package Registry MCP Server

A Model Context Protocol (MCP) server that enables AI assistants and agents
(Claude, Cursor, Copilot, etc.) to search package registries and retrieve
up-to-date package information.

## Getting Started

### Claude Desktop

Add this server to your Claude Desktop by adding the following to your
`claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "package-registry": {
      "command": "npx",
      "args": ["-y", "package-registry-mcp"]
    }
  }
}
```

The config file is typically located at:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

After adding the configuration, restart Claude Desktop.

### Cursor

In Cursor, you can configure MCP servers in your settings:

1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Search for "MCP" or go to Extensions > MCP
3. Add a new server with:
   - **Name**: `package-registry`
   - **Command**: `npx`
   - **Args**: `["-y", "package-registry-mcp"]`

### Claude Code

For Claude Code, add this to your MCP configuration:

```json
{
  "mcpServers": {
    "package-registry": {
      "command": "npx",
      "args": ["-y", "package-registry-mcp"]
    }
  }
}
```

After configuration, you'll have access to package search and information tools.

## Features

- Search NPM packages
- Get detailed NPM package information
- Search Cargo crates (Rust) _[Coming Soon]_
- Search NuGet packages (.NET) _[Coming Soon]_
- Real-time data directly from package registries

## Available Tools

### `search-npm-packages`

Search the NPM registry for packages matching a query.

**Parameters:**

- `query` (string): Search term for packages
- `limit` (number, optional): Maximum number of results (1-100, default: 10)

**Example:**

```bash
bun tool search-npm-packages '{"query": "react", "limit": 5}'
```

### `get-npm-package-details`

Get detailed information about a specific NPM package.

**Parameters:**

- `name` (string): Exact package name

**Example:**

```bash
bun tool get-npm-package-details '{"name": "react"}'
```

**Returns detailed information including:**

- Package metadata (name, description, version, license)
- Dependencies (runtime, dev, peer)
- Maintainer information
- Repository and homepage links
- Last 50 versions (newest first)

### `list-npm-package-versions`

List all versions of a specific NPM package.

**Parameters:**

- `name` (string): Exact package name
- `limit` (number, optional): Maximum number of versions to return (1-1000,
  default: 100)

**Example:**

```bash
bun tool list-npm-package-versions '{"name": "react", "limit": 50}'
```

**Returns:**

- Package name and total version count
- All versions sorted by release date (newest first)
- Latest version information

## Installation

Install the package globally:

```bash
npm install -g package-registry-mcp
```

Or use directly with npx (no installation required):

```bash
npx package-registry-mcp
```

## Development

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
# Examples:
# bun tool search-npm-packages '{"query": "react"}'
# bun tool get-npm-package-details '{"name": "react"}'
# bun tool list-npm-package-versions '{"name": "react", "limit": 50}'
```

## Requirements

- Node.js 18+ or Bun runtime
- Internet connection for package registry access

## License

See LICENSE file for details.
