import { z } from 'zod'

import { getPackageDetails } from '../npm'
import { server } from '../server'

server.registerTool(
  'list-npm-package-versions',
  {
    description: 'List all versions of a specific NPM package',
    inputSchema: {
      name: z.string().min(1, 'Package name must be at least 1 character long'),
      limit: z.number().min(1).max(1000).default(100).optional()
    }
  },
  async ({ name, limit = 100 }) => {
    try {
      const details = await getPackageDetails(name)

      // Get all versions sorted in descending order
      const allVersions = Object.keys(details.versions).sort((a, b) => {
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

      const limitedVersions = allVersions.slice(0, limit)

      const summary = {
        name: details.name,
        totalVersions: allVersions.length,
        versionsShown: limitedVersions.length,
        latestVersion: details['dist-tags'].latest,
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
