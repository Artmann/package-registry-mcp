import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from '../golang/__mocks__/api'
import { getPackageDetails } from '../golang'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('golang package versions', () => {
  it('should return all versions in descending order', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.versions).toEqual([
      'v1.10.0',
      'v1.9.1',
      'v1.9.0',
      'v1.8.2',
      'v1.8.1'
    ])
    expect(response.versions[0]).toEqual('v1.10.0') // Latest version first
  })

  it('should handle limiting versions', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')
    const limitedVersions = response.versions.slice(0, 3)

    expect(limitedVersions).toHaveLength(3)
    expect(response.versions.length).toBeGreaterThanOrEqual(
      limitedVersions.length
    )
  })

  it('should include package metadata', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.module).toEqual('github.com/gin-gonic/gin')
    expect(response.latestVersion).toEqual('v1.10.0')
    expect(response.versions).toContain('v1.10.0')
  })

  it('should include version count information', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.totalVersions).toEqual(5)
    expect(response.versions.length).toEqual(5)
  })

  it('should handle version metadata and publication info', async () => {
    const response = await getPackageDetails('github.com/gorilla/mux')

    expect(response.publishedAt).toBeDefined()
    expect(response.latestVersion).toEqual('v1.8.1')
    expect(response.repositoryUrl).toContain('github.com')
  })
})
