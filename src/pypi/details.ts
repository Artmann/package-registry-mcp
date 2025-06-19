import { request } from '../request'
import type { PyPIPackageDetailsResponse } from './types'

export async function getPackageDetails(
  name: string
): Promise<PyPIPackageDetailsResponse> {
  const url = `https://pypi.org/pypi/${name}/json`
  return request<PyPIPackageDetailsResponse>('GET', url)
}
