# Package Registry MCP Server

A Model Context Protocol (MCP) server that enables AI assistants and agents
(Claude, Cursor, Copilot, etc.) to search package registries and retrieve
up-to-date package information.

<p align="center">
   <a href="https://www.npmjs.com/package/package-registry-mcp">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/package-registry-mcp" />
   </a>
   <a href="https://www.npmjs.com/package/package-registry-mcp">
      <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/package-registry-mcp" />
   </a>
   <a href="https://github.com/Artmann/package-registry-mcp/blob/main/LICENSE">
      <img alt="License" src="https://img.shields.io/github/license/Artmann/package-registry-mcp" />
   </a>
   <a href="https://nodejs.org">
      <img alt="Node.js" src="https://img.shields.io/node/v/package-registry-mcp" />
   </a>
   <a href="https://github.com/Artmann/package-registry-mcp">
      <img alt="GitHub Stars" src="https://img.shields.io/github/stars/Artmann/package-registry-mcp" />
   </a>
   <a href="https://archestra.ai/mcp-catalog/artmann__package-registry-mcp">
      <img alt="Trust Score" src="https://archestra.ai/mcp-catalog/api/badge/quality/artmann/package-registry-mcp" />
   </a>
</p>

## Getting Started

### Cursor

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=package-registry&config=eyJjb21tYW5kIjoibnB4IHBhY2thZ2UtcmVnaXN0cnktbWNwIn0%3D)

Alternatively, in Cursor, you can configure MCP servers in your settings:

1. Open Cursor Settings (`Cmd/Ctrl + ,`)
2. Search for "MCP" or go to Extensions > MCP
3. Add a new server with:
   - **Name**: `package-registry`
   - **Command**: `npx`
   - **Args**: `["package-registry-mcp"]`

### Claude Code

For Claude Code, run the following command in your terminal:

```shell
claude mcp add -s user package-registry npx package-registry-mcp

```

After configuration, you'll have access to package search and information tools.

### Claude Desktop

Add this server to your Claude Desktop by adding the following to your
`claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "package-registry": {
      "command": "npx",
      "args": ["package-registry-mcp"]
    }
  }
}
```

The config file is typically located at:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

After adding the configuration, restart Claude Desktop.

## Features

- Search NPM packages
- Get detailed NPM package information
- Search crates.io (Rust package registry)
- Get detailed crate information
- Search NuGet packages (.NET package registry)
- Get detailed NuGet package information
- Get detailed PyPI package information (Python package registry)
- Get detailed Go module information (Go package registry)
- Search GitHub Security Advisories for vulnerabilities
- Real-time data directly from package registries

## Available Tools

### NPM Tools

#### `search-npm-packages`

Search the NPM registry for packages matching a query.

**Parameters:**

- `query` (string): Search term for packages
- `limit` (number, optional): Maximum number of results (1-100, default: 10)

**Example:**

```bash
bun tool search-npm-packages '{"query": "react", "limit": 5}'
```

#### `get-npm-package-details`

Get detailed information about a specific NPM package.

**Parameters:**

- `name` (string): Exact crate name

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

#### `list-npm-package-versions`

List all versions of a specific NPM package.

**Parameters:**

- `name` (string): Exact crate name
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

### crates.io Tools

#### `search-cargo-packages`

Search crates.io for Rust crates matching a query.

**Parameters:**

- `query` (string): Search term for crates
- `limit` (number, optional): Maximum number of results (1-100, default: 10)

**Example:**

```bash
bun tool search-cargo-packages '{"query": "serde", "limit": 5}'
```

#### `get-cargo-package-details`

Get detailed information about a specific crate from crates.io.

**Parameters:**

- `name` (string): Exact crate name

**Example:**

```bash
bun tool get-cargo-package-details '{"name": "serde"}'
```

**Returns detailed information including:**

- Crate metadata (name, description, version, license)
- Keywords and categories
- Download statistics (total and recent)
- Features and crate size
- Repository, homepage, and documentation links
- Last 50 versions (newest first)

#### `list-cargo-package-versions`

List all versions of a specific crate from crates.io.

**Parameters:**

- `name` (string): Exact crate name
- `limit` (number, optional): Maximum number of versions to return (1-1000,
  default: 100)

**Example:**

```bash
bun tool list-cargo-package-versions '{"name": "serde", "limit": 50}'
```

**Returns:**

- Crate name and total version count
- All versions sorted by release date (newest first)
- Latest and max stable version information

### NuGet Tools

#### `search-nuget-packages`

Search the NuGet registry for .NET packages matching a query.

**Parameters:**

- `query` (string): Search term for packages
- `limit` (number, optional): Maximum number of results (1-100, default: 10)

**Example:**

```bash
bun tool search-nuget-packages '{"query": "newtonsoft", "limit": 5}'
```

#### `get-nuget-package-details`

Get detailed information about a specific NuGet package.

**Parameters:**

- `name` (string): Exact package name

**Example:**

```bash
bun tool get-nuget-package-details '{"name": "Newtonsoft.Json"}'
```

**Returns detailed information including:**

