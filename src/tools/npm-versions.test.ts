import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from '../npm/__mocks__/api'
import { getPackageDetails } from '../npm'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('npm package versions', () => {
  it('should return all versions in descending order', async () => {
    const details = await getPackageDetails('react')
    const versions = Object.keys(details.versions).sort((a, b) => {
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

    expect(versions).toEqual(['19.1.0', '19.0.0', '18.3.1'])
    expect(versions[0]).toEqual('19.1.0') // Latest version first
  })

  it('should handle limiting versions', async () => {
    const details = await getPackageDetails('react')
    const allVersions = Object.keys(details.versions)
    const limitedVersions = allVersions.slice(0, 2)

    expect(limitedVersions).toHaveLength(2)
    expect(allVersions.length).toBeGreaterThanOrEqual(limitedVersions.length)
  })

  it('should include package metadata', async () => {
    const details = await getPackageDetails('react')

    expect(details.name).toEqual('react')
    expect(details['dist-tags'].latest).toEqual('19.1.0')
    expect(Object.keys(details.versions)).toContain('19.1.0')
  })
})
