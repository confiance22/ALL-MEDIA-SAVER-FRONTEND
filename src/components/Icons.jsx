const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const VideoIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <rect x="2.5" y="5.5" width="13" height="13" rx="2.5" />
    <path d="M15.5 10.5l6-3.5v10l-6-3.5" />
  </svg>
)

export const ImageIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="M3.5 17l5-5 3.5 3.5 3-3 5.5 5.5" />
  </svg>
)

export const GalleryIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

export const DownloadIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <path d="M12 3.5v11m0 0l-4.5-4.5M12 14.5l4.5-4.5" />
    <path d="M4 17v1.5A2.5 2.5 0 006.5 21h11a2.5 2.5 0 002.5-2.5V17" />
  </svg>
)

export const LinkIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <path d="M10 14a4 4 0 005.5.5l3-3a4 4 0 00-5.5-5.5L12 7" />
    <path d="M14 10a4 4 0 00-5.5-.5l-3 3a4 4 0 005.5 5.5L12 17" />
  </svg>
)

export const ArrowIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <path d="M4.5 12h15m0 0l-6-6m6 6l-6 6" />
  </svg>
)

export const CheckIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
)

export const MenuIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const SunIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.75 1.75M17.25 17.25L19 19M19 5l-1.75 1.75M6.75 17.25L5 19" />
  </svg>
)

export const MoonIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <path d="M20.5 13.5A8.5 8.5 0 0110.5 3.5a8.5 8.5 0 1010 10z" />
  </svg>
)

export const ClipboardIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" {...base}>
    <rect x="6" y="4" width="12" height="17" rx="2.5" />
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M9 11h6M9 15h6" />
  </svg>
)

export const TikTokIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
)

export const InstagramIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

export const YouTubeIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

export const XIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)