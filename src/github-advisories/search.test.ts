import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { mockServer } from './__mocks__/api'
import { getPackageAdvisories, searchAdvisories } from './search'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('searchAdvisories', () => {
  it('should search for advisories successfully', async () => {
    const results = await searchAdvisories()

    expect(results).toHaveLength(2)
    expect(results[0]?.ghsa_id).toEqual('GHSA-grv7-fg5c-xmjg')
    expect(results[1]?.ghsa_id).toEqual('GHSA-35jh-r3h4-6jhm')
  })

  it('should filter by ecosystem', async () => {
    const results = await searchAdvisories({ ecosystem: 'npm' })

    expect(results).toHaveLength(2)
    expect(results[0]?.vulnerabilities[0]?.package.ecosystem).toEqual('npm')
  })

  it('should return empty array for critical severity (no matches)', async () => {
    const results = await searchAdvisories({ severity: 'critical' })

    expect(results).toEqual([])
  })

  it('should include all required fields in search results', async () => {
    const results = await searchAdvisories()
    const firstResult = results[0]

    expect(firstResult).toBeDefined()
    expect(firstResult).toHaveProperty('ghsa_id')
    expect(firstResult).toHaveProperty('cve_id')
    expect(firstResult).toHaveProperty('summary')
    expect(firstResult).toHaveProperty('description')
    expect(firstResult).toHaveProperty('severity')
    expect(firstResult).toHaveProperty('vulnerabilities')
    expect(firstResult).toHaveProperty('cvss')
    expect(firstResult).toHaveProperty('cwes')
  })
})

describe('getPackageAdvisories', () => {
  it('should get advisories for braces package', async () => {
    const results = await getPackageAdvisories({
      ecosystem: 'npm',
      packageName: 'braces'
    })

    expect(results).toHaveLength(1)
    expect(results[0]?.ghsa_id).toEqual('GHSA-grv7-fg5c-xmjg')
    expect(results[0]?.summary).toEqual(
      'Uncontrolled resource consumption in braces'
    )
    expect(results[0]?.vulnerabilities[0]?.package.name).toEqual('braces')
  })

  it('should get advisories for lodash package', async () => {
    const results = await getPackageAdvisories({
      ecosystem: 'npm',
      packageName: 'lodash'
    })

    expect(results).toHaveLength(1)
    expect(results[0]?.ghsa_id).toEqual('GHSA-35jh-r3h4-6jhm')
    expect(results[0]?.vulnerabilities[0]?.package.name).toEqual('lodash')
  })

  it('should return empty array for non-existent package', async () => {
    const results = await getPackageAdvisories({
      ecosystem: 'npm',
      packageName: 'nonexistent-package-xyz'
    })

    expect(results).toEqual([])
  })

  it('should include vulnerability details', async () => {
    const results = await getPackageAdvisories({
      ecosystem: 'npm',
      packageName: 'braces'
    })

    const vulnerability = results[0]?.vulnerabilities[0]

    expect(vulnerability).toBeDefined()
    expect(vulnerability?.package.ecosystem).toEqual('npm')
    expect(vulnerability?.package.name).toEqual('braces')
    expect(vulnerability?.vulnerable_version_range).toEqual('< 3.0.3')
    expect(vulnerability?.first_patched_version).toEqual('3.0.3')
  })
})
