const gitHubApiVersion = '2022-11-28'

export async function githubRequest<T>(url: string): Promise<T> {
  const signal = AbortSignal.timeout(10_000)

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': gitHubApiVersion
    },
    method: 'GET',
    signal
  })

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response)

    throw new Error(errorMessage)
  }

  return response.json() as Promise<T>
}

async function parseErrorResponse(response: Response): Promise<string> {
  try {
    const errorData = (await response.json()) as { message?: string }

    return errorData.message || `Request failed with status ${response.status}`
  } catch {
    return `Request failed with status ${response.status}: ${response.statusText}`
  }
}
