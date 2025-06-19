#!/usr/bin/env bun

import { spawn } from 'child_process'
import path from 'path'

async function testTool() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.error('Usage: bun tool <tool-name> <json-arguments>')
    console.error(
      'Example: bun tool search-npm-packages \'{"query": "react"}\''
    )
    process.exit(1)
  }

  const toolName = args[0]
  const toolArgsString = args[1]

  if (!toolArgsString) {
    console.error('Missing JSON arguments')
    process.exit(1)
  }

  let toolArgs: any

  try {
    toolArgs = JSON.parse(toolArgsString)
  } catch (error) {
    console.error('Invalid JSON arguments:', error)
    process.exit(1)
  }

  // Create MCP request for calling a tool
  const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: toolArgs
    }
  }

  return new Promise((resolve, reject) => {
    const serverPath = path.join(process.cwd(), 'src/index.ts')
    const child = spawn('bun', ['run', serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    child.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    child.on('close', (code) => {
      if (code !== 0) {
        console.error('Server stderr:', stderr)
        reject(new Error(`Server exited with code ${code}`))
        return
      }

      try {
        // Parse the JSON-RPC response
        const lines = stdout.trim().split('\n')
        const responseLine = lines.find((line) => {
          try {
            const parsed = JSON.parse(line)
            return parsed.id === 1 && parsed.result
          } catch {
            return false
          }
        })

        if (responseLine) {
          const response = JSON.parse(responseLine)
          console.log(JSON.stringify(response.result, null, 2))
        } else {
          console.log('Raw output:', stdout)
        }
        resolve(null)
      } catch (error) {
        reject(error)
      }
    })

    // Send the tool call request
    child.stdin.write(JSON.stringify(request) + '\n')
    child.stdin.end()
  })
}

testTool().catch(console.error)
