import { useEffect, useState } from 'react'
import { MenuIcon, DownloadIcon, SunIcon, MoonIcon } from './Icons.jsx'
import { getTheme, toggleTheme } from '../lib/theme.js'

const LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Supported', href: '#platforms' },
]

function waitForPrompt() {
  return new Promise((resolve) => {
    const handler = (e) => {
      e.preventDefault()
      window.removeEventListener('beforeinstallprompt', handler)
      resolve(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
  })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)
  const [showIosHint, setShowIosHint] = useState(false)
  const [theme, setTheme] = useState(getTheme)

  useEffect(() => {
    setTheme(getTheme())
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    waitForPrompt().then(setInstallPrompt).catch(() => {})
    const done = () => {
      setInstalled(true)
      setInstallPrompt(null)
    }
    window.addEventListener('appinstalled', done)
    return () => window.removeEventListener('appinstalled', done)
  }, [])

  function handleTheme() {
    setTheme(toggleTheme())
  }

  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent)

  async function handleInstall() {
    if (installPrompt) {
      await installPrompt.prompt()
      const choice = await installPrompt.userChoice
      if (choice.outcome === 'accepted') setInstalled(true)
      setInstallPrompt(null)
      return
    }
    if (isIos) setShowIosHint(true)
  }

  const installable = !installed && (installPrompt || isIos)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border-soft)] py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="All Media Saver" className="h-10 w-auto" />
          <span className="text-[15px] font-semibold tracking-tight text-[var(--text)]">
            All Media Saver
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex h-9 items-center rounded-lg px-3.5 text-[13px] font-normal leading-4 text-[var(--text-dim)] transition-colors duration-200 hover:text-[var(--text)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={handleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-dim)] transition-colors duration-200 hover:text-[var(--text)]"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-[18px] w-[18px]" />
            ) : (
              <MoonIcon className="h-[18px] w-[18px]" />
            )}
          </button>
          {installable && (
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#2A6BFF]/40 bg-blue/10 px-4 text-sm font-semibold text-blue transition-colors hover:bg-blue/20"
            >
              <DownloadIcon className="h-4 w-4" />
              Install app
            </button>
          )}
          <a
            href="#downloader"
            className="inline-flex h-10 items-center rounded-xl bg-blue px-5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-hover active:scale-[0.98]"
          >
            Grab a file
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-xl p-2 text-[var(--text)] lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-2 space-y-1 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              handleTheme()
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] text-[var(--text-dim)] transition-colors hover:bg-[var(--hover-fill)] hover:text-[var(--text)]"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-4 w-4 text-blue" />
            ) : (
              <MoonIcon className="h-4 w-4 text-blue" />
            )}
            Switch to {theme === 'dark' ? 'white' : 'dark'} theme
          </button>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-[13px] text-[var(--text-dim)] transition-colors hover:bg-[var(--hover-fill)] hover:text-[var(--text)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#downloader"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-xl bg-blue px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Grab a file
          </a>
          {installable && (
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                handleInstall()
              }}
              className="mt-2 block w-full rounded-xl border border-[#2A6BFF]/40 bg-blue/10 px-4 py-2.5 text-center text-sm font-semibold text-blue"
            >
              Install app
            </button>
          )}
        </div>
      )}

      {showIosHint && (
        <div
          onClick={() => setShowIosHint(false)}
          className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 rounded-xl border border-blue/40 bg-[var(--toast-bg)] px-4 py-3 text-center text-[13px] leading-relaxed text-[var(--text)] shadow-xl shadow-[var(--soft-shadow)]"
          role="status"
        >
          On iPhone/iPad: tap the <span className="font-semibold text-blue">Share</span> button
          in Safari, then choose{' '}
          <span className="font-semibold text-blue">Add to Home Screen</span>. On Android:
          tap the <span className="font-semibold text-blue">⋮</span> menu and choose{' '}
          <span className="font-semibold text-blue">Add to Home screen</span>.
        </div>
      )}
    </header>
  )
}