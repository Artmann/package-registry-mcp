import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const mockSearchResponse = {
  crates: [
    {
      id: 'serde',
      name: 'serde',
      updated_at: '2025-03-09T19:13:49.968038Z',
      versions: null,
      keywords: null,
      categories: null,
      badges: [],
      created_at: '2014-12-05T20:20:39.487502Z',
      downloads: 556646908,
      recent_downloads: 74673114,
      default_version: '1.0.219',
      num_versions: 306,
      yanked: false,
      max_version: '1.0.219',
      newest_version: '1.0.219',
      max_stable_version: '1.0.219',
      description: 'A generic serialization/deserialization framework',
      homepage: 'https://serde.rs',
      documentation: 'https://docs.rs/serde',
      repository: 'https://github.com/serde-rs/serde',
      links: {
        version_downloads: '/api/v1/crates/serde/downloads',
        versions: '/api/v1/crates/serde/versions',
        owners: '/api/v1/crates/serde/owners',
        owner_team: '/api/v1/crates/serde/owner_team',
        owner_user: '/api/v1/crates/serde/owner_user',
        reverse_dependencies: '/api/v1/crates/serde/reverse_dependencies'
      },
      exact_match: true
    },
    {
      id: 'serde_json',
      name: 'serde_json',
      updated_at: '2025-03-03T09:04:21.796751Z',
      versions: null,
      keywords: null,
      categories: null,
      badges: [],
      created_at: '2015-08-07T19:04:18.632088Z',
      downloads: 484901980,
      recent_downloads: 63998562,
      default_version: '1.0.140',
      num_versions: 172,
      yanked: false,
      max_version: '1.0.140',
      newest_version: '1.0.140',
      max_stable_version: '1.0.140',
      description: 'A JSON serialization file format',
      homepage: null,
      documentation: 'https://docs.rs/serde_json',
      repository: 'https://github.com/serde-rs/json',
      links: {
        version_downloads: '/api/v1/crates/serde_json/downloads',
        versions: '/api/v1/crates/serde_json/versions',
        owners: '/api/v1/crates/serde_json/owners',
        owner_team: '/api/v1/crates/serde_json/owner_team',
        owner_user: '/api/v1/crates/serde_json/owner_user',
        reverse_dependencies: '/api/v1/crates/serde_json/reverse_dependencies'
      },
      exact_match: false
    }
  ],
  meta: {
    total: 2,
    next_page: null,
    prev_page: null
  }
}

