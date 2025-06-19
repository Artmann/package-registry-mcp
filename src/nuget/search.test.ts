import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from './__mocks__/api'
import { search } from './search'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('nuget search', () => {
  it('should search for packages successfully', async () => {
    const results = await search('newtonsoft', { limit: 10 })

    expect(results).toHaveLength(2)
    expect(results[0]?.id).toEqual('Newtonsoft.Json')
    expect(results[0]?.description).toEqual(
      'Json.NET is a popular high-performance JSON framework for .NET'
    )
    expect(results[1]?.id).toEqual('Newtonsoft.Json.Bson')
  })

  it('should return empty array for non-existent packages', async () => {
    const results = await search('nonexistent-package-xyz', { limit: 10 })

    expect(results).toEqual([])
  })

  it('should respect the limit parameter', async () => {
    const results = await search('newtonsoft', { limit: 5 })

    expect(results).toHaveLength(2) // Mock only returns 2 results
  })

  it('should include all required fields in search results', async () => {
    const results = await search('newtonsoft', { limit: 10 })
    const firstResult = results[0]

    expect(firstResult).toBeDefined()
    expect(firstResult).toHaveProperty('@id')
    expect(firstResult).toHaveProperty('id')
    expect(firstResult).toHaveProperty('version')
    expect(firstResult).toHaveProperty('description')
    expect(firstResult).toHaveProperty('title')
    expect(firstResult).toHaveProperty('authors')
    expect(firstResult).toHaveProperty('totalDownloads')
    expect(firstResult).toHaveProperty('verified')
    expect(firstResult).toHaveProperty('versions')

    expect(firstResult?.id).toEqual('Newtonsoft.Json')
    expect(firstResult?.version).toEqual('13.0.3')
    expect(firstResult?.title).toEqual('Json.NET')
    expect(firstResult?.authors).toContain('James Newton-King')
  })

  it('should include download statistics', async () => {
    const results = await search('newtonsoft', { limit: 10 })
    const firstResult = results[0]

    expect(firstResult?.totalDownloads).toEqual(6388758884)
    expect(firstResult?.verified).toBe(true)
  })

  it('should include version information', async () => {
    const results = await search('newtonsoft', { limit: 10 })
    const firstResult = results[0]

    expect(firstResult?.versions).toHaveLength(3)
    expect(firstResult?.versions[0]?.version).toEqual('13.0.3')
    expect(firstResult?.versions[0]?.downloads).toEqual(534304616)
  })

  it('should include package metadata', async () => {
    const results = await search('newtonsoft', { limit: 10 })
    const firstResult = results[0]

    expect(firstResult?.projectUrl).toEqual('https://www.newtonsoft.com/json')
    expect(firstResult?.tags).toContain('json')
    expect(firstResult?.packageTypes[0]?.name).toEqual('Dependency')
  })
})
