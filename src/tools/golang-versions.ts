import { z } from 'zod'

import { getPackageDetails } from '../golang'
import { server } from '../server'

server.registerTool(
  'list-golang-package-versions',
  {
    description: 'List all versions of a specific Go module/package',
    inputSchema: {
      module: z
        .string()
        .min(1, 'Module path must be at least 1 character long'),
      limit: z.number().min(1).max(1000).default(100).optional()
    }
  },
  async ({ module, limit = 100 }) => {
    try {
      const packageDetails = await getPackageDetails(module)

      const limitedVersions = packageDetails.versions.slice(0, limit)

      const summary = {
        module: packageDetails.module,
        totalVersions: packageDetails.totalVersions,
        versionsShown: limitedVersions.length,
        latestVersion: packageDetails.latestVersion,
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
            text: `Error fetching Go package versions: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      }
    }
  }
)
