import Reveal from './Reveal.jsx'
import { CheckIcon, InstagramIcon, TikTokIcon, XIcon, YouTubeIcon } from './Icons.jsx'

const PLATFORMS = [
  {
    name: 'TikTok',
    tag: 'tiktok.com',
    icon: TikTokIcon,
    tint: 'from-blue/25 via-blue/5 to-transparent',
    points: ['Videos without watermark', 'Photo posts', 'Slideshows'],
  },
  {
    name: 'Instagram',
    tag: 'instagram.com',
    icon: InstagramIcon,
    tint: 'from-blue/20 via-blue/5 to-transparent',
    points: ['Reels and videos', 'Single photos', 'Full carousels'],
  },
  {
    name: 'YouTube',
    tag: 'youtube.com',
    icon: YouTubeIcon,
    tint: 'from-blue/15 via-blue/5 to-transparent',
    points: ['Videos up to 1080p', 'Long and short form', 'Playlists, one by one'],
  },
  {
    name: 'X (Twitter)',
    tag: 'x.com',
    icon: XIcon,
    tint: 'from-blue/10 via-blue/5 to-transparent',
    points: ['Native videos', 'Photo posts', 'Anything in a tweet'],
  },
]

export default function Platforms() {
  return (
    <section id="platforms" className="border-t border-[var(--border-soft)] bg-[var(--bg-band)] py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-dim)]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              Supported sites
            </span>
            <h2 className="mt-6 text-[30px] font-bold tracking-[-0.02em] text-[var(--text)] sm:text-[36px]">
              What you can save
            </h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-[var(--text-dim)]">
              Four platforms, every format they throw at you. A multi-photo post gives you a
              download link for each item, numbered in order.
            </p>
          </div>
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-[16px] border border-blue/30 bg-blue/10 text-[11px] font-bold text-blue sm:self-auto">
            4
          </span>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/40">
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.tint} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative flex items-center gap-3.5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[19px] bg-blue text-white shadow-md shadow-blue/20">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-[16px] font-semibold text-[var(--text)]">
                      {p.name}
                    </h3>
                    <p className="truncate text-[11px] text-[var(--text-muted)]">{p.tag}</p>
                  </div>
                </div>

                <div className="relative mt-6 h-px w-full bg-[var(--border-soft)]" />

                <ul className="relative mt-5 flex-1 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[12.5px] leading-snug text-[var(--text-dim)]">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue/15 text-blue">
                        <CheckIcon className="h-2.5 w-2.5" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>

                <span className="relative mt-6 inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-[var(--bg-input)] px-3 py-1 text-[10px] font-medium text-[var(--text-muted)]">
                  Ready to use
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
