import { z } from 'zod'

import { getPackageDetails } from '../cargo'
import { server } from '../server'

server.registerTool(
  'get-cargo-package-details',
  {
    description: 'Get detailed information about a specific Cargo package',
    inputSchema: {
      name: z.string().min(1, 'Package name must be at least 1 character long')
    }
  },
  async ({ name }) => {
    try {
      const response = await getPackageDetails(name)
      const details = response.crate

      const latestVersion = details.max_version
      const latestVersionInfo = response.versions.find(
        (v) => v.num === latestVersion
      )

      // Get last 50 versions sorted in descending order
      const allVersions = response.versions
        .map((v) => v.num)
        .sort((a, b) => {
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
        .slice(0, 50)

      const summary = {
        name: details.name,
        description: details.description,
        latestVersion: latestVersion,
        maxStableVersion: details.max_stable_version,
        license: latestVersionInfo?.license,
        homepage: details.homepage,
        repository: details.repository,
        documentation: details.documentation,
        keywords: response.keywords?.map((k) => k.keyword),
        categories: response.categories?.map((c) => c.category),
        downloads: details.downloads,
        recentDownloads: details.recent_downloads,
        features: latestVersionInfo?.features,
        crateSize: latestVersionInfo?.crate_size,
        versions: allVersions,
        totalVersions: response.versions.length
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
            text: `Error fetching package details: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      }
    }
  }
)
