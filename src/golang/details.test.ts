import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from './__mocks__/api'
import { getPackageDetails } from './details'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('golang package details', () => {
  it('should return package details for gin', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.module).toEqual('github.com/gin-gonic/gin')
    expect(response.latestVersion).toEqual('v1.10.0')
    expect(response.repositoryUrl).toEqual('https://github.com/gin-gonic/gin')
    expect(response.vcs).toEqual('git')
  })

  it('should include version information', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.versions).toContain('v1.10.0')
    expect(response.versions).toContain('v1.9.1')
    expect(response.versions).toContain('v1.8.2')
    expect(response.totalVersions).toEqual(5)
  })

  it('should sort versions in descending order', async () => {
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

  it('should include publication time', async () => {
    const response = await getPackageDetails('github.com/gin-gonic/gin')

    expect(response.publishedAt).toEqual('2024-05-07T03:23:42Z')
  })

  it('should handle different package', async () => {
    const response = await getPackageDetails('github.com/gorilla/mux')

    expect(response.module).toEqual('github.com/gorilla/mux')
    expect(response.latestVersion).toEqual('v1.8.1')
    expect(response.repositoryUrl).toEqual('https://github.com/gorilla/mux')
    expect(response.vcs).toEqual('git')
  })
})
