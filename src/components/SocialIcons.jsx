import { social, church } from '../data/churchData.js'

// true = show icons that have no link yet (dimmed, not tappable)
// false = hide them until the link is added
const SHOW_EMPTY = true

const empty = (v) => !v || v.startsWith('ADD') || v.startsWith('PASTE')

const icons = {
  youtube: <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />,
  facebook: <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.5 0-1.97.93-1.97 1.89v2.26h3.35l-.54 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />,
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </g>
  ),
  tiktok: <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />,
  x: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  whatsapp: <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z" />,
  call: <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />,
  email: <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />,
}

// tone="dark": for navy backgrounds (footer). tone="light": for white backgrounds.
const tones = {
  dark: {
    on: 'bg-white/10 text-white ring-1 ring-white/30 hover:bg-gold hover:text-navy',
    off: 'bg-white/5 text-white/40 ring-1 ring-white/15',
  },
  light: {
    on: 'bg-navy text-white hover:bg-gold hover:text-navy',
    off: 'bg-navy/10 text-navy/40',
  },
}

export default function SocialIcons({ className = '', tone = 'dark' }) {
  const t = tones[tone] || tones.dark

  const items = [
    { key: 'facebook', label: 'Facebook', href: empty(social.facebook) ? '' : social.facebook },
    { key: 'instagram', label: 'Instagram', href: empty(social.instagram) ? '' : social.instagram },
    { key: 'youtube', label: 'YouTube', href: empty(social.youtube) ? '' : social.youtube },
    { key: 'tiktok', label: 'TikTok', href: empty(social.tiktok) ? '' : social.tiktok },
    { key: 'x', label: 'X', href: empty(social.x) ? '' : social.x },
    { key: 'whatsapp', label: 'WhatsApp', href: empty(social.whatsapp) ? '' : `https://wa.me/${social.whatsapp}` },
    { key: 'call', label: 'Call us', href: empty(church.phone) ? '' : `tel:${church.phone}` },
    { key: 'email', label: 'Email', href: empty(social.email) ? '' : `mailto:${social.email}` },
  ].filter((i) => SHOW_EMPTY || i.href)

  if (items.length === 0) return null

  const size = 'flex h-11 w-11 items-center justify-center rounded-full transition'
  const svg = (key) => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      {icons[key]}
    </svg>
  )

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((i) =>
        i.href ? (
          <a
            key={i.key}
            href={i.href}
            target={i.key === 'call' || i.key === 'email' ? undefined : '_blank'}
            rel="noreferrer"
            aria-label={i.label}
            title={i.label}
            className={`${size} ${t.on}`}
          >
            {svg(i.key)}
          </a>
        ) : (
          <span
            key={i.key}
            aria-label={`${i.label} (coming soon)`}
            title={`${i.label} (coming soon)`}
            className={`${size} ${t.off} cursor-default`}
          >
            {svg(i.key)}
          </span>
        )
      )}
    </div>
  )
}