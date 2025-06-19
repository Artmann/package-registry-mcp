import { request } from '../request'

/**
 * Gets detailed information about an npm package.
 */
export async function getPackageDetails(
  packageName: string
): Promise<PackageDetails> {
  const url = `https://registry.npmjs.org/${packageName}`

  const response = await request<PackageDetails>('GET', url)

  return response
}

export interface PackageDetails {
  _id: string
  _rev: string
  name: string
  description?: string
  'dist-tags': {
    latest: string
    [tag: string]: string
  }
  versions: {
    [version: string]: {
      name: string
      version: string
      description?: string
      main?: string
      scripts?: Record<string, string>
      repository?: {
        type: string
        url: string
      }
      keywords?: string[]
      author?:
        | {
            name: string
            email?: string
            url?: string
          }
        | string
      license: string
      bugs?: {
        url: string
      }
      homepage?: string
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
      peerDependencies?: Record<string, string>
      engines?: Record<string, string>
      dist: {
        integrity: string
        shasum: string
        tarball: string
        fileCount: number
        unpackedSize: number
      }
      _npmVersion: string
      _nodeVersion: string
      _npmUser: {
        name: string
        email: string
      }
      maintainers: Array<{
        name: string
        email: string
      }>
      _npmOperationalInternal?: {
        host: string
        tmp: string
      }
      _hasShrinkwrap: boolean
    }
  }
  readme: string
  maintainers: Array<{
    name: string
    email: string
  }>
  time: {
    created: string
    modified: string
    [version: string]: string
  }
  homepage?: string
  keywords?: string[]
  repository?: {
    type: string
    url: string
  }
  author?:
    | {
        name: string
        email?: string
        url?: string
      }
    | string
  bugs?: {
    url: string
  }
  license: string
  readmeFilename?: string
}
