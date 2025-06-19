import { z } from 'zod'

import { getPackageDetails } from '../nuget'
import { request } from '../request'
import { server } from '../server'

server.tool(
  'get-nuget-package-details',
  'Get detailed information about a specific NuGet package',
  {
    name: z.string().min(1, 'Package name must be at least 1 character long')
  },
  async ({ name }) => {
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
          // Fetch the latest version page (usually the first item)
          const latestPageUrl = response.items[response.items.length - 1]['@id']
          const pageResponse = await request<any>('GET', latestPageUrl)

          if (pageResponse.items) {
            allVersions.push(...pageResponse.items)
          }
        } catch (pageError) {
          console.error('Failed to fetch version page:', pageError)
        }
      }

      // Sort versions in descending order
      const sortedVersions = allVersions.sort((a, b) => {
        const aVersion = a.catalogEntry.version
        const bVersion = b.catalogEntry.version
        const aParts = aVersion.split('.').map(Number)
        const bParts = bVersion.split('.').map(Number)

        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aPart = aParts[i] || 0
          const bPart = bParts[i] || 0

          if (aPart !== bPart) {
            return bPart - aPart // Descending order
          }
        }

        return 0
      })

      const latestVersion = sortedVersions[0]?.catalogEntry
      const last50Versions = sortedVersions
        .slice(0, 50)
        .map((v) => v.catalogEntry.version)

      const summary = {
        name: latestVersion?.id,
        description: latestVersion?.description,
        latestVersion: latestVersion?.version,
        title: latestVersion?.title,
        authors: latestVersion?.authors
          ?.split(',')
          .map((a: string) => a.trim()),
        license: latestVersion?.licenseExpression || latestVersion?.licenseUrl,
        projectUrl: latestVersion?.projectUrl,
        iconUrl: latestVersion?.iconUrl,
        tags: latestVersion?.tags,
        published: latestVersion?.published,
        listed: latestVersion?.listed,
        requireLicenseAcceptance: latestVersion?.requireLicenseAcceptance,
        minClientVersion: latestVersion?.minClientVersion,
        dependencies: latestVersion?.dependencyGroups?.map((group) => ({
          targetFramework: group.targetFramework,
          dependencies: group.dependencies?.map((dep) => ({
            id: dep.id,
            range: dep.range
          }))
        })),
        vulnerabilities: latestVersion?.vulnerabilities,
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
