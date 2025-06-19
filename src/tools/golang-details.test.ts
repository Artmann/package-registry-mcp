import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from '../golang/__mocks__/api'
import { getPackageDetails } from '../golang'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('golang package details tool', () => {
  it('should return formatted package details', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.module).toEqual('github.com/gin-gonic/gin')
    expect(response.latestVersion).toEqual('v1.10.0')
    expect(response.versions).toEqual([
      'v1.10.0',
      'v1.9.1',
      'v1.9.0',
      'v1.8.2',
      'v1.8.1'
    ])
  })

  it('should handle version sorting correctly', async () => {
    const response = await getPackageDetails('github.com/gorilla/mux')

    expect(response.versions).toEqual([
      'v1.8.1',
      'v1.8.0',
      'v1.7.4',
      'v1.7.3',
      'v1.7.2'
    ])
    expect(response.versions[0]).toEqual('v1.8.1') // Latest version first
  })

  it('should include comprehensive package metadata', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.module).toEqual('github.com/gin-gonic/gin')
    expect(response.repositoryUrl).toEqual('https://github.com/gin-gonic/gin')
    expect(response.vcs).toEqual('git')
    expect(response.publishedAt).toBeDefined()
    expect(response.totalVersions).toBeGreaterThan(0)
  })

  it('should include origin information', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.repositoryUrl).toEqual('https://github.com/gin-gonic/gin')
    expect(response.vcs).toEqual('git')
  })

  it('should handle packages with multiple versions', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.versions.length).toBeGreaterThan(1)
    expect(response.totalVersions).toEqual(response.versions.length)
  })
})
