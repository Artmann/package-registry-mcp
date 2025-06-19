import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from '../pypi/__mocks__/api'
import { getPackageDetails } from '../pypi'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('pypi package versions', () => {
  it('should return all versions in descending order', async () => {
    const response = await getPackageDetails('requests')
    const allVersions = Object.keys(response.releases)
    const sortedVersions = allVersions.sort((a, b) => {
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

    expect(sortedVersions).toEqual(['2.32.4', '2.32.1', '2.32.0'])
    expect(sortedVersions[0]).toEqual('2.32.4') // Latest version first
  })

  it('should handle limiting versions', async () => {
    const response = await getPackageDetails('requests')
    const versions = Object.keys(response.releases)
    const limitedVersions = versions.slice(0, 2)

    expect(limitedVersions).toHaveLength(2)
    expect(versions.length).toBeGreaterThanOrEqual(limitedVersions.length)
  })

  it('should include package metadata', async () => {
    const response = await getPackageDetails('requests')

    expect(response.info.name).toEqual('requests')
    expect(response.info.version).toEqual('2.32.4')
    expect(Object.keys(response.releases)).toContain('2.32.4')
  })

  it('should include version-specific information', async () => {
    const response = await getPackageDetails('requests')
    const latestVersionFiles = response.releases['2.32.4']

    expect(latestVersionFiles).toBeDefined()
    expect(latestVersionFiles[0].filename).toContain('2.32.4')
    expect(latestVersionFiles[0].packagetype).toEqual('bdist_wheel')
    expect(latestVersionFiles[0].python_version).toEqual('py3')
  })

  it('should handle version metadata and upload info', async () => {
    const response = await getPackageDetails('django')
    const latestVersionFiles = response.releases['5.1.4']

    expect(latestVersionFiles).toBeDefined()
    expect(latestVersionFiles[0].upload_time).toBeDefined()
    expect(latestVersionFiles[0].size).toBeGreaterThan(0)
    expect(latestVersionFiles[0].url).toContain('pythonhosted.org')
  })
})