const mockPackageDetails = {
  crate: {
    id: 'serde',
    name: 'serde',
    updated_at: '2025-03-09T19:13:49.968038Z',
    versions: null,
    keywords: null,
    categories: null,
    badges: [],
    created_at: '2014-12-05T20:20:39.487502Z',
    downloads: 556646908,
    recent_downloads: 74673114,
    max_version: '1.0.219',
    max_stable_version: '1.0.219',
    description: 'A generic serialization/deserialization framework',
    homepage: 'https://serde.rs',
    documentation: 'https://docs.rs/serde',
    repository: 'https://github.com/serde-rs/serde',
    links: {
      version_downloads: '/api/v1/crates/serde/downloads',
      versions: '/api/v1/crates/serde/versions',
      owners: '/api/v1/crates/serde/owners',
      owner_team: '/api/v1/crates/serde/owner_team',
      owner_user: '/api/v1/crates/serde/owner_user',
      reverse_dependencies: '/api/v1/crates/serde/reverse_dependencies'
    },
    exact_match: true
  },
  versions: [
    {
      id: 1001,
      crate: 'serde',
      num: '1.0.219',
      dl_path: '/api/v1/crates/serde/1.0.219/download',
      readme_path: '/api/v1/crates/serde/1.0.219/readme',
      updated_at: '2025-03-09T19:13:49.968038Z',
      created_at: '2025-03-09T19:13:49.968038Z',
      downloads: 1000000,
      features: {
        alloc: [],
        default: ['std'],
        derive: ['serde_derive'],
        rc: [],
        std: [],
        unstable: []
      },
      yanked: false,
      license: 'MIT OR Apache-2.0',
      links: {
        dependencies: '/api/v1/crates/serde/1.0.219/dependencies',
        version_downloads: '/api/v1/crates/serde/1.0.219/downloads',
        authors: '/api/v1/crates/serde/1.0.219/authors'
      },
      crate_size: 78983,
      published_by: {
        id: 1,
        login: 'dtolnay',
        name: 'David Tolnay',
        avatar: 'https://avatars.githubusercontent.com/u/1940490?v=4',
        url: 'https://github.com/dtolnay'
      },
      audit_actions: []
    },
    {
      id: 1000,
      crate: 'serde',
      num: '1.0.218',
      dl_path: '/api/v1/crates/serde/1.0.218/download',
      readme_path: '/api/v1/crates/serde/1.0.218/readme',
      updated_at: '2025-02-15T10:00:00.000000Z',
      created_at: '2025-02-15T10:00:00.000000Z',
      downloads: 900000,
      features: {
        alloc: [],
        default: ['std'],
        derive: ['serde_derive'],
        rc: [],
        std: [],
        unstable: []
      },
      yanked: false,
      license: 'MIT OR Apache-2.0',
      links: {
        dependencies: '/api/v1/crates/serde/1.0.218/dependencies',
        version_downloads: '/api/v1/crates/serde/1.0.218/downloads',
        authors: '/api/v1/crates/serde/1.0.218/authors'
      },
      crate_size: 78900,
      published_by: {
        id: 1,
        login: 'dtolnay',
        name: 'David Tolnay',
        avatar: 'https://avatars.githubusercontent.com/u/1940490?v=4',
        url: 'https://github.com/dtolnay'
      },
      audit_actions: []
    },
    {
      id: 999,
      crate: 'serde',
      num: '1.0.217',
      dl_path: '/api/v1/crates/serde/1.0.217/download',
      readme_path: '/api/v1/crates/serde/1.0.217/readme',
      updated_at: '2025-01-20T15:30:00.000000Z',
      created_at: '2025-01-20T15:30:00.000000Z',
      downloads: 800000,
      features: {
        alloc: [],
        default: ['std'],
        derive: ['serde_derive'],
        rc: [],
        std: [],
        unstable: []
      },
      yanked: false,
      license: 'MIT OR Apache-2.0',
      links: {
        dependencies: '/api/v1/crates/serde/1.0.217/dependencies',
        version_downloads: '/api/v1/crates/serde/1.0.217/downloads',
        authors: '/api/v1/crates/serde/1.0.217/authors'
      },
      crate_size: 78800,
      published_by: {
        id: 1,
        login: 'dtolnay',
        name: 'David Tolnay',
        avatar: 'https://avatars.githubusercontent.com/u/1940490?v=4',
        url: 'https://github.com/dtolnay'
      },
      audit_actions: []
    }
  ],
  keywords: [
    {
      id: 'no_std',
      keyword: 'no_std',
      crates_cnt: 1500,
      created_at: '2014-11-01T10:00:00.000000Z'
    },
    {
      id: 'serde',
      keyword: 'serde',
      crates_cnt: 2000,
      created_at: '2014-11-01T10:00:00.000000Z'
    },
    {
      id: 'serialization',
      keyword: 'serialization',
      crates_cnt: 800,
      created_at: '2014-11-01T10:00:00.000000Z'
    }
  ],
  categories: [
    {
      id: 'encoding',
      category: 'Encoding',
      slug: 'encoding',
      description: 'Encoding and decoding of data',
      crates_cnt: 500,
      created_at: '2015-01-01T10:00:00.000000Z'
    },
    {
      id: 'no-std',
      category: 'No standard library',
      slug: 'no-std',
      description: 'Crates that can work without std',
      crates_cnt: 1200,
      created_at: '2015-01-01T10:00:00.000000Z'
    },
    {
      id: 'no-alloc',
      category: 'No dynamic allocation',
      slug: 'no-alloc',
      description: 'Crates that can work without allocation',
      crates_cnt: 800,
      created_at: '2015-01-01T10:00:00.000000Z'
    }
  ]
}

export const mockHandlers = [
  http.get('https://crates.io/api/v1/crates', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')

    if (query === 'nonexistent-package-xyz') {
      return HttpResponse.json({
        crates: [],
        meta: {
          total: 0,
          next_page: null,
          prev_page: null
        }
      })
    }

    return HttpResponse.json(mockSearchResponse)
  }),
  http.get('https://crates.io/api/v1/crates/serde', () => {
    return HttpResponse.json(mockPackageDetails)
  }),
  http.get('https://crates.io/api/v1/crates/nonexistent-package-xyz', () => {
    return new HttpResponse(null, { status: 404 })
  })
]

export const mockServer = setupServer(...mockHandlers)
