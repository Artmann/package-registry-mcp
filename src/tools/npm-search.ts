import { z } from 'zod'

import { search } from '../npm'
import { server } from '../server'

server.tool(
  'search-npm-packages',
  'Search the NPM registry for packages',
  {
    limit: z.number().min(1).max(100).default(10),
    query: z.string().min(1, 'Query must be at least 1 character long')
  },
  async ({ limit, query }) => {
    const results = await search(query, { limit })

    const text = JSON.stringify({ results }, null, 2)

    return {
      content: [
        {
          type: 'text',
          text: text
        }
      ]
    }
  }
)
