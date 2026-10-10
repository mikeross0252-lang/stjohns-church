import { Crest } from './Logos.jsx'

export function initials(name = '') {
  const parts = name.split(' ').filter(Boolean)
  if (!parts.length || name === 'To be added') return '?'
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase()
}

export function GroupPhoto({ src, alt, name }) {
  if (src) {
    return <img src={src} alt={alt} className="h-full w-full object-cover" />
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-navy to-royal px-4 text-center text-white">
      <Crest className="h-16 sm:h-20" beat={false} />
      <span className="mt-3 font-display text-2xl font-bold">{name}</span>
    </div>
  )
}

export function LeaderPhoto({ src, name }) {
  if (src) {
    return <img src={src} alt={name} className="h-full w-full object-cover object-top" />
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-royal/10 font-display text-4xl font-bold text-navy">
      {initials(name)}
    </div>
  )
}