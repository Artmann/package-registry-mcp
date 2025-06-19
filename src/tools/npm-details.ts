import { z } from 'zod'

import { getPackageDetails } from '../npm'
import { server } from '../server'

server.tool(
  'get-npm-package-details',
  'Get detailed information about a specific NPM package',
  {
    name: z.string().min(1, 'Package name must be at least 1 character long')
  },
  async ({ name }) => {
    try {
      const details = await getPackageDetails(name)

      const latestVersion = details['dist-tags'].latest
      const latestVersionInfo = details.versions[latestVersion]

      // Get last 50 versions sorted in descending order
      const allVersions = Object.keys(details.versions)
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
        license: details.license,
        homepage: details.homepage,
        repository: details.repository,
        author: details.author,
        maintainers: details.maintainers,
        keywords: details.keywords,
        dependencies: latestVersionInfo?.dependencies,
        devDependencies: latestVersionInfo?.devDependencies,
        peerDependencies: latestVersionInfo?.peerDependencies,
        engines: latestVersionInfo?.engines,
        scripts: latestVersionInfo?.scripts,
        main: latestVersionInfo?.main,
        bugs: details.bugs,
        versions: allVersions,
        totalVersions: allVersions.length
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
