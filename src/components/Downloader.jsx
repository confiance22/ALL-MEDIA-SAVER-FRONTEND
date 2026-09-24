import { useEffect, useRef, useState } from 'react'
import { extractMedia, stashDownload } from '../lib/api.js'
import { ArrowIcon, CheckIcon, ClipboardIcon, DownloadIcon, ImageIcon, VideoIcon } from './Icons.jsx'

const GRAB_LABEL = 'https://www.tiktok.com/@user/video/123456789...'

function TypeBadge({ type }) {
  const video = type === 'video'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
        video ? 'bg-blue/15 text-blue' : 'bg-[var(--chip-bg)] text-[var(--chip-text)]'
      }`}
    >
      {video ? 'Video' : 'Photo'}
    </span>
  )
}

export default function Downloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(null)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  const busy = loading

  function showToast(message) {
    setToast(message)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 6000)
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const value = url.trim()
    if (!value || busy) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await extractMedia(value)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setUrl(text.trim())
    } catch {
      /* clipboard not accessible */
    }
  }

  async function handleSave(item) {
    if (saving) return
    setSaving(item.filename)
    setError(null)
    try {
      const href = await stashDownload(item)
      if (item.audio_url) {
        const a = document.createElement('a')
        a.href = href
        a.rel = 'noopener'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        a.remove()
        showToast('Download started, check your Downloads folder')
        return
      }
      const res = await fetch(href)
      if (!res.ok) {
        let message = `Download failed (${res.status})`
        try {
          const data = await res.json()
          if (data?.detail) {
            message = typeof data.detail === 'string' ? data.detail : message
          }
        } catch {
          /* keep default message */
        }
        setError(message)
        return
      }
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = item.filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(objectUrl)
      showToast(`Saved to Downloads: ${item.filename}`)
    } catch (err) {
      setError(err.message || 'Download failed')
    } finally {
      setSaving(null)
    }
  }

  return (
    <div id="downloader" className="w-full max-w-[720px]">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-xl shadow-[var(--shadow)] sm:p-5"
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={GRAB_LABEL}
            autoComplete="off"
            spellCheck="false"
            className="h-12 flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] px-4 text-[14px] text-[var(--text)] placeholder-[var(--text-faint)] outline-none transition-colors focus:border-blue"
          />
          <button
            type="button"
            onClick={handlePaste}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#2A6BFF]/40 bg-blue/10 px-5 text-sm font-semibold text-blue transition-all duration-200 hover:bg-blue/20 active:scale-[0.98]"
          >
            <ClipboardIcon className="h-4 w-4" />
            Paste
          </button>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-hover active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="spinner" />
                Fetching...
              </>
            ) : (
              <>
                Get Download
                <ArrowIcon className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-[var(--danger-line)] bg-[var(--danger-bg)] px-4 py-3 text-[13px] leading-relaxed text-[#FB7185]">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-4 rounded-xl border border-[var(--bg-hover)] bg-[var(--bg-input)] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 truncate text-[13px] font-medium text-[var(--text)]">
                {result.title || 'Untitled post'}
              </p>
              <span
                className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                  result.type === 'carousel'
                    ? 'bg-blue/15 text-blue'
                    : result.type === 'video'
                      ? 'bg-blue/15 text-blue'
                      : 'bg-[var(--chip-bg)] text-[var(--chip-text)]'
                }`}
              >
                {result.type === 'carousel'
                  ? `${result.items.length} items`
                  : result.type === 'video'
                    ? 'Video'
                    : 'Photo'}
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {result.items.map((item, i) => (
                <div
                  key={`${item.filename}-${i}`}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3.5 py-3"
                >
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src =
                          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                      }}
                      className="h-12 w-12 shrink-0 rounded-lg border border-[var(--border)] object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-soft)] text-[var(--text-dim)]">
                      {item.type === 'video' ? (
                        <VideoIcon className="h-[18px] w-[18px]" />
                      ) : (
                        <ImageIcon className="h-[18px] w-[18px]" />
                      )}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-[var(--text-85)]">
                      {item.filename}
                    </p>
                    <div className="mt-0.5">
                      <TypeBadge type={item.type} />
                    </div>
                  </div>
                  <button
                    onClick={() => handleSave(item)}
                    disabled={saving !== null}
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-blue px-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-blue-hover disabled:pointer-events-none disabled:opacity-70"
                  >
                    {saving === item.filename ? (
                      <span className="spinner spinner-sm" />
                    ) : (
                      <>
                        <DownloadIcon className="h-4 w-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!error && !result && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--border-soft)] pt-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
              <CheckIcon className="h-3.5 w-3.5 text-blue" />
              Videos & photos
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
              <CheckIcon className="h-3.5 w-3.5 text-blue" />
              Full carousels
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
              <CheckIcon className="h-3.5 w-3.5 text-blue" />
              No watermark
            </span>
          </div>
        )}
      </form>

      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 rounded-xl border border-blue/40 bg-[var(--toast-bg)] px-4 py-3 text-center text-[13px] font-medium text-[var(--text)] shadow-xl shadow-[var(--soft-shadow)]"
        >
          {toast}
        </div>
      )}
    </div>
  )
}