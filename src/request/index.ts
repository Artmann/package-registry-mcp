export async function request<T>(
  method: 'POST' | 'GET',
  url: string,
  body?: Record<string, any>
): Promise<T> {
  const signal = AbortSignal.timeout(10_000)

  const jsonBody = body ? JSON.stringify(body) : undefined

  const response = await fetch(url, {
    body: jsonBody,
    headers: {
      'Content-Type': 'application/json'
    },
    method,
    signal
  })

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response)

    throw new Error(errorMessage)
  }

  return response.json() as Promise<T>
}

export async function requestText(
  method: 'POST' | 'GET',
  url: string,
  body?: Record<string, any>
): Promise<string> {
  const signal = AbortSignal.timeout(10_000)

  const jsonBody = body ? JSON.stringify(body) : undefined

  const response = await fetch(url, {
    body: jsonBody,
    headers: {
      'Content-Type': 'application/json'
    },
    method,
    signal
  })

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response)

    throw new Error(errorMessage)
  }

  return response.text()
}

async function parseErrorResponse(response: Response): Promise<string> {
  try {
    const errorData = (await response.json()) as any

    return errorData.message || errorData.error
  } catch {
    return `The request failed with status ${response.status}: ${response.statusText}.`
  }
}
