export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[#131A29] bg-[#080B12]">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Media Saver" className="h-12 w-auto" />
            <div>
              <p className="text-[14px] font-semibold text-white">Media Saver</p>
              <p className="text-[11px] text-[#64748B]">
                Your own TikTok, Instagram, YouTube & X downloader
              </p>
            </div>
          </div>
          <p className="max-w-sm text-[12px] leading-[1.6] text-[#64748B]">
            Personal tool. Nothing is stored server-side, files stream straight to your
            device. Not affiliated with TikTok, Instagram, YouTube, or X.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#131A29] pt-6 sm:flex-row">
          <p className="text-[11px] text-[#4B5565]">
            © {year} Media Saver. For personal use only.
          </p>
          <p className="inline-flex items-center gap-1.5 text-[11px] text-[#64748B]">
            Built by{' '}
            <a
              href="https://confiance-portifolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white transition-colors hover:text-blue"
            >
              Dev.Confiance
            </a>
            with
            <svg className="h-3 w-3 text-[#FB7185]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21s-7.5-4.5-9.5-9C1 8.5 3 4.5 7 4.5c2.2 0 3.5 1 5 2.7 1.5-1.7 2.8-2.7 5-2.7 4 0 6 4 4.5 7.5C19.5 16.5 12 21 12 21z" />
            </svg>
          </p>
          <div className="flex gap-5">
            <a href="#top" className="text-[11px] text-[#64748B] transition-colors hover:text-white">
              Back to top
            </a>
            <a href="#how" className="text-[11px] text-[#64748B] transition-colors hover:text-white">
              How it works
            </a>
            <a href="#platforms" className="text-[11px] text-[#64748B] transition-colors hover:text-white">
              Supported
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}