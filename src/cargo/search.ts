import { request } from '../request'

interface SearchOptions {
  limit: number
}

/**
 * Searches for cargo packages.
 */
export async function search(
  query: string,
  { limit }: SearchOptions
): Promise<SearchResult[]> {
  const params = new URLSearchParams()

  params.set('per_page', limit.toString())
  params.set('q', query)

  const url = `https://crates.io/api/v1/crates?${params.toString()}`

  const response = await request<SearchResponse>('GET', url)

  return response.crates
}

interface SearchResponse {
  crates: SearchResult[]
  meta: {
    total: number
    next_page?: string
    prev_page?: string
  }
}

export interface SearchResult {
  id: string
  name: string
  updated_at: string
  versions: Array<{
    id: number
    crate: string
    num: string
    dl_path: string
    readme_path: string
    updated_at: string
    created_at: string
    downloads: number
    features: Record<string, any>
    yanked: boolean
    license: string
    links: {
      dependencies: string
      version_downloads: string
      authors: string
    }
    crate_size: number
    published_by: {
      id: number
      login: string
      name: string
      avatar: string
      url: string
    }
    audit_actions: Array<{
      action: string
      user: {
        id: number
        login: string
        name: string
        avatar: string
        url: string
      }
      time: string
    }>
  }>
  keywords: Array<{
    id: string
    keyword: string
    crates_cnt: number
    created_at: string
  }>
  categories: Array<{
    id: string
    category: string
    slug: string
    description: string
    crates_cnt: number
    created_at: string
  }>
  badges: Array<{
    badge_type: string
    attributes: Record<string, any>
  }>
  created_at: string
  downloads: number
  recent_downloads: number
  max_version: string
  max_stable_version: string
  description: string
  homepage: string
  documentation: string
  repository: string
  links: {
    version_downloads: string
    versions: string
    owners: string
    owner_team: string
    owner_user: string
    reverse_dependencies: string
  }
  exact_match: boolean
}
