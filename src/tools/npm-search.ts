import { z } from 'zod'

import { server } from '../server'

server.tool(
  'search-npm-packages',
  'Search the NPM registry for packages',
  {
    query: z.string().min(1, 'Query must be at least 1 character long')
  },
  async ({ query }) => {
    return {
      content: [
        {
          type: 'text',
          text: 'Searching NPM packages for: ' + query
        }
      ]
    }
  }
)
