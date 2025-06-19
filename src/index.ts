import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { server } from './server'
import './tools/npm-search' // Import to register tools

async function main() {
  const transport = new StdioServerTransport()

  await server.connect(transport)

  console.error('Package Registry MCP Server running on stdio.')
}

main().catch((error) => {
  console.error('A fatal error occurred.', error)

  process.exit(1)
})
