import { z } from 'zod'

import { getPackageDetails } from '../golang'
import { server } from '../server'

server.tool(
  'get-golang-package-details',
  'Get detailed information about a specific Go module/package',
  {
    module: z.string().min(1, 'Module path must be at least 1 character long')
  },
  async ({ module }) => {
    try {
      const packageDetails = await getPackageDetails(module)

      // Get last 50 versions
      const last50Versions = packageDetails.versions.slice(0, 50)

      const summary = {
        module: packageDetails.module,
        latestVersion: packageDetails.latestVersion,
        publishedAt: packageDetails.publishedAt,
        repositoryUrl: packageDetails.repositoryUrl,
        vcs: packageDetails.vcs,
        versions: last50Versions,
        totalVersions: packageDetails.totalVersions,
        packageUrl: `https://pkg.go.dev/${packageDetails.module}`,
        goGetCommand: `go get ${packageDetails.module}@${packageDetails.latestVersion}`
      }

      const text = JSON.stringify({ package: summary }, null, 2)

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
            text: `Error fetching Go package details: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      }
    }
  }
)
