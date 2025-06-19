import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const mockSearchResponse = {
  totalHits: 3,
  data: [
    {
      '@id':
        'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/index.json',
      '@type': 'Package',
      registration:
        'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/index.json',
      id: 'Newtonsoft.Json',
      version: '13.0.3',
      description:
        'Json.NET is a popular high-performance JSON framework for .NET',
      summary: '',
      title: 'Json.NET',
      iconUrl:
        'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.3/icon',
      licenseUrl:
        'https://www.nuget.org/packages/Newtonsoft.Json/13.0.3/license',
      projectUrl: 'https://www.newtonsoft.com/json',
      tags: ['json'],
      authors: ['James Newton-King'],
      owners: ['dotnetfoundation', 'jamesnk', 'newtonsoft'],
      totalDownloads: 6388758884,
      verified: true,
      packageTypes: [
        {
          name: 'Dependency'
        }
      ],
      versions: [
        {
          version: '13.0.3',
          downloads: 534304616,
          '@id':
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/13.0.3.json'
        },
        {
          version: '13.0.2',
          downloads: 186438251,
          '@id':
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/13.0.2.json'
        },
        {
          version: '13.0.1',
          downloads: 1033178675,
          '@id':
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/13.0.1.json'
        }
      ]
    },
    {
      '@id':
        'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json.bson/index.json',
      '@type': 'Package',
      registration:
        'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json.bson/index.json',
      id: 'Newtonsoft.Json.Bson',
      version: '1.0.3',
      description: 'Json.NET BSON adds support for reading and writing BSON',
      summary: '',
      title: 'Newtonsoft.Json.Bson',
      iconUrl:
        'https://api.nuget.org/v3-flatcontainer/newtonsoft.json.bson/1.0.3/icon',
      licenseUrl:
        'https://www.nuget.org/packages/Newtonsoft.Json.Bson/1.0.3/license',
      projectUrl: 'http://www.newtonsoft.com/json',
      tags: ['bson'],
      authors: ['James Newton-King'],
      owners: ['dotnetfoundation', 'jamesnk', 'newtonsoft'],
      totalDownloads: 977543974,
      verified: true,
      packageTypes: [
        {
          name: 'Dependency'
        }
      ],
      versions: [
        {
          version: '1.0.3',
          downloads: 3999382,
          '@id':
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json.bson/1.0.3.json'
        },
        {
          version: '1.0.2',
          downloads: 537216726,
          '@id':
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json.bson/1.0.2.json'
        },
        {
          version: '1.0.1',
          downloads: 436127866,
          '@id':
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json.bson/1.0.1.json'
        }
      ]
    }
  ]
}

