import { request } from '../request'

interface SearchOptions {
  limit: number
}

/**
 * Searches for npm packages.
 */
export async function search(
  query: string,
  { limit }: SearchOptions
): Promise<SearchResult[]> {
  const params = new URLSearchParams()

  params.set('size', limit.toString())
  params.set('text', query)

  const url = `https://registry.npmjs.org/-/v1/search?${params.toString()}`

  const response = await request<SearchResponse>('GET', url)

  return response.objects
}

interface SearchResponse {
  objects: SearchResult[]
  time: string
  total: number
}

interface SearchResult {
  downloads: {
    monthly: number
    weekly: number
  }
  dependents: number
  updated: string
  searchScore: number
  package: {
    name: string
    keywords: string[]
    version: string
    description: string
    sanitized_name: string
    publisher: {
      email: string
      username: string
    }
    maintainers: [
      {
        email: string
        username: string
      },
      {
        email: string
        username: string
      }
    ]
    license: string
    date: string
    links: {
      homepage: string
      repository: string
      bugs: string
      npm: string
    }
  }
  score: {
    final: number
    detail: {
      popularity: number
      quality: number
      maintenance: number
    }
  }
  flags: {
    insecure: number
  }
}
