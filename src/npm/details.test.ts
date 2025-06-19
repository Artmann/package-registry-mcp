import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from './__mocks__/api'
import { getPackageDetails } from './details'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('npm package details', () => {
  it('should get package details successfully', async () => {
    const details = await getPackageDetails('react')

    expect(details.name).toEqual('react')
    expect(details.description).toEqual(
      'React is a JavaScript library for building user interfaces.'
    )
    expect(details['dist-tags'].latest).toEqual('19.1.0')
    expect(details.license).toEqual('MIT')
    expect(details.homepage).toEqual('https://react.dev/')
  })

  it('should include version information', async () => {
    const details = await getPackageDetails('react')
    const latestVersion = details.versions['19.1.0']

    expect(latestVersion).toBeDefined()
    expect(latestVersion?.name).toEqual('react')
    expect(latestVersion?.version).toEqual('19.1.0')
    expect(latestVersion?.main).toEqual('index.js')
    expect(latestVersion?.dependencies).toEqual({
      'loose-envify': '^1.1.0'
    })
  })

  it('should include maintainer information', async () => {
    const details = await getPackageDetails('react')

    expect(details.maintainers).toHaveLength(2)
    expect(details.maintainers[0]?.name).toEqual('fb')
    expect(details.maintainers[1]?.name).toEqual('react-bot')
  })

  it('should include all versions', async () => {
    const details = await getPackageDetails('react')

    expect(details.versions).toBeDefined()
    expect(details.versions['19.1.0']).toBeDefined()
    expect(details.versions['19.0.0']).toBeDefined()
    expect(details.versions['18.3.1']).toBeDefined()
  })

  it('should handle package not found', async () => {
    await expect(getPackageDetails('nonexistent-package-xyz')).rejects.toThrow()
  })
})
