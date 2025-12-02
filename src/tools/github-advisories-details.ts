import { z } from 'zod'

import { getAdvisoryDetails } from '../github-advisories'
import { server } from '../server'

server.tool(
  'get-github-advisory',
  'Get detailed information about a specific GitHub Security Advisory by its GHSA ID (e.g., GHSA-grv7-fg5c-xmjg).',
  {
    ghsaId: z
      .string()
      .min(1, 'GHSA ID is required')
      .regex(
        /^GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/i,
        'Invalid GHSA ID format'
      )
      .describe('The GitHub Security Advisory ID (e.g., GHSA-grv7-fg5c-xmjg)')
  },
  async ({ ghsaId }) => {
    const advisory = await getAdvisoryDetails(ghsaId)

    const text = JSON.stringify({ advisory }, null, 2)

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
