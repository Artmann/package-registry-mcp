import { githubRequest } from './request'
import type {
  GetPackageAdvisoriesOptions,
  GitHubAdvisory,
  SearchAdvisoriesOptions
} from './types'

const baseUrl = 'https://api.github.com/advisories'

/**
 * Search GitHub Security Advisories with optional filters.
 */
export async function searchAdvisories(
  options: SearchAdvisoriesOptions = {}
): Promise<GitHubAdvisory[]> {
  const params = new URLSearchParams()

  if (options.ecosystem) {
    params.set('ecosystem', options.ecosystem)
  }

  if (options.severity) {
    params.set('severity', options.severity)
  }

  if (options.type) {
    params.set('type', options.type)
  }

  if (options.cveId) {
    params.set('cve_id', options.cveId)
  }

  params.set('per_page', (options.limit ?? 30).toString())

  const url = `${baseUrl}?${params.toString()}`

  return githubRequest<GitHubAdvisory[]>(url)
}

/**
 * Get security advisories affecting a specific package.
 */
export async function getPackageAdvisories(
  options: GetPackageAdvisoriesOptions
): Promise<GitHubAdvisory[]> {
  const params = new URLSearchParams()

  params.set('affects', options.packageName)
  params.set('ecosystem', options.ecosystem)

  if (options.severity) {
    params.set('severity', options.severity)
  }

  params.set('per_page', (options.limit ?? 30).toString())

  const url = `${baseUrl}?${params.toString()}`

  return githubRequest<GitHubAdvisory[]>(url)
}
