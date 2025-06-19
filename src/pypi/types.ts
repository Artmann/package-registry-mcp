export interface PyPIPackageInfo {
  author: string
  author_email?: string
  bugtrack_url?: string
  classifiers: string[]
  description: string
  description_content_type?: string
  docs_url?: string
  download_url?: string
  downloads: {
    last_day: number
    last_month: number
    last_week: number
  }
  home_page?: string
  keywords?: string
  license?: string
  maintainer?: string
  maintainer_email?: string
  name: string
  package_url: string
  platform?: string
  project_url: string
  project_urls?: Record<string, string>
  release_url: string
  requires_dist?: string[]
  requires_python?: string
  summary: string
  version: string
  yanked: boolean
  yanked_reason?: string
}

export interface PyPIFileInfo {
  comment_text: string
  digests: {
    blake2b_256?: string
    md5: string
    sha256: string
  }
  downloads: number
  filename: string
  has_sig: boolean
  md5_digest: string
  packagetype: string
  python_version: string
  requires_python?: string
  size: number
  upload_time: string
  upload_time_iso_8601: string
  url: string
  yanked: boolean
  yanked_reason?: string
}

export interface PyPIPackageDetailsResponse {
  info: PyPIPackageInfo
  last_serial: number
  releases: Record<string, PyPIFileInfo[]>
  urls: PyPIFileInfo[]
  vulnerabilities: any[]
}
