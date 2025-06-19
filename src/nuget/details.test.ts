import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from './__mocks__/api'
import { getPackageDetails } from './details'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('nuget package details', () => {
  it('should get package details successfully', async () => {
    const response = await getPackageDetails('newtonsoft.json')

    expect(response['@id']).toEqual(
      'https://api.nuget.org/v3/registration5-gz-semver2/newtonsoft.json/index.json'
    )
    expect(response['@type']).toContain('PackageRegistration')
    expect(response.count).toEqual(1)
    expect(response.items).toHaveLength(1)
  })

  it('should include version information', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const latestVersion = response.items[0]?.items?.[0]?.catalogEntry

    expect(latestVersion).toBeDefined()
    expect(latestVersion?.id).toEqual('Newtonsoft.Json')
    expect(latestVersion?.version).toEqual('13.0.3')
    expect(latestVersion?.description).toEqual(
      'Json.NET is a popular high-performance JSON framework for .NET'
    )
  })

  it('should include author and license information', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const latestVersion = response.items[0]?.items?.[0]?.catalogEntry

    expect(latestVersion?.authors).toEqual('James Newton-King')
    expect(latestVersion?.licenseExpression).toEqual('MIT')
    expect(latestVersion?.projectUrl).toEqual('https://www.newtonsoft.com/json')
  })

  it('should include all versions', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const versions = response.items[0]?.items

    expect(versions).toBeDefined()
    expect(versions).toHaveLength(3)
    expect(versions?.[0]?.catalogEntry.version).toEqual('13.0.3')
    expect(versions?.[1]?.catalogEntry.version).toEqual('13.0.2')
    expect(versions?.[2]?.catalogEntry.version).toEqual('13.0.1')
  })

  it('should include dependency information', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const latestVersion = response.items[0]?.items?.[0]?.catalogEntry

    expect(latestVersion?.dependencyGroups).toBeDefined()
    expect(latestVersion?.dependencyGroups).toHaveLength(2)
    expect(latestVersion?.dependencyGroups[0]?.targetFramework).toEqual(
      '.NETFramework2.0'
    )
    expect(latestVersion?.dependencyGroups[1]?.targetFramework).toEqual(
      '.NETStandard1.0'
    )
    expect(latestVersion?.dependencyGroups[1]?.dependencies).toHaveLength(2)
  })

  it('should include package metadata', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const latestVersion = response.items[0]?.items?.[0]?.catalogEntry

    expect(latestVersion?.title).toEqual('Json.NET')
    expect(latestVersion?.tags).toContain('json')
    expect(latestVersion?.listed).toBe(true)
    expect(latestVersion?.requireLicenseAcceptance).toBe(false)
    expect(latestVersion?.minClientVersion).toEqual('2.12')
  })

  it('should include URLs and icons', async () => {
    const response = await getPackageDetails('newtonsoft.json')
    const latestVersion = response.items[0]?.items?.[0]?.catalogEntry

    expect(latestVersion?.iconUrl).toEqual(
      'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.3/icon'
    )
    expect(latestVersion?.packageContent).toEqual(
      'https://api.nuget.org/v3-flatcontainer/newtonsoft.json/13.0.3/newtonsoft.json.13.0.3.nupkg'
    )
  })

  it('should handle package not found', async () => {
    await expect(getPackageDetails('nonexistent-package-xyz')).rejects.toThrow()
  })
})
