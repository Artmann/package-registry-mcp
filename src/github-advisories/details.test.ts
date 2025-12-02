import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { mockServer } from './__mocks__/api'
import { getAdvisoryDetails } from './details'

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

describe('getAdvisoryDetails', () => {
  it('should get advisory details by GHSA ID', async () => {
    const advisory = await getAdvisoryDetails('GHSA-grv7-fg5c-xmjg')

    expect(advisory.ghsa_id).toEqual('GHSA-grv7-fg5c-xmjg')
    expect(advisory.cve_id).toEqual('CVE-2024-4068')
    expect(advisory.summary).toEqual(
      'Uncontrolled resource consumption in braces'
    )
    expect(advisory.severity).toEqual('high')
  })

  it('should get lodash advisory details', async () => {
    const advisory = await getAdvisoryDetails('GHSA-35jh-r3h4-6jhm')

    expect(advisory.ghsa_id).toEqual('GHSA-35jh-r3h4-6jhm')
    expect(advisory.cve_id).toEqual('CVE-2021-23337')
    expect(advisory.summary).toEqual('Command Injection in lodash')
  })

  it('should throw error for non-existent advisory', async () => {
    await expect(getAdvisoryDetails('GHSA-xxxx-xxxx-xxxx')).rejects.toThrow(
      'Not Found'
    )
  })

  it('should include all required fields', async () => {
    const advisory = await getAdvisoryDetails('GHSA-grv7-fg5c-xmjg')

    expect(advisory).toHaveProperty('ghsa_id')
    expect(advisory).toHaveProperty('cve_id')
    expect(advisory).toHaveProperty('url')
    expect(advisory).toHaveProperty('html_url')
    expect(advisory).toHaveProperty('summary')
    expect(advisory).toHaveProperty('description')
    expect(advisory).toHaveProperty('type')
    expect(advisory).toHaveProperty('severity')
    expect(advisory).toHaveProperty('vulnerabilities')
    expect(advisory).toHaveProperty('cvss')
    expect(advisory).toHaveProperty('cwes')
    expect(advisory).toHaveProperty('identifiers')
    expect(advisory).toHaveProperty('references')
  })

  it('should include CVSS score', async () => {
    const advisory = await getAdvisoryDetails('GHSA-grv7-fg5c-xmjg')

    expect(advisory.cvss.score).toEqual(7.5)
    expect(advisory.cvss.vector_string).toEqual(
      'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H'
    )
  })

  it('should include CWE information', async () => {
    const advisory = await getAdvisoryDetails('GHSA-grv7-fg5c-xmjg')

    expect(advisory.cwes).toHaveLength(1)
    expect(advisory.cwes[0]?.cwe_id).toEqual('CWE-400')
    expect(advisory.cwes[0]?.name).toEqual('Uncontrolled Resource Consumption')
  })
})
