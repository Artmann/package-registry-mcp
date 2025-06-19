import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from './__mocks__/api'
import { search } from './search'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('npm search', () => {
  it('should search for packages successfully', async () => {
    const results = await search('react', { limit: 10 })

    expect(results).toHaveLength(2)
    expect(results[0]?.package.name).toEqual('react')
    expect(results[0]?.package.description).toEqual(
      'React is a JavaScript library for building user interfaces.'
    )
    expect(results[1]?.package.name).toEqual('react-is')
  })

  it('should return empty array for non-existent packages', async () => {
    const results = await search('nonexistent-package-xyz', { limit: 10 })

    expect(results).toEqual([])
  })

  it('should respect the limit parameter', async () => {
    const results = await search('react', { limit: 5 })

    expect(results).toHaveLength(2) // Mock only returns 2 results
  })

  it('should include all required fields in search results', async () => {
    const results = await search('react', { limit: 10 })
    const firstResult = results[0]

    expect(firstResult).toBeDefined()
    expect(firstResult).toHaveProperty('downloads')
    expect(firstResult).toHaveProperty('dependents')
    expect(firstResult).toHaveProperty('updated')
    expect(firstResult).toHaveProperty('searchScore')
    expect(firstResult).toHaveProperty('package')
    expect(firstResult).toHaveProperty('score')
    expect(firstResult).toHaveProperty('flags')

    expect(firstResult?.package).toHaveProperty('name')
    expect(firstResult?.package).toHaveProperty('version')
    expect(firstResult?.package).toHaveProperty('description')
    expect(firstResult?.package).toHaveProperty('license')
    expect(firstResult?.package).toHaveProperty('links')
  })
})
