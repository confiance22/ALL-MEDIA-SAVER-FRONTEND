import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Downloader from './components/Downloader.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Platforms from './components/Platforms.jsx'
import MobileApp from './components/MobileApp.jsx'
import Footer from './components/Footer.jsx'
import { GalleryIcon, ImageIcon, VideoIcon } from './components/Icons.jsx'

const FORMATS = [
  { label: 'Video', icon: VideoIcon },
  { label: 'Photo', icon: ImageIcon },
  { label: 'Carousel', icon: GalleryIcon },
]

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-body)] antialiased">
      <Navbar />

      <main id="top" className="relative overflow-hidden">
        <section className="relative px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid" />
          <div className="relative mx-auto flex max-w-[1200px] flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-dim)]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              Personal tool
            </span>

            <h1 className="mt-7 max-w-3xl text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--text)] sm:text-[46px]">
              Save media from TikTok, Instagram, YouTube & X.{' '}
              <span className="text-blue">No watermark.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[14px] leading-[1.7] text-[var(--text-dim)] sm:text-[15px]">
              Paste a link, get the file. Videos, photos, and whole carousels,
              resolved and streamed straight to your device, never stored.
            </p>

            <div className="mt-8 flex w-full justify-center">
              <Downloader />
            </div>

            <div className="mt-12 grid w-full max-w-[620px] grid-cols-3 gap-3">
              {FORMATS.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-4"
                >
                  <f.icon className="h-5 w-5 text-blue" />
                  <span className="text-[12px] font-medium text-[var(--text-dim)]">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />
        <Platforms />
        <MobileApp />
      </main>

      <Footer />
    </div>
  )
}

export default App