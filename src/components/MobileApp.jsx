import Reveal from './Reveal.jsx'
import {
  ArrowIcon,
  CheckIcon,
  ClipboardIcon,
  DownloadIcon,
  LinkIcon,
  MoonIcon,
  TikTokIcon,
  YouTubeIcon,
} from './Icons.jsx'

const APK_URL =
  import.meta.env.VITE_APK_URL ||
  'https://github.com/confiance22/ALL-MEDIA-SAVER-FRONTEND/releases/latest'

const FEATURES = [
  'Works the moment you open it, no sign in and no registration',
  'Every search and saved file is kept in history on your device',
  'Dark and light themes, just like the website',
  'The same backend, so TikTok, Instagram, YouTube and X all work',
]

function PhoneBadge({ children, className = '' }) {
  return (
    <span
      className={`absolute z-10 rounded-full border border-blue/30 bg-[var(--bg-elevated)] px-3 py-1.5 text-[10px] font-semibold text-[var(--text-dim)] shadow-lg shadow-[var(--shadow)] ${className}`}
    >
      {children}
    </span>
  )
}

function PhoneFrame() {
  return (
    <div className="relative mx-auto w-[264px] sm:w-[286px]">
      <div className="absolute -inset-8 rounded-[48px] bg-blue/10 blur-3xl" aria-hidden="true" />
      <PhoneBadge className="-left-6 top-16 sm:-left-10">No sign in</PhoneBadge>
      <PhoneBadge className="-right-4 top-36 sm:-right-8">Saved locally</PhoneBadge>
      <PhoneBadge className="-left-3 bottom-20 sm:-left-8">Dark + light</PhoneBadge>

      <div className="relative rounded-[44px] border-[7px] border-[var(--bg-soft)] bg-[var(--bg-elevated)] p-1.5 shadow-[0_35px_80px_rgba(0,0,0,0.45)]">
        <div className="relative h-[500px] overflow-hidden rounded-[35px] bg-[var(--bg)] px-3.5 pb-3 pt-8">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[var(--bg-soft)]"
          />

          <div className="flex items-center justify-between text-[9px] font-semibold text-[var(--text-muted)]">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--chip-text)]" />
              <span className="h-2 w-3 rounded-[3px] border border-[var(--chip-text)]" />
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-blue text-[11px] font-bold text-white">
                A
              </span>
              <span className="text-[11px] font-semibold text-[var(--text)]">
                All Media Saver
              </span>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-[10px] border border-[var(--border)] text-[var(--text-dim)]">
              <MoonIcon className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-input)] px-3 py-2.5">
            <LinkIcon className="h-3.5 w-3.5 shrink-0 text-blue" />
            <span className="min-w-0 flex-1 truncate text-[9px] text-[var(--text-muted)]">
              tiktok.com/@user/video/12345...
            </span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[9px] bg-blue text-white">
              <ArrowIcon className="h-3 w-3" />
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-2.5">
            <div className="flex gap-2.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-blue-deep text-white">
                <TikTokIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-semibold text-[var(--text)]">
                  city_lights_reel.mp4
                </p>
                <p className="mt-1 text-[8px] text-[var(--text-muted)]">1080p video</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-blue/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-blue">
                  Ready
                </span>
              </div>
            </div>
            <div className="mt-2.5 flex h-7 items-center justify-center gap-1.5 rounded-lg bg-blue text-[9px] font-semibold text-white">
              <DownloadIcon className="h-3 w-3" />
              Download
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[10px] font-semibold text-[var(--text)]">Recent</p>
            <p className="text-[8px] text-blue">See all</p>
          </div>
          <div className="mt-2 space-y-1.5">
            {[
              { icon: YouTubeIcon, label: 'Late night drive', tag: 'YouTube' },
              { icon: ClipboardIcon, label: 'Product shoot', tag: 'Instagram' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-2 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-2"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-soft)] text-blue">
                  <row.icon className="h-3 w-3" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[9px] text-[var(--text-85)]">
                  {row.label}
                </span>
                <span className="text-[7px] text-[var(--text-muted)]">{row.tag}</span>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-around rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue/15 text-blue">
              <DownloadIcon className="h-3 w-3" />
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg text-[var(--text-muted)]">
              <ClipboardIcon className="h-3 w-3" />
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg text-[var(--text-muted)]">
              <MoonIcon className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MobileApp() {
  return (
    <section id="mobile" className="border-y border-[var(--border-soft)] bg-[var(--bg-band)] py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            Mobile app
          </span>
          <h2 className="mt-6 text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text)] sm:text-[40px]">
            The same downloader, right in your pocket.
          </h2>
          <p className="mt-4 max-w-lg text-[14px] leading-[1.8] text-[var(--text-dim)]">
            A small Android app that works exactly like this website. Paste a link, get the
            file, and find everything you saved later in your own local history.
          </p>

          <ul className="mt-8 space-y-3.5">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue/15 text-blue">
                  <CheckIcon className="h-3 w-3" />
                </span>
                <span className="text-[13px] leading-relaxed text-[var(--text-body)]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-blue px-6 text-sm font-semibold text-white shadow-lg shadow-blue/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-hover active:scale-[0.98]"
            >
              <DownloadIcon className="h-4 w-4" />
              Download for Android
            </a>
            <span className="text-[11px] text-[var(--text-muted)]">
              No account. No registration. Just open and use.
            </span>
          </div>
        </Reveal>

        <Reveal delay={120} className="flex justify-center lg:justify-end">
          <PhoneFrame />
        </Reveal>
      </div>
    </section>
  )
}
