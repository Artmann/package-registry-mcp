import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from '../pypi/__mocks__/api'
import { getPackageDetails } from '../pypi'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('pypi package details tool', () => {
  it('should return formatted package details', async () => {
    const response = await getPackageDetails('requests')

    // Get all version numbers and sort them
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

  it('should handle version sorting correctly', async () => {
    const response = await getPackageDetails('django')
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

    expect(sortedVersions).toEqual([
      '5.1.4',
      '5.1.3',
      '5.1.2',
      '5.1.1',
      '5.1.0'
    ])
  })

  it('should include comprehensive package metadata', async () => {
    const response = await getPackageDetails('requests')

    expect(response.info.name).toEqual('requests')
    expect(response.info.author).toEqual('Kenneth Reitz')
    expect(response.info.author_email).toEqual('me@kennethreitz.org')
    expect(response.info.license).toEqual('Apache-2.0')
    expect(response.info.requires_python).toEqual('>=3.8')
    expect(response.info.project_urls).toBeDefined()
    expect(response.info.classifiers).toBeInstanceOf(Array)
  })

  it('should handle packages with many versions', async () => {
    const response = await getPackageDetails('requests')
    const versions = Object.keys(response.releases)

    expect(versions.length).toBeGreaterThan(0)
    expect(response.releases['2.32.4']).toBeDefined()
    expect(response.releases['2.32.4'][0].filename).toContain('2.32.4')
  })

  it('should include vulnerability information', async () => {
    const response = await getPackageDetails('requests')

    expect(response.vulnerabilities).toBeDefined()
    expect(Array.isArray(response.vulnerabilities)).toBe(true)
  })
})
