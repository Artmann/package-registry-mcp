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

const mockPackageDetails = {
  _id: 'react',
  _rev: '4556-38606e4086d9df83b101248af9d3d7b0',
  name: 'react',
  description: 'React is a JavaScript library for building user interfaces.',
  'dist-tags': {
    beta: '19.0.0-beta-26f2496093-20240514',
    rc: '19.0.0-rc.1',
    latest: '19.1.0',
    experimental: '0.0.0-experimental-12bc60f5-20250613',
    next: '19.2.0-canary-12bc60f5-20250613',
    canary: '19.2.0-canary-12bc60f5-20250613'
  },
  versions: {
    '19.1.0': {
      name: 'react',
      version: '19.1.0',
      description:
        'React is a JavaScript library for building user interfaces.',
      main: 'index.js',
      license: 'MIT',
      dependencies: {
        'loose-envify': '^1.1.0'
      },
      engines: {
        node: '>=0.10.0'
      },
      dist: {
        integrity: 'sha512-test',
        shasum: 'test',
        tarball: 'https://registry.npmjs.org/react/-/react-19.1.0.tgz',
        fileCount: 10,
        unpackedSize: 100000
      },
      _npmVersion: '10.0.0',
      _nodeVersion: '20.0.0',
      _npmUser: {
        name: 'react-bot',
        email: 'react-core@meta.com'
      },
      maintainers: [
        {
          name: 'fb',
          email: 'opensource+npm@fb.com'
        }
      ],
      _hasShrinkwrap: false
    },
    '19.0.0': {
      name: 'react',
      version: '19.0.0',
      description:
        'React is a JavaScript library for building user interfaces.',
      main: 'index.js',
      license: 'MIT'
    },
    '18.3.1': {
      name: 'react',
      version: '18.3.1',
      description:
        'React is a JavaScript library for building user interfaces.',
      main: 'index.js',
      license: 'MIT'
    }
  },
  readme: '# React\n\nA JavaScript library for building user interfaces.',
  maintainers: [
    {
      name: 'fb',
      email: 'opensource+npm@fb.com'
    },
    {
      name: 'react-bot',
      email: 'react-core@meta.com'
    }
  ],
  homepage: 'https://react.dev/',
  keywords: ['react'],
  repository: {
    type: 'git',
    url: 'git+https://github.com/facebook/react.git',
    directory: 'packages/react'
  },
  bugs: {
    url: 'https://github.com/facebook/react/issues'
  },
  license: 'MIT'
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
  }),
  http.get('https://registry.npmjs.org/react', () => {
    return HttpResponse.json(mockPackageDetails)
  }),
  http.get('https://registry.npmjs.org/nonexistent-package-xyz', () => {
    return new HttpResponse(null, { status: 404 })
  })
]

export const mockServer = setupServer(...mockHandlers)
