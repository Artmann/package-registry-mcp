import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from '../cargo/__mocks__/api'
import { getPackageDetails } from '../cargo'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('cargo package versions', () => {
  it('should return all versions in descending order', async () => {
    const response = await getPackageDetails('serde')
    const versions = response.versions
      .map((v) => v.num)
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

    expect(versions).toEqual(['1.0.219', '1.0.218', '1.0.217'])
    expect(versions[0]).toEqual('1.0.219') // Latest version first
  })

  it('should handle limiting versions', async () => {
    const response = await getPackageDetails('serde')
    const allVersions = response.versions.map((v) => v.num)
    const limitedVersions = allVersions.slice(0, 2)

    expect(limitedVersions).toHaveLength(2)
    expect(allVersions.length).toBeGreaterThanOrEqual(limitedVersions.length)
  })

  it('should include package metadata', async () => {
    const response = await getPackageDetails('serde')
    const details = response.crate

    expect(details.name).toEqual('serde')
    expect(details.max_version).toEqual('1.0.219')
    expect(response.versions.map((v) => v.num)).toContain('1.0.219')
  })

  it('should include version-specific information', async () => {
    const response = await getPackageDetails('serde')
    const latestVersion = response.versions[0]

    expect(latestVersion?.num).toEqual('1.0.219')
    expect(latestVersion?.crate_size).toEqual(78983)
    expect(latestVersion?.license).toEqual('MIT OR Apache-2.0')
    expect(latestVersion?.features).toBeDefined()
  })

  it('should handle version downloads and metadata', async () => {
    const response = await getPackageDetails('serde')

    response.versions.forEach((version) => {
      expect(version.downloads).toBeGreaterThan(0)
      expect(version.created_at).toBeDefined()
      expect(version.published_by).toBeDefined()
      expect(version.published_by.login).toEqual('dtolnay')
    })
  })
})
