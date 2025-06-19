import { request } from '../request'
import type {
  GoModuleInfo,
  GoModuleVersionList,
  GoPackageDetails
} from './types'

export async function getPackageDetails(
  module: string
): Promise<GoPackageDetails> {
  try {
    // Get latest version info
    const latestUrl = `https://proxy.golang.org/${module}/@latest`
    const latestInfo = await request<GoModuleInfo>('GET', latestUrl)

    // Get all versions (this endpoint returns plain text, not JSON)
    const versionsUrl = `https://proxy.golang.org/${module}/@v/list`
    const response = await fetch(versionsUrl)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const versionsText = await response.text()
    const versions = versionsText
      .trim()
      .split('\n')
      .filter((v) => v.length > 0)

    // Sort versions in descending order (basic semver sorting)
    const sortedVersions = versions.sort((a, b) => {
      // Remove 'v' prefix for comparison
      const aClean = a.replace(/^v/, '')
      const bClean = b.replace(/^v/, '')

      const aParts = aClean.split('.').map((part) => {
        // Handle pre-release versions and additional parts
        const num = parseInt(part.split('-')[0] || '0')
        return isNaN(num) ? 0 : num
      })
      const bParts = bClean.split('.').map((part) => {
        const num = parseInt(part.split('-')[0] || '0')
        return isNaN(num) ? 0 : num
      })

      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aPart = aParts[i] || 0
        const bPart = bParts[i] || 0

        if (aPart !== bPart) {
          return bPart - aPart // Descending order
        }
      }

      return 0
    })

    return {
      module,
      latestVersion: latestInfo.Version,
      publishedAt: latestInfo.Time,
      repositoryUrl: latestInfo.Origin?.URL,
      vcs: latestInfo.Origin?.VCS,
      versions: sortedVersions,
      totalVersions: versions.length
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch Go module details: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
