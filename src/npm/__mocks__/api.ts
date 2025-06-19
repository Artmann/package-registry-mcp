import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const mockSearchResponse = {
  objects: [
    {
      downloads: {
        monthly: 175297754,
        weekly: 44535251
      },
      dependents: 249763,
      updated: '2025-06-19T06:23:45.545Z',
      searchScore: 2158.4846,
      package: {
        name: 'react',
        keywords: ['react'],
        version: '19.1.0',
        description:
          'React is a JavaScript library for building user interfaces.',
        sanitized_name: 'react',
        publisher: {
          email: 'react-core@meta.com',
          username: 'react-bot'
        },
        maintainers: [
          {
            email: 'opensource+npm@fb.com',
            username: 'fb'
          },
          {
            email: 'react-core@meta.com',
            username: 'react-bot'
          }
        ],
        license: 'MIT',
        date: '2025-03-28T19:59:42.053Z',
        links: {
          homepage: 'https://react.dev/',
          repository: 'git+https://github.com/facebook/react.git',
          bugs: 'https://github.com/facebook/react/issues',
          npm: 'https://www.npmjs.com/package/react'
        }
      },
      score: {
        final: 2158.4846,
        detail: {
          popularity: 1,
          quality: 1,
          maintenance: 1
        }
      },
      flags: {
        insecure: 0
      }
    },
    {
      downloads: {
        monthly: 635132662,
        weekly: 164009540
      },
      dependents: 4132,
      updated: '2025-06-19T06:25:24.410Z',
      searchScore: 248.75578,
      package: {
        name: 'react-is',
        keywords: ['react'],
        version: '19.1.0',
        description: 'Brand checking of React Elements.',
        sanitized_name: 'react-is',
        publisher: {
          email: 'react-core@meta.com',
          username: 'react-bot'
        },
        maintainers: [
          {
            email: 'opensource+npm@fb.com',
            username: 'fb'
          },
          {
            email: 'react-core@meta.com',
            username: 'react-bot'
          }
        ],
        license: 'MIT',
        date: '2025-03-28T20:00:12.918Z',
        links: {
          homepage: 'https://react.dev/',
          repository: 'git+https://github.com/facebook/react.git',
          bugs: 'https://github.com/facebook/react/issues',
          npm: 'https://www.npmjs.com/package/react-is'
        }
      },
      score: {
        final: 248.75578,
        detail: {
          popularity: 1,
          quality: 1,
          maintenance: 1
        }
      },
      flags: {
        insecure: 0
      }
    }
  ],
  total: 416435,
  time: '2025-06-19T11:50:09.757Z'
}

export const mockHandlers = [
  http.get('https://registry.npmjs.org/-/v1/search', ({ request }) => {
    const url = new URL(request.url)
    const text = url.searchParams.get('text')

    if (text === 'nonexistent-package-xyz') {
      return HttpResponse.json({
        objects: [],
        total: 0,
        time: '2025-06-19T11:50:09.757Z'
      })
    }

    return HttpResponse.json(mockSearchResponse)
  })
]

export const mockServer = setupServer(...mockHandlers)
