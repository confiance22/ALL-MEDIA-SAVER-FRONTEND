import { useEffect, useState } from 'react'
import { MenuIcon } from './Icons.jsx'

const LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Supported', href: '#platforms' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06080D]/90 backdrop-blur-md border-b border-[#131A29] py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Media Saver" className="h-10 w-auto" />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Media Saver
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex h-9 items-center rounded-lg px-3.5 text-[13px] font-normal leading-4 text-[#9FADC0] transition-colors duration-200 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
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
          className="rounded-xl p-2 text-white lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-2 space-y-1 rounded-xl border border-[#1C2636] bg-[#0B0F17] p-4 lg:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-[13px] text-[#9FADC0] transition-colors hover:bg-white/5 hover:text-white"
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
        </div>
      )}
    </header>
  )
}