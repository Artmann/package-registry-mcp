import { z } from 'zod'

import { getPackageDetails } from '../nuget'
import { request } from '../request'
import { server } from '../server'

server.tool(
  'list-nuget-package-versions',
  'List all versions of a specific NuGet package',
  {
    name: z.string().min(1, 'Package name must be at least 1 character long'),
    limit: z.number().min(1).max(1000).default(100).optional()
  },
  async ({ name, limit = 100 }) => {
    try {
      const response = await getPackageDetails(name)

      // Get all versions from the response
      const allVersions: any[] = []

      // First, try to get versions from items that already have data
      response.items.forEach((item) => {
        if (item.items) {
          allVersions.push(...item.items)
        }
      })

      // If no versions found, fetch from the first page (latest versions)
      if (allVersions.length === 0 && response.items.length > 0) {
        try {
          // Fetch the latest version page (usually the last item)
          const latestPageUrl =
            response.items[response.items.length - 1]?.['@id']
          if (latestPageUrl) {
            const pageResponse = await request<any>('GET', latestPageUrl)

            if (pageResponse.items) {
              allVersions.push(...pageResponse.items)
            }
          }
        } catch (pageError) {
          console.error('Failed to fetch version page:', pageError)
        }
      }

      // Sort versions in descending order
      const sortedVersions = allVersions
        .map((v) => v.catalogEntry.version)
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

      const limitedVersions = sortedVersions.slice(0, limit)
      const latestVersionInfo = allVersions.find(
        (v) => v.catalogEntry.version === sortedVersions[0]
      )?.catalogEntry

      const summary = {
        name: latestVersionInfo?.id,
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
