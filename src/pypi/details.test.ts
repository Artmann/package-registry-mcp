import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

import { mockServer } from './__mocks__/api'
import { getPackageDetails } from './details'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('pypi package details', () => {
  it('should return package details for requests', async () => {
    const response = await getPackageDetails('requests')

    expect(response.info.name).toEqual('requests')
    expect(response.info.summary).toEqual('Python HTTP for Humans.')
    expect(response.info.version).toEqual('2.32.4')
    expect(response.info.author).toEqual('Kenneth Reitz')
    expect(response.info.license).toEqual('Apache-2.0')
  })

  it('should include release information', async () => {
    const response = await getPackageDetails('requests')

    expect(response.releases).toBeDefined()
    expect(Object.keys(response.releases)).toContain('2.32.4')
    expect(Object.keys(response.releases)).toContain('2.32.1')
    expect(Object.keys(response.releases)).toContain('2.32.0')
  })

  it('should include package metadata', async () => {
    const response = await getPackageDetails('requests')

    expect(response.info.requires_python).toEqual('>=3.8')
    expect(response.info.requires_dist).toContain('charset_normalizer<4,>=2')
    expect(response.info.classifiers).toContain(
      'Programming Language :: Python :: 3'
    )
    expect(response.info.project_urls?.Homepage).toEqual(
      'https://requests.readthedocs.io'
    )
  })

  it('should include download statistics', async () => {
    const response = await getPackageDetails('requests')

    expect(response.info.downloads.last_day).toEqual(2500000)
    expect(response.info.downloads.last_month).toEqual(75000000)
    expect(response.info.downloads.last_week).toEqual(17500000)
  })

  it('should handle different package', async () => {
    const response = await getPackageDetails('django')

    expect(response.info.name).toEqual('Django')
    expect(response.info.author).toEqual('Django Software Foundation')
    expect(response.info.license).toEqual('BSD-3-Clause')
    expect(response.info.requires_python).toEqual('>=3.10')
  })
})
