import { DownloadIcon } from './Icons.jsx'

const LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Supported', href: '#platforms' },
  { label: 'Mobile app', href: '#mobile' },
  { label: 'Back to top', href: '#top' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr] sm:items-start">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-blue/25 bg-blue/10 p-2">
              <img src="/logo.png" alt="All Media Saver" className="h-full w-auto object-contain" />
            </span>
            <div>
              <p className="text-[16px] font-semibold tracking-tight text-[var(--text)]">
                All Media Saver
              </p>
              <p className="mt-1 max-w-sm text-[12px] leading-[1.7] text-[var(--text-dim)]">
                Your own TikTok, Instagram, YouTube and X downloader. On the web and on your
                phone.
              </p>
              <a
                href="#mobile"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1.5 text-[11px] font-semibold text-blue transition-colors hover:bg-blue/20"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                Get the mobile app
              </a>
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Explore
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-3 py-2 text-[12px] font-medium text-[var(--text-dim)] transition-colors hover:bg-[var(--hover-fill)] hover:text-[var(--text)]"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-soft)] pt-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-[var(--text-faint)]">
            © {year} All Media Saver. For personal use only.
          </p>
          <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
            Nothing is stored server-side. Not affiliated with TikTok, Instagram, YouTube or X.
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">
            Built by{' '}
            <a
              href="https://confiance-portifolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--text)] transition-colors hover:text-blue"
            >
              Dev.Confiance
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
