import { z } from 'zod'

import { getPackageDetails } from '../pypi'
import { server } from '../server'

server.registerTool(
  'list-pypi-package-versions',
  {
    description: 'List all versions of a specific PyPI package',
    inputSchema: {
      name: z.string().min(1, 'Package name must be at least 1 character long'),
      limit: z.number().min(1).max(1000).default(100).optional()
    }
  },
  async ({ name, limit = 100 }) => {
    try {
      const response = await getPackageDetails(name)

      // Get all version numbers and sort them
      const allVersions = Object.keys(response.releases)
      const sortedVersions = allVersions.sort((a, b) => {
        // Simple version comparison - works for most semver cases
        const aParts = a.split('.').map(Number)
        const bParts = b.split('.').map(Number)

        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aPart = aParts[i] || 0
          const bPart = bParts[i] || 0

          if (aPart !== bPart) {
            return bPart - aPart // Descending order
          }
        }

        return 0
      })

      const limitedVersions = sortedVersions.slice(0, limit)

      const summary = {
        name: response.info.name,
        totalVersions: sortedVersions.length,
        versionsShown: limitedVersions.length,
        latestVersion: sortedVersions[0],
        versions: limitedVersions
      }

      const text = JSON.stringify(summary, null, 2)

      return {
        content: [
          {
            type: 'text',
            text: text
          }
        ]
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error fetching package versions: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      }
    }
  }
)
