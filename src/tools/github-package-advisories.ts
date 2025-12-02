import { z } from 'zod'

import { getPackageAdvisories } from '../github-advisories'
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

server.tool(
  'get-package-advisories',
  'Get all security advisories affecting a specific package. Use this to check if a package like "braces" or "lodash" has known vulnerabilities.',
  {
    ecosystem: ecosystemEnum.describe(
      'The package ecosystem (npm, pip, maven, go, rust, etc.)'
    ),
    limit: z
      .number()
      .min(1)
      .max(100)
      .default(30)
      .describe('Maximum number of results to return'),
    packageName: z
      .string()
      .min(1, 'Package name is required')
      .describe('The package name (e.g., braces, lodash, requests)'),
    severity: severityEnum
      .optional()
      .describe('Filter by severity level (low, medium, high, critical)')
  },
  async ({ ecosystem, limit, packageName, severity }) => {
    const results = await getPackageAdvisories({
      ecosystem,
      limit,
      packageName,
      severity
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
