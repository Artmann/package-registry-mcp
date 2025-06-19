import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from './__mocks__/api'
import { getPackageDetails } from './details'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('cargo package details', () => {
  it('should get package details successfully', async () => {
    const response = await getPackageDetails('serde')
    const details = response.crate

    expect(details.name).toEqual('serde')
    expect(details.description).toEqual(
      'A generic serialization/deserialization framework'
    )
    expect(details.max_version).toEqual('1.0.219')
    expect(details.homepage).toEqual('https://serde.rs')
    expect(details.repository).toEqual('https://github.com/serde-rs/serde')
  })

  it('should include version information', async () => {
    const response = await getPackageDetails('serde')
    const latestVersion = response.versions.find((v) => v.num === '1.0.219')

    expect(latestVersion).toBeDefined()
    expect(latestVersion?.crate).toEqual('serde')
    expect(latestVersion?.num).toEqual('1.0.219')
    expect(latestVersion?.license).toEqual('MIT OR Apache-2.0')
    expect(latestVersion?.crate_size).toEqual(78983)
  })

  it('should include publisher information', async () => {
    const response = await getPackageDetails('serde')
    const latestVersion = response.versions[0]

    expect(latestVersion?.published_by).toBeDefined()
    expect(latestVersion?.published_by.login).toEqual('dtolnay')
    expect(latestVersion?.published_by.name).toEqual('David Tolnay')
  })

  it('should include all versions', async () => {
    const response = await getPackageDetails('serde')

    expect(response.versions).toBeDefined()
    expect(response.versions).toHaveLength(3)
    expect(response.versions[0]?.num).toEqual('1.0.219')
    expect(response.versions[1]?.num).toEqual('1.0.218')
    expect(response.versions[2]?.num).toEqual('1.0.217')
  })

  it('should include keywords and categories', async () => {
    const response = await getPackageDetails('serde')

    expect(response.keywords).toHaveLength(3)
    expect(response.keywords[0]?.keyword).toEqual('no_std')
    expect(response.keywords[1]?.keyword).toEqual('serde')
    expect(response.keywords[2]?.keyword).toEqual('serialization')

    expect(response.categories).toHaveLength(3)
    expect(response.categories[0]?.category).toEqual('Encoding')
    expect(response.categories[1]?.category).toEqual('No standard library')
    expect(response.categories[2]?.category).toEqual('No dynamic allocation')
  })

  it('should include download statistics', async () => {
    const response = await getPackageDetails('serde')
    const details = response.crate

    expect(details.downloads).toEqual(556646908)
    expect(details.recent_downloads).toEqual(74673114)
  })

  it('should include features for versions', async () => {
    const response = await getPackageDetails('serde')
    const latestVersion = response.versions[0]

    expect(latestVersion?.features).toBeDefined()
    expect(latestVersion?.features.default).toEqual(['std'])
    expect(latestVersion?.features.derive).toEqual(['serde_derive'])
    expect(latestVersion?.features.alloc).toEqual([])
  })

  it('should handle package not found', async () => {
    await expect(getPackageDetails('nonexistent-package-xyz')).rejects.toThrow()
  })
})
