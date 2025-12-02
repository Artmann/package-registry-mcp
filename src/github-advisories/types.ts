export interface GitHubAdvisory {
  ghsa_id: string
  cve_id: string | null
  url: string
  html_url: string
  summary: string
  description: string
  type: AdvisoryType
  severity: AdvisorySeverity
  source_code_location: string | null
  published_at: string
  updated_at: string
  github_reviewed_at: string | null
  nvd_published_at: string | null
  withdrawn_at: string | null
  vulnerabilities: AdvisoryVulnerability[]
  cvss: {
    vector_string: string | null
    score: number | null
  }
  cvss_severities: {
    cvss_v3: {
      vector_string: string | null
      score: number
    }
    cvss_v4: {
      vector_string: string | null
      score: number
    }
  }
  cwes: AdvisoryCwe[]
  identifiers: AdvisoryIdentifier[]
  references: string[]
  credits: AdvisoryCredit[]
  epss?: {
    percentage: number
    percentile: number
  }
}

export interface AdvisoryVulnerability {
  package: {
    ecosystem: string
    name: string
  }
  vulnerable_version_range: string
  first_patched_version: string | null
  vulnerable_functions: string[]
}

export interface AdvisoryCwe {
  cwe_id: string
  name: string
}

export interface AdvisoryIdentifier {
  type: 'GHSA' | 'CVE'
  value: string
}

export interface AdvisoryCredit {
  user: {
    login: string
    id: number
    html_url: string
  }
  type: string
}

export type AdvisoryType = 'reviewed' | 'malware' | 'unreviewed'

export type AdvisorySeverity =
  | 'unknown'
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

export type AdvisoryEcosystem =
  | 'actions'
  | 'composer'
  | 'erlang'
  | 'go'
  | 'maven'
  | 'npm'
  | 'nuget'
  | 'other'
  | 'pip'
  | 'pub'
  | 'rubygems'
  | 'rust'
  | 'swift'

export interface SearchAdvisoriesOptions {
  ecosystem?: AdvisoryEcosystem
  severity?: AdvisorySeverity
  type?: AdvisoryType
  cveId?: string
  limit?: number
}

export interface GetPackageAdvisoriesOptions {
  ecosystem: AdvisoryEcosystem
  packageName: string
  severity?: AdvisorySeverity
  limit?: number
}
