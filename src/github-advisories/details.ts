import { githubRequest } from './request'
import type { GitHubAdvisory } from './types'

const baseUrl = 'https://api.github.com/advisories'

/**
 * Get details of a specific GitHub Security Advisory by its GHSA ID.
 */
export async function getAdvisoryDetails(
  ghsaId: string
): Promise<GitHubAdvisory> {
  const url = `${baseUrl}/${encodeURIComponent(ghsaId)}`

  return githubRequest<GitHubAdvisory>(url)
}
