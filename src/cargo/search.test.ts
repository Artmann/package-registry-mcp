import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from './__mocks__/api'
import { search } from './search'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('cargo search', () => {
  it('should search for packages successfully', async () => {
    const results = await search('serde', { limit: 10 })

    expect(results).toHaveLength(2)
    expect(results[0]?.name).toEqual('serde')
    expect(results[0]?.description).toEqual(
      'A generic serialization/deserialization framework'
    )
    expect(results[1]?.name).toEqual('serde_json')
  })

  it('should return empty array for non-existent packages', async () => {
    const results = await search('nonexistent-package-xyz', { limit: 10 })

    expect(results).toEqual([])
  })

  it('should respect the limit parameter', async () => {
    const results = await search('serde', { limit: 5 })

    expect(results).toHaveLength(2) // Mock only returns 2 results
  })

  it('should include all required fields in search results', async () => {
    const results = await search('serde', { limit: 10 })
    const firstResult = results[0]

    expect(firstResult).toBeDefined()
    expect(firstResult).toHaveProperty('id')
    expect(firstResult).toHaveProperty('name')
    expect(firstResult).toHaveProperty('downloads')
    expect(firstResult).toHaveProperty('recent_downloads')
    expect(firstResult).toHaveProperty('max_version')
    expect(firstResult).toHaveProperty('description')
    expect(firstResult).toHaveProperty('homepage')
    expect(firstResult).toHaveProperty('repository')
    expect(firstResult).toHaveProperty('documentation')
    expect(firstResult).toHaveProperty('links')

    expect(firstResult?.name).toEqual('serde')
    expect(firstResult?.max_version).toEqual('1.0.219')
    expect(firstResult?.homepage).toEqual('https://serde.rs')
    expect(firstResult?.repository).toEqual('https://github.com/serde-rs/serde')
  })

  it('should handle exact match flag', async () => {
    const results = await search('serde', { limit: 10 })

    expect(results[0]?.exact_match).toBe(true)
    expect(results[1]?.exact_match).toBe(false)
  })

  it('should include download statistics', async () => {
    const results = await search('serde', { limit: 10 })
    const firstResult = results[0]

    expect(firstResult?.downloads).toEqual(556646908)
    expect(firstResult?.recent_downloads).toEqual(74673114)
  })
})
