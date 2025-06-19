import { request } from '../request'

interface SearchOptions {
  limit: number
}

/**
 * Searches for NuGet packages.
 */
export async function search(
  query: string,
  { limit }: SearchOptions
): Promise<SearchResult[]> {
  const params = new URLSearchParams()

  params.set('take', limit.toString())
  params.set('q', query)
  params.set('semVerLevel', '2.0.0')

  const url = `https://azuresearch-usnc.nuget.org/query?${params.toString()}`

  const response = await request<SearchResponse>('GET', url)

  return response.data
}

interface SearchResponse {
  totalHits: number
  data: SearchResult[]
}

export interface SearchResult {
  '@id': string
  '@type': string
  registration: string
  id: string
  version: string
  description: string
  summary: string
  title: string
  iconUrl: string
  licenseUrl: string
  projectUrl: string
  tags: string[]
  authors: string[]
  owners: string[]
  totalDownloads: number
  verified: boolean
  packageTypes: Array<{
    name: string
  }>
  versions: Array<{
    version: string
    downloads: number
    '@id': string
  }>
}
