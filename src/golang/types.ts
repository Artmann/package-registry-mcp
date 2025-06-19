export interface GoModuleInfo {
  Version: string
  Time: string
  Origin?: {
    VCS: string
    URL: string
    Ref?: string
    Hash: string
  }
}

export interface GoModuleVersionList {
  versions: string[]
}

export interface GoPackageDetails {
  module: string
  latestVersion: string
  publishedAt: string
  repositoryUrl?: string
  vcs?: string
  versions: string[]
  totalVersions: number
}