- Package metadata (name, description, version, license)
- Authors and project information
- Target frameworks and dependencies
- Download statistics and verification status
- Project, license, and icon URLs
- Last 50 versions (newest first)

#### `list-nuget-package-versions`

List all versions of a specific NuGet package.

**Parameters:**

- `name` (string): Exact package name
- `limit` (number, optional): Maximum number of versions to return (1-1000,
  default: 100)

**Example:**

```bash
bun tool list-nuget-package-versions '{"name": "Newtonsoft.Json", "limit": 50}'
```

**Returns:**

- Package name and total version count
- All versions sorted by release date (newest first)
- Latest version information

### PyPI Tools

Note: PyPI does not provide a JSON search API, so only package details and
version listing are supported. For searching, please use the PyPI website
directly at https://pypi.org/search/.

#### `get-pypi-package-details`

Get detailed information about a specific PyPI package.

**Parameters:**

- `name` (string): Exact package name

**Example:**

```bash
bun tool get-pypi-package-details '{"name": "requests"}'
```

**Returns detailed information including:**

- Package metadata (name, description, version, license)
- Author and maintainer information
- Dependencies and Python version requirements
- Classifiers and keywords
- Project URLs and documentation links
- Download statistics
- Vulnerability information
- Last 50 versions (newest first)

#### `list-pypi-package-versions`

List all versions of a specific PyPI package.

**Parameters:**

- `name` (string): Exact package name
- `limit` (number, optional): Maximum number of versions to return (1-1000,
  default: 100)

**Example:**

```bash
bun tool list-pypi-package-versions '{"name": "django", "limit": 50}'
```

**Returns:**

- Package name and total version count
- All versions sorted by release date (newest first)
- Latest version information

### Go Tools

Note: pkg.go.dev does not provide a JSON search API, so only package details and
version listing are supported. For searching, please use the pkg.go.dev website
directly at https://pkg.go.dev/search/.

#### `get-golang-package-details`

Get detailed information about a specific Go module/package.

**Parameters:**

- `module` (string): Exact module path (e.g., "github.com/gin-gonic/gin")

**Example:**

```bash
bun tool get-golang-package-details '{"module": "github.com/gin-gonic/gin"}'
```

**Returns detailed information including:**

- Module path and latest version
- Publication date and repository information
- VCS (version control system) details
- pkg.go.dev and go get command links
- Last 50 versions (newest first)

#### `list-golang-package-versions`

List all versions of a specific Go module/package.

**Parameters:**

- `module` (string): Exact module path
- `limit` (number, optional): Maximum number of versions to return (1-1000,
  default: 100)

**Example:**

```bash
bun tool list-golang-package-versions '{"module": "github.com/gorilla/mux", "limit": 50}'
```

**Returns:**

- Module path and total version count
- All versions sorted by release date (newest first)
- Latest version information

### GitHub Security Advisory Tools

#### `search-github-advisories`

Search the GitHub Security Advisory Database for vulnerabilities.

**Parameters:**

- `ecosystem` (string, optional): Filter by package ecosystem (`npm`, `pip`,
  `maven`, `nuget`, `go`, `rust`, `rubygems`, `composer`, `pub`, `swift`,
  `erlang`, `actions`, `other`)
- `severity` (string, optional): Filter by severity level (`unknown`, `low`,
  `medium`, `high`, `critical`)
- `type` (string, optional): Filter by advisory type (`reviewed`, `malware`,
  `unreviewed`)
- `cveId` (string, optional): Filter by CVE identifier
- `limit` (number, optional): Maximum number of results (1-100, default: 30)

**Example:**

```bash
bun tool search-github-advisories '{"ecosystem": "npm", "severity": "critical", "limit": 5}'
```

#### `get-github-advisory`

Get detailed information about a specific GitHub Security Advisory.

**Parameters:**

- `ghsaId` (string): The GHSA identifier (e.g., `GHSA-grv7-fg5c-xmjg`)

**Example:**

```bash
bun tool get-github-advisory '{"ghsaId": "GHSA-grv7-fg5c-xmjg"}'
```

**Returns detailed information including:**

- Advisory metadata (GHSA ID, CVE ID, summary, description)
- Severity and CVSS score
- Affected packages and vulnerable version ranges
- Patched versions
- CWE classifications
- References and credits

#### `get-package-advisories`

Get all security advisories affecting a specific package.

**Parameters:**

- `ecosystem` (string): The package ecosystem (`npm`, `pip`, `maven`, etc.)
- `packageName` (string): The package name (e.g., `braces`, `lodash`)
- `severity` (string, optional): Filter by severity level
- `limit` (number, optional): Maximum number of results (1-100, default: 30)

**Example:**

```bash
bun tool get-package-advisories '{"ecosystem": "npm", "packageName": "braces"}'
```

**Returns:**

- All known security advisories for the specified package
- Vulnerable version ranges and patched versions
- Severity ratings and CVSS scores

## Installation

Install the package globally:

```bash
npm install -g package-registry-mcp
```

Or use directly with npx (no installation required):

```bash
npx package-registry-mcp
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## Requirements

- Node.js 18+ or Bun runtime
- Internet connection for package registry access

## License

See LICENSE file for details.
