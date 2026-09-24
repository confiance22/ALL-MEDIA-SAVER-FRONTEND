export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
).replace(/\/+$/, '')

export async function extractMedia(url) {
  const res = await fetch(`${BACKEND_URL}/extract`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.detail) {
        message =
          typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)
      }
    } catch {
      /* keep default message */
    }
    throw new Error(message)
  }

  return res.json()
}

export async function stashDownload(item) {
  const res = await fetch(`${BACKEND_URL}/stash`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: item.url,
      filename: item.filename,
      audio_url: item.audio_url || undefined,
      request_headers: item.request_headers || undefined,
    }),
  })
  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.detail) {
        message = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)
      }
    } catch {
      /* keep default message */
    }
    throw new Error(message)
  }
  const data = await res.json()
  return `${BACKEND_URL}/download?token=${encodeURIComponent(data.token)}`
}