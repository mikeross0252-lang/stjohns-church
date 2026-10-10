import { useState } from 'react'

// zoom: crops the white margin inside the JPG
// pos:  centers the artwork inside the circle ('50% 50%' = middle).
//       If the logo sits too far LEFT, lower the first number (e.g. '42% 50%').
//       If it sits too far RIGHT, raise it (e.g. '58% 50%').
const logoFiles = [
  { src: '/images/army-badge.jpg', alt: 'Nigerian Army badge', zoom: 1.15, pos: '50% 50%' },
    { src: '/images/engineers-badge.png', alt: 'Nigerian Army Engineers badge', zoom: 1, pos: '50% 50%' },
  { src: '/images/horse-emblem.png', alt: 'Emblem', zoom: 1, pos: '50% 50%' },
  { src: '/images/crest.jpg', alt: "St John's church crest", zoom: 1.15, pos: '50% 50%' },
]

const crestFile = logoFiles.find((l) => l.src === '/images/crest.jpg')

export function CrossMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="13" y="3" width="6" height="26" rx="1.5" fill="currentColor" />
      <rect x="6" y="10" width="20" height="6" rx="1.5" fill="currentColor" />
    </svg>
  )
}

// A perfect circle: square frame, image centered and cropped to fill it.
function Logo({ file, height, onFail, extra = '' }) {
  return (
    <span
      className={`relative inline-block aspect-square shrink-0 overflow-hidden rounded-full shadow-lg shadow-black/40 ${height} ${extra}`}
    >
      <img
        src={file.src}
        alt={file.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: file.pos, transform: `scale(${file.zoom})` }}
        onError={onFail}
      />
    </span>
  )
}

// Both logos side by side with spacing. Use ONLY in Navbar and Footer.
export default function Logos({ size = 'h-12 sm:h-16', gap = 'gap-4' }) {
  const [failed, setFailed] = useState({})
  const visible = logoFiles.filter((l) => !failed[l.src])

  if (visible.length === 0) {
    return <CrossMark className="h-12 w-12 text-gold" />
  }

  return (
    <span className={`flex items-center ${gap}`}>
      {visible.map((l) => (
        <Logo
          key={l.src}
          file={l}
          height={size}
          onFail={() => setFailed((f) => ({ ...f, [l.src]: true }))}
        />
      ))}
    </span>
  )
}

// Church crest ALONE with a heartbeat. Use on the Home hero and department placeholders.
export function Crest({ className = 'h-40 sm:h-56', beat = true }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <CrossMark className={`${className} aspect-square text-gold`} />
  }

  return (
    <Logo
      file={crestFile}
      height={className}
      onFail={() => setFailed(true)}
      extra={beat ? 'animate-heartbeat' : ''}
    />
  )
}