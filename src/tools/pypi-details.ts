import { z } from 'zod'

import { getPackageDetails } from '../pypi'
import { server } from '../server'

server.tool(
  'get-pypi-package-details',
  'Get detailed information about a specific PyPI package',
  {
    name: z.string().min(1, 'Package name must be at least 1 character long')
  },
  async ({ name }) => {
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

      const last50Versions = sortedVersions.slice(0, 50)

      const summary = {
        name: response.info.name,
        summary: response.info.summary,
        description: response.info.description,
        latestVersion: response.info.version,
        author: response.info.author,
        authorEmail: response.info.author_email,
        maintainer: response.info.maintainer,
        maintainerEmail: response.info.maintainer_email,
        license: response.info.license,
        homePage: response.info.home_page,
        projectUrl: response.info.project_url,
        projectUrls: response.info.project_urls,
        requiresPython: response.info.requires_python,
        requiresDist: response.info.requires_dist,
        classifiers: response.info.classifiers,
        keywords: response.info.keywords,
        platform: response.info.platform,
        downloads: response.info.downloads,
        yanked: response.info.yanked,
        yankedReason: response.info.yanked_reason,
        vulnerabilities: response.vulnerabilities,
        versions: last50Versions,
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
