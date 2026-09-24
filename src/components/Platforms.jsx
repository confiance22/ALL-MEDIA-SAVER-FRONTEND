import Reveal from './Reveal.jsx'
import { InstagramIcon, TikTokIcon, XIcon, YouTubeIcon } from './Icons.jsx'

const PLATFORMS = [
  {
    name: 'TikTok',
    tag: 'tiktok.com',
    icon: TikTokIcon,
    points: ['Videos without watermark', 'Photo posts', 'Slideshows'],
  },
  {
    name: 'Instagram',
    tag: 'instagram.com',
    icon: InstagramIcon,
    points: ['Reels & single videos', 'Single photos', 'Carousel posts, every item'],
  },
  {
    name: 'YouTube',
    tag: 'youtube.com',
    icon: YouTubeIcon,
    points: ['Videos up to 1080p', 'Long & short form', 'Playlists, one video each'],
  },
  {
    name: 'X (Twitter)',
    tag: 'x.com',
    icon: XIcon,
    points: ['Native videos', 'Photo posts', 'Anything in a tweet'],
  },
]

export default function Platforms() {
  return (
    <section id="platforms" className="bg-[var(--bg)] py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-[30px] font-bold tracking-[-0.02em] text-[var(--text)] sm:text-[36px]">
            What you can save
          </h2>
          <p className="mt-3 text-[14px] leading-[1.7] text-[var(--text-dim)]">
            Four platforms, every format they throw at you. A multi-photo Instagram post
            gives you a download link for each photo, numbered in order.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#2A6BFF]/40">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue text-white">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[var(--text)]">{p.name}</h3>
                    <p className="text-[12px] text-[var(--text-muted)]">{p.tag}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[13px] text-[var(--text-dim)]">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}