const mockPackageDetails = {
  '@id':
    'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/index.json',
  '@type': ['PackageRegistration', 'catalog:CatalogRoot'],
  commitId: 'a-commit-id',
  commitTimeStamp: '2023-03-08T07:42:54.647+00:00',
  count: 1,
  items: [
    {
      '@id':
        'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/index.json#page/13.0.3/13.0.3',
      '@type': 'catalog:CatalogPage',
      commitId: 'a-commit-id',
      commitTimeStamp: '2023-03-08T07:42:54.647+00:00',
      count: 3,
      items: [
        {
          '@id':
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/13.0.3.json',
          '@type': 'PackageDetails',
          commitId: 'a-commit-id',
          commitTimeStamp: '2023-03-08T07:42:54.647+00:00',
          catalogEntry: {
            '@id':
              'https://api.nuget.org/v3/catalog0/data/entry/newtonsoft.json/13.0.3.json',
            '@type': 'PackageDetails',
            authors: 'James Newton-King',
            dependencyGroups: [
              {
                '@id':
                  'https://api.nuget.org/v3/catalog0/data/entry/newtonsoft.json/13.0.3.json#dependencygroup/.netframework2.0',
                '@type': 'PackageDependencyGroup',
                targetFramework: '.NETFramework2.0'
              },
              {
                '@id':
                  'https://api.nuget.org/v3/catalog0/data/entry/newtonsoft.json/13.0.3.json#dependencygroup/.netstandard1.0',
                '@type': 'PackageDependencyGroup',
                dependencies: [
                  {
                    '@id':
                      'https://api.nuget.org/v3/catalog0/data/entry/newtonsoft.json/13.0.3.json#dependencygroup/.netstandard1.0/microsoft.csharp',
                    '@type': 'PackageDependency',
                    id: 'Microsoft.CSharp',
                    range: '[4.3.0, )'
                  },
                  {
                    '@id':
                      'https://api.nuget.org/v3/catalog0/data/entry/newtonsoft.json/13.0.3.json#dependencygroup/.netstandard1.0/netstandard.library',
                    '@type': 'PackageDependency',
                    id: 'NETStandard.Library',
                    range: '[1.6.1, )'
                  }
                ],
                targetFramework: '.NETStandard1.0'
              }
            ],
            description:
              'Json.NET is a popular high-performance JSON framework for .NET',
            iconUrl:
              'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.3/icon',
            id: 'Newtonsoft.Json',
            language: '',
            licenseExpression: 'MIT',
            licenseUrl: 'https://licenses.nuget.org/MIT',
            listed: true,
            minClientVersion: '2.12',
            packageContent:
              'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.3/newtonsoft.json.13.0.3.nupkg',
            projectUrl: 'https://www.newtonsoft.com/json',
            published: '2023-03-08T07:42:54.647+00:00',
            requireLicenseAcceptance: false,
            summary: '',
            tags: ['json'],
            title: 'Json.NET',
            version: '13.0.3',
            vulnerabilities: []
          },
          packageContent:
            'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.3/newtonsoft.json.13.0.3.nupkg',
          registration:
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/index.json'
        },
        {
          '@id':
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/13.0.2.json',
          '@type': 'PackageDetails',
          commitId: 'another-commit-id',
          commitTimeStamp: '2022-11-09T07:42:54.647+00:00',
          catalogEntry: {
            '@id':
              'https://api.nuget.org/v3/catalog0/data/entry/newtonsoft.json/13.0.2.json',
            '@type': 'PackageDetails',
            authors: 'James Newton-King',
            dependencyGroups: [
              {
                '@id':
                  'https://api.nuget.org/v3/catalog0/data/entry/newtonsoft.json/13.0.2.json#dependencygroup/.netframework2.0',
                '@type': 'PackageDependencyGroup',
                targetFramework: '.NETFramework2.0'
              }
            ],
            description:
              'Json.NET is a popular high-performance JSON framework for .NET',
            iconUrl:
              'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.2/icon',
            id: 'Newtonsoft.Json',
            language: '',
            licenseExpression: 'MIT',
            licenseUrl: 'https://licenses.nuget.org/MIT',
            listed: true,
            minClientVersion: '2.12',
            packageContent:
              'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.2/newtonsoft.json.13.0.2.nupkg',
            projectUrl: 'https://www.newtonsoft.com/json',
            published: '2022-11-09T07:42:54.647+00:00',
            requireLicenseAcceptance: false,
            summary: '',
            tags: ['json'],
            title: 'Json.NET',
            version: '13.0.2',
            vulnerabilities: []
          },
          packageContent:
            'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.2/newtonsoft.json.13.0.2.nupkg',
          registration:
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/index.json'
        },
        {
          '@id':
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/13.0.1.json',
          '@type': 'PackageDetails',
          commitId: 'yet-another-commit-id',
          commitTimeStamp: '2022-07-11T07:42:54.647+00:00',
          catalogEntry: {
            '@id':
              'https://api.nuget.org/v3/catalog0/data/entry/newtonsoft.json/13.0.1.json',
            '@type': 'PackageDetails',
            authors: 'James Newton-King',
            dependencyGroups: [
              {
                '@id':
                  'https://api.nuget.org/v3/catalog0/data/entry/newtonsoft.json/13.0.1.json#dependencygroup/.netframework2.0',
                '@type': 'PackageDependencyGroup',
                targetFramework: '.NETFramework2.0'
              }
            ],
            description:
              'Json.NET is a popular high-performance JSON framework for .NET',
            iconUrl:
              'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.1/icon',
            id: 'Newtonsoft.Json',
            language: '',
            licenseExpression: 'MIT',
            licenseUrl: 'https://licenses.nuget.org/MIT',
            listed: true,
            minClientVersion: '2.12',
            packageContent:
              'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.1/newtonsoft.json.13.0.1.nupkg',
            projectUrl: 'https://www.newtonsoft.com/json',
            published: '2022-07-11T07:42:54.647+00:00',
            requireLicenseAcceptance: false,
            summary: '',
            tags: ['json'],
            title: 'Json.NET',
            version: '13.0.1',
            vulnerabilities: []
          },
          packageContent:
            'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.1/newtonsoft.json.13.0.1.nupkg',
          registration:
            'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/index.json'
        }
      ],
      lower: '13.0.1',
      upper: '13.0.3'
    }
  ]
}

export const mockHandlers = [
  http.get('https://azuresearch-usnc.nuget.org/query', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')

    if (query === 'nonexistent-package-xyz') {
      return HttpResponse.json({
        totalHits: 0,
        data: []
      })
    }

    return HttpResponse.json(mockSearchResponse)
  }),
  http.get(
    'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/index.json',
    () => {
      return HttpResponse.json(mockPackageDetails)
    }
  ),
  http.get(
    'https://api.nuget.org/v3/registration5-gz-semver2/nonexistent-package-xyz/index.json',
    () => {
      return new HttpResponse(null, { status: 404 })
    }
  )
]

export const mockServer = setupServer(...mockHandlers)
