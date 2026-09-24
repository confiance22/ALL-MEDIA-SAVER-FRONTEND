import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Downloader from './components/Downloader.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Platforms from './components/Platforms.jsx'
import Footer from './components/Footer.jsx'
import { GalleryIcon, ImageIcon, VideoIcon } from './components/Icons.jsx'

const FORMATS = [
  { label: 'Video', icon: VideoIcon },
  { label: 'Photo', icon: ImageIcon },
  { label: 'Carousel', icon: GalleryIcon },
]

function App() {
  return (
    <div className="min-h-screen bg-[#06080D] text-[#F5F7FA] antialiased">
      <Navbar />

      <main id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] dot-grid" />

        <section className="relative px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1C2636] bg-[#0B0F17] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9FADC0]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              Personal tool
            </span>

            <h1 className="mt-7 max-w-3xl text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[46px]">
              Save media from TikTok, Instagram, YouTube & X.{' '}
              <span className="text-blue">No watermark.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[14px] leading-[1.7] text-[#9FADC0] sm:text-[15px]">
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
                  className="flex flex-col items-center gap-2 rounded-xl border border-[#1C2636] bg-[#0B0F17] px-3 py-4"
                >
                  <f.icon className="h-5 w-5 text-blue" />
                  <span className="text-[12px] font-medium text-[#9FADC0]">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />
        <Platforms />
      </main>

      <Footer />
    </div>
  )
}

export default App