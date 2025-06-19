#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { server } from './server'
import './tools/cargo-details'
import './tools/cargo-search'
import './tools/cargo-versions'
import './tools/npm-details'
import './tools/npm-search'
import './tools/npm-versions'
import './tools/nuget-details'
import './tools/nuget-search'
import './tools/nuget-versions'
import './tools/pypi-details'
import './tools/pypi-versions'

async function main() {
  const transport = new StdioServerTransport()

  await server.connect(transport)

  console.error('Package Registry MCP Server running on stdio.')
}

main().catch((error) => {
  console.error('A fatal error occurred.', error)

  process.exit(1)
})
