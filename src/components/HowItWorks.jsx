import Reveal from './Reveal.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Paste a link',
    desc: 'Copy the post link from TikTok or Instagram and drop it in the box. Works for single posts and multi-photo carousels.',
  },
  {
    n: '02',
    title: 'We resolve it',
    desc: 'The backend finds the direct file behind the page. Nothing is downloaded or stored on the server. It just reads the URL.',
  },
  {
    n: '03',
    title: 'You save it',
    desc: 'Hit download and the file lands on your device. One click per video, photo, or carousel item.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="border-y border-[var(--border-soft)] bg-[var(--bg-band)] py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-[30px] font-bold tracking-[-0.02em] text-[var(--text)] sm:text-[36px]">
            Three steps, that&apos;s it
          </h2>
          <p className="mt-3 text-[14px] leading-[1.7] text-[var(--text-dim)]">
            No account, no queue, no processing. You paste the link and keep the file.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#2A6BFF]/40">
                <span className="text-[34px] font-bold tracking-tight text-blue/80">
                  {s.n}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold text-[var(--text)]">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-[var(--text-dim)]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}