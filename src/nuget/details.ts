import { request } from '../request'

/**
 * Gets detailed information about a NuGet package.
 */
export async function getPackageDetails(
  packageName: string
): Promise<PackageDetailsResponse> {
  const url = `https://api.nuget.org/v3/registration5-gz-semver2/${packageName.toLowerCase()}/index.json`

  const response = await request<PackageDetailsResponse>('GET', url)

  return response
}

export interface PackageDetailsResponse {
  '@id': string
  '@type': string[]
  commitId: string
  commitTimeStamp: string
  count: number
  items: Array<{
    '@id': string
    '@type': string
    commitId: string
    commitTimeStamp: string
    count: number
    items: Array<PackageVersion>
    lower: string
    upper: string
  }>
}

export interface PackageVersion {
  '@id': string
  '@type': string
  commitId: string
  commitTimeStamp: string
  catalogEntry: {
    '@id': string
    '@type': string
    authors: string
    dependencyGroups: Array<{
      '@id': string
      '@type': string
      dependencies: Array<{
        '@id': string
        '@type': string
        id: string
        range: string
      }>
      targetFramework: string
    }>
    description: string
    iconUrl: string
    id: string
    language: string
    licenseExpression: string
    licenseUrl: string
    listed: boolean
    minClientVersion: string
    packageContent: string
    projectUrl: string
    published: string
    requireLicenseAcceptance: boolean
    summary: string
    tags: string[]
    title: string
    version: string
    vulnerabilities: Array<{
      advisoryUrl: string
      severity: string
    }>
  }
  packageContent: string
  registration: string
}
