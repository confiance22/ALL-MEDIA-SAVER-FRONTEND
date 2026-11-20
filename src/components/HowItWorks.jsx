import Reveal from './Reveal.jsx'
import { ArrowIcon, DownloadIcon, LinkIcon } from './Icons.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Paste a link',
    desc: 'Copy a post link from TikTok, Instagram, YouTube or X and drop it in the box.',
    icon: LinkIcon,
    accent: 'from-blue/20 to-transparent',
  },
  {
    n: '02',
    title: 'We resolve it',
    desc: 'The backend finds the direct file behind the page. Nothing is stored on the server.',
    icon: ArrowIcon,
    accent: 'from-blue/15 to-transparent',
  },
  {
    n: '03',
    title: 'You save it',
    desc: 'Hit download and the file lands on your device, with your browser handling the rest.',
    icon: DownloadIcon,
    accent: 'from-blue/10 to-transparent',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="bg-[var(--bg)] py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-dim)]">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            Simple by design
          </span>
          <h2 className="mt-6 text-[30px] font-bold tracking-[-0.02em] text-[var(--text)] sm:text-[36px]">
            Three steps, that&apos;s it
          </h2>
          <p className="mt-3 text-[14px] leading-[1.7] text-[var(--text-dim)]">
            No account, no queue, no processing. You paste the link and keep the file.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-5 sm:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent sm:block"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-[26px] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 sm:p-7">
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.accent} blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative flex items-center justify-between">
                  <span className="flex h-[68px] w-[68px] items-center justify-center rounded-[22px] border border-blue/25 bg-blue/10 text-blue">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <span className="text-[28px] font-bold tracking-tight text-[var(--text-faint)]">
                    {s.n}
                  </span>
                </div>
                <h3 className="relative mt-6 text-[16px] font-semibold text-[var(--text)]">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-[13px] leading-[1.75] text-[var(--text-dim)]">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
