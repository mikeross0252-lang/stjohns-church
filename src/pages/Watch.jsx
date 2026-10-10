import { useState } from 'react'
import { watch, social } from '../data/churchData.js'
import { Crest } from '../components/Logos.jsx'

const platformLabels = {
  youtube: 'YouTube',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  x: 'X',
}

function youtubeId(url = '') {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    if (u.searchParams.get('v')) return u.searchParams.get('v')
    const m = u.pathname.match(/\/(live|shorts|embed)\/([^/?]+)/)
    return m ? m[2] : null
  } catch {
    return null
  }
}

function thumbFor(item) {
  if (item.thumbnail) return item.thumbnail
  if (item.platform === 'youtube') {
    const id = youtubeId(item.url)
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  }
  return ''
}

const formatDate = (iso) =>
  iso
    ? new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

function PlayIcon() {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy/75 text-white ring-2 ring-white/70">
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  )
}

function Thumb({ item }) {
  const [failed, setFailed] = useState(false)
  const src = thumbFor(item)

  return (
    <div className="relative aspect-video overflow-hidden bg-navy">
      {src && !failed ? (
        <img
          src={src}
          alt={item.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy to-royal px-4 text-center font-display text-3xl text-white/90">
          {platformLabels[item.platform] || 'Video'}
        </div>
      )}
      <PlayIcon />
      {item.live && (
        <span className="absolute left-3 top-3 rounded bg-red-700 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Live
        </span>
      )}
    </div>
  )
}

export default function Watch() {
  const [filter, setFilter] = useState('all')

  const sorted = [...watch].sort((a, b) => {
    if (a.live !== b.live) return a.live ? -1 : 1
    return (b.date || '').localeCompare(a.date || '')
  })

  const platforms = [...new Set(watch.map((w) => w.platform))]
  const shown = filter === 'all' ? sorted : sorted.filter((w) => w.platform === filter)

  const chip = (active) =>
    `btn btn-sm ${active ? 'btn-navy' : 'btn-outline-navy'}`

  return (
    <div>
      {/* Header: shows /images/watch.jpg when it exists, a blue gradient until then */}
      <section
        className="relative text-white"
        style={{
          backgroundImage:
            "url('/images/watch.jpg'), linear-gradient(135deg, #0A2557 0%, #17407F 100%)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <Crest className="mx-auto mb-4 h-16 sm:h-20" beat={false} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            Services and messages
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">Watch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Live streams and videos from our church. Tap a video to watch it on the platform where
            it is posted.
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {watch.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-navy/10">
            <h2 className="font-display text-4xl text-navy">Videos coming soon</h2>
            <p className="mt-2 text-ink/70">
              Our live streams and videos will appear here. Check back soon.
            </p>
          </div>
        ) : (
          <>
            {platforms.length > 1 && (
              <div className="mb-6 flex flex-wrap gap-2">
                <button onClick={() => setFilter('all')} className={chip(filter === 'all')}>
                  All
                </button>
                {platforms.map((p) => (
                  <button key={p} onClick={() => setFilter(p)} className={chip(filter === p)}>
                    {platformLabels[p] || p}
                  </button>
                ))}
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((item) => {
                const label = platformLabels[item.platform] || 'the link'
                return (
                  <a
                    key={item.id || item.url}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy/10 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Thumb item={item} />
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-royal">
                        {[label, formatDate(item.date)].filter(Boolean).join(' · ')}
                      </p>
                      <h2 className="mt-1 font-display text-3xl leading-tight text-navy">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm font-semibold text-royal group-hover:underline">
                        Watch on {label} →
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
          </>
        )}
      </section>

           {/* Follow */}
      {(social.youtube || social.facebook) && (
        <section className="bg-navy text-white">
          <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:py-16">
            <h2 className="font-display text-4xl sm:text-6xl">Never miss a service</h2>
            <p className="mt-3 text-white/80">Follow us to be notified when we go live.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noreferrer" className="btn btn-gold">
                  YouTube
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noreferrer" className="btn btn-outline-light">
                  Facebook
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}