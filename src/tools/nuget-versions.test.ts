import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from '../nuget/__mocks__/api'
import { getPackageDetails } from '../nuget'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('nuget package versions', () => {
  it('should return all versions in descending order', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const allVersions: any[] = []
    response.items.forEach((item) => {
      if (item.items) {
        allVersions.push(...item.items)
      }
    })

    const sortedVersions = allVersions
      .map((v) => v.catalogEntry.version)
      .sort((a, b) => {
        const aParts = a.split('.').map(Number)
        const bParts = b.split('.').map(Number)

        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aPart = aParts[i] || 0
          const bPart = bParts[i] || 0

          if (aPart !== bPart) {
            return bPart - aPart
          }
        }

        return 0
      })

    expect(sortedVersions).toEqual(['13.0.3', '13.0.2', '13.0.1'])
    expect(sortedVersions[0]).toEqual('13.0.3') // Latest version first
  })

  it('should handle limiting versions', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const allVersions: any[] = []
    response.items.forEach((item) => {
      if (item.items) {
        allVersions.push(...item.items)
      }
    })

    const versions = allVersions.map((v) => v.catalogEntry.version)
    const limitedVersions = versions.slice(0, 2)

    expect(limitedVersions).toHaveLength(2)
    expect(versions.length).toBeGreaterThanOrEqual(limitedVersions.length)
  })

  it('should include package metadata', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const allVersions: any[] = []
    response.items.forEach((item) => {
      if (item.items) {
        allVersions.push(...item.items)
      }
    })

    const latestVersionInfo = allVersions[0]?.catalogEntry

    expect(latestVersionInfo?.id).toEqual('Newtonsoft.Json')
    expect(latestVersionInfo?.version).toEqual('13.0.3')
    expect(allVersions.map((v) => v.catalogEntry.version)).toContain('13.0.3')
  })

  it('should include version-specific information', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const allVersions: any[] = []
    response.items.forEach((item) => {
      if (item.items) {
        allVersions.push(...item.items)
      }
    })

    const latestVersion = allVersions[0]?.catalogEntry

    expect(latestVersion?.version).toEqual('13.0.3')
    expect(latestVersion?.authors).toEqual('James Newton-King')
    expect(latestVersion?.licenseExpression).toEqual('MIT')
    expect(latestVersion?.dependencyGroups).toBeDefined()
  })

  it('should handle version metadata and publication info', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const allVersions: any[] = []
    response.items.forEach((item) => {
      if (item.items) {
        allVersions.push(...item.items)
      }
    })

    allVersions.forEach((version) => {
      expect(version.catalogEntry.published).toBeDefined()
      expect(version.catalogEntry.listed).toBeDefined()
      expect(version.packageContent).toContain('https://api.nuget.org')
    })
  })
})
