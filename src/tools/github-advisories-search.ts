import { z } from 'zod'

import { searchAdvisories } from '../github-advisories'
import { server } from '../server'

const ecosystemEnum = z.enum([
  'actions',
  'composer',
  'erlang',
  'go',
  'maven',
  'npm',
  'nuget',
  'other',
  'pip',
  'pub',
  'rubygems',
  'rust',
  'swift'
])

const severityEnum = z.enum(['unknown', 'low', 'medium', 'high', 'critical'])

const typeEnum = z.enum(['reviewed', 'malware', 'unreviewed'])

server.registerTool(
  'search-github-advisories',
  {
    description:
      'Search the GitHub Security Advisory Database for vulnerabilities. Filter by ecosystem (npm, pip, maven, etc.), severity, type, or CVE ID.',
    inputSchema: {
      cveId: z.string().optional().describe('Filter by CVE identifier'),
      ecosystem: ecosystemEnum
        .optional()
        .describe('Filter by package ecosystem (npm, pip, maven, etc.)'),
      limit: z
        .number()
        .min(1)
        .max(100)
        .default(30)
        .describe('Maximum number of results to return'),
      severity: severityEnum
        .optional()
        .describe('Filter by severity level (low, medium, high, critical)'),
      type: typeEnum
        .optional()
        .describe('Filter by advisory type (reviewed, malware, unreviewed)')
    }
  },
  async ({ cveId, ecosystem, limit, severity, type }) => {
    const results = await searchAdvisories({
      cveId,
      ecosystem,
      limit,
      severity,
      type
    })

    const text = JSON.stringify({ results }, null, 2)

    return {
      content: [
        {
          type: 'text',
          text
        }
      ]
    }
  }
)
