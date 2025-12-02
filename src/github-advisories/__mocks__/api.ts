import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const mockBracesAdvisory = {
  ghsa_id: 'GHSA-grv7-fg5c-xmjg',
  cve_id: 'CVE-2024-4068',
  url: 'https://api.github.com/advisories/GHSA-grv7-fg5c-xmjg',
  html_url: 'https://github.com/advisories/GHSA-grv7-fg5c-xmjg',
  summary: 'Uncontrolled resource consumption in braces',
  description:
    'The NPM package `braces` fails to limit the number of characters it can handle, which could lead to Memory Exhaustion.',
  type: 'reviewed',
  severity: 'high',
  source_code_location: 'https://github.com/micromatch/braces',
  published_at: '2024-05-14T18:30:54Z',
  updated_at: '2024-07-05T21:25:08Z',
  github_reviewed_at: '2024-06-10T20:17:26Z',
  nvd_published_at: '2024-05-14T15:42:48Z',
  withdrawn_at: null,
  vulnerabilities: [
    {
      package: {
        ecosystem: 'npm',
        name: 'braces'
      },
      vulnerable_version_range: '< 3.0.3',
      first_patched_version: '3.0.3',
      vulnerable_functions: []
    }
  ],
  cvss: {
    vector_string: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
    score: 7.5
  },
  cvss_severities: {
    cvss_v3: {
      vector_string: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
      score: 7.5
    },
    cvss_v4: {
      vector_string: null,
      score: 0.0
    }
  },
  cwes: [
    {
      cwe_id: 'CWE-400',
      name: 'Uncontrolled Resource Consumption'
    }
  ],
  identifiers: [
    {
      value: 'GHSA-grv7-fg5c-xmjg',
      type: 'GHSA'
    },
    {
      value: 'CVE-2024-4068',
      type: 'CVE'
    }
  ],
  references: [
    'https://nvd.nist.gov/vuln/detail/CVE-2024-4068',
    'https://github.com/micromatch/braces/issues/35'
  ],
  credits: [],
  epss: {
    percentage: 0.00143,
    percentile: 0.35201
  }
}

const mockLodashAdvisory = {
  ghsa_id: 'GHSA-35jh-r3h4-6jhm',
  cve_id: 'CVE-2021-23337',
  url: 'https://api.github.com/advisories/GHSA-35jh-r3h4-6jhm',
  html_url: 'https://github.com/advisories/GHSA-35jh-r3h4-6jhm',
  summary: 'Command Injection in lodash',
  description:
    'Lodash versions prior to 4.17.21 are vulnerable to Command Injection.',
  type: 'reviewed',
  severity: 'high',
  source_code_location: 'https://github.com/lodash/lodash',
  published_at: '2021-02-15T13:12:45Z',
  updated_at: '2023-09-13T18:46:08Z',
  github_reviewed_at: '2021-02-15T22:29:59Z',
  nvd_published_at: '2021-02-15T13:15:12Z',
  withdrawn_at: null,
  vulnerabilities: [
    {
      package: {
        ecosystem: 'npm',
        name: 'lodash'
      },
      vulnerable_version_range: '< 4.17.21',
      first_patched_version: '4.17.21',
      vulnerable_functions: []
    }
  ],
  cvss: {
    vector_string: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
    score: 7.2
  },
  cvss_severities: {
    cvss_v3: {
      vector_string: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
      score: 7.2
    },
    cvss_v4: {
      vector_string: null,
      score: 0.0
    }
  },
  cwes: [
    {
      cwe_id: 'CWE-77',
      name: 'Command Injection'
    }
  ],
  identifiers: [
    {
      value: 'GHSA-35jh-r3h4-6jhm',
      type: 'GHSA'
    },
    {
      value: 'CVE-2021-23337',
      type: 'CVE'
    }
  ],
  references: ['https://nvd.nist.gov/vuln/detail/CVE-2021-23337'],
  credits: [],
  epss: {
    percentage: 0.01,
    percentile: 0.5
  }
}

export const mockHandlers = [
  http.get('https://api.github.com/advisories', ({ request }) => {
    const url = new URL(request.url)
    const affects = url.searchParams.get('affects')
    const ecosystem = url.searchParams.get('ecosystem')
    const severity = url.searchParams.get('severity')

    // Package-specific queries
    if (affects === 'braces') {
      return HttpResponse.json([mockBracesAdvisory])
    }

    if (affects === 'lodash') {
      return HttpResponse.json([mockLodashAdvisory])
    }

    if (affects === 'nonexistent-package-xyz') {
      return HttpResponse.json([])
    }

    // Ecosystem filter
    if (ecosystem === 'npm') {
      return HttpResponse.json([mockBracesAdvisory, mockLodashAdvisory])
    }

    // Severity filter
    if (severity === 'critical') {
      return HttpResponse.json([])
    }

    // Default: return all mock advisories
    return HttpResponse.json([mockBracesAdvisory, mockLodashAdvisory])
  }),

  http.get('https://api.github.com/advisories/GHSA-grv7-fg5c-xmjg', () => {
    return HttpResponse.json(mockBracesAdvisory)
  }),

  http.get('https://api.github.com/advisories/GHSA-35jh-r3h4-6jhm', () => {
    return HttpResponse.json(mockLodashAdvisory)
  }),

  http.get('https://api.github.com/advisories/GHSA-xxxx-xxxx-xxxx', () => {
    return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
  })
]

export const mockServer = setupServer(...mockHandlers)
