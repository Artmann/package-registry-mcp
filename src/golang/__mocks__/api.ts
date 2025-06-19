import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const mockServer = setupServer(
  // Gin latest version
  http.get('https://proxy.golang.org/github.com/gin-gonic/gin/@latest', () => {
    return HttpResponse.json({
      Version: 'v1.10.0',
      Time: '2024-05-07T03:23:42Z',
      Origin: {
        VCS: 'git',
        URL: 'https://github.com/gin-gonic/gin',
        Ref: 'refs/tags/v1.10.0',
        Hash: '75ccf94d605a05fe24817fc2f166f6f2959d5cea'
      }
    })
  }),

  // Gin versions list
  http.get('https://proxy.golang.org/github.com/gin-gonic/gin/@v/list', () => {
    return new HttpResponse('v1.10.0\nv1.9.1\nv1.9.0\nv1.8.2\nv1.8.1', {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }),

  // Gorilla Mux latest version
  http.get('https://proxy.golang.org/github.com/gorilla/mux/@latest', () => {
    return HttpResponse.json({
      Version: 'v1.8.1',
      Time: '2024-01-15T12:00:00Z',
      Origin: {
        VCS: 'git',
        URL: 'https://github.com/gorilla/mux',
        Ref: 'refs/tags/v1.8.1',
        Hash: 'abc123def456'
      }
    })
  }),

  // Gorilla Mux versions list
  http.get('https://proxy.golang.org/github.com/gorilla/mux/@v/list', () => {
    return new HttpResponse('v1.8.1\nv1.8.0\nv1.7.4\nv1.7.3\nv1.7.2', {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  })
)
