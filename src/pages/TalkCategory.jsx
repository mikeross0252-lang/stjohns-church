import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { talkCategories, talks } from '../data/churchData.js'

const platformLabels = {
  youtube: 'YouTube',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  x: 'X',
}

// Plays inside the site only if the link is a direct audio file
const isDirectAudio = (url = '') => /\.(mp3|m4a|wav|ogg|aac)(\?.*)?$/i.test(url)

const formatDate = (iso) =>
  iso
    ? new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

function TalkCard({ talk }) {
  const [playing, setPlaying] = useState(false)
  const direct = isDirectAudio(talk.audio)
  const platform = platformLabels[talk.videoPlatform]

  return (
    <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
      <h2 className="font-display text-3xl leading-tight text-navy">{talk.title}</h2>
      <p className="mt-1 text-sm text-ink/70">
        {[talk.speaker, formatDate(talk.date)].filter(Boolean).join(' · ')}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {talk.audio &&
          (direct ? (
            <button onClick={() => setPlaying(!playing)} className="btn btn-navy btn-sm">
              {playing ? 'Hide player' : 'Listen'}
            </button>
          ) : (
            <a href={talk.audio} target="_blank" rel="noreferrer" className="btn btn-navy btn-sm">
              Listen
            </a>
          ))}
        {talk.video && (
          <a href={talk.video} target="_blank" rel="noreferrer" className="btn btn-outline-navy btn-sm">
            {platform ? `Watch on ${platform}` : 'Watch'}
          </a>
        )}
      </div>

      {playing && direct && (
        <audio controls autoPlay preload="none" src={talk.audio} className="mt-4 w-full" />
      )}
    </article>
  )
}

export default function TalkCategory() {
  const { slug } = useParams()
  const [format, setFormat] = useState('all')
  const category = talkCategories.find((c) => c.slug === slug)

  if (!category) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-5xl text-navy">Topic not found</h1>
        <Link to="/talks" className="mt-4 inline-block font-semibold text-royal hover:underline">
          ← Back to all talks
        </Link>
      </section>
    )
  }

  const all = talks
    .filter((t) => t.category === slug)
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  const list = all.filter(
    (t) => format === 'all' || (format === 'audio' && t.audio) || (format === 'video' && t.video)
  )

  const chip = (active) => `btn btn-sm ${active ? 'btn-navy' : 'btn-outline-navy'}`

  return (
    <div>
      {/* Header */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
          <Link to="/talks" className="text-sm font-semibold text-gold hover:underline">
            ← All talks
          </Link>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">{category.name}</h1>
          {category.description && (
            <p className="mx-auto mt-4 max-w-2xl text-white/80">{category.description}</p>
          )}
        </div>
      </section>

      {/* Talks */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        {all.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-navy/10">
            <h2 className="font-display text-4xl text-navy">Talks coming soon</h2>
            <p className="mt-2 text-ink/70">New talks on this topic will be added here.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-2">
              <button onClick={() => setFormat('all')} className={chip(format === 'all')}>
                All
              </button>
              <button onClick={() => setFormat('audio')} className={chip(format === 'audio')}>
                Audio
              </button>
              <button onClick={() => setFormat('video')} className={chip(format === 'video')}>
                Video
              </button>
            </div>

            {list.length === 0 ? (
              <p className="text-ink/70">
                There are no {format} talks on this topic yet. Try another format.
              </p>
            ) : (
              <div className="space-y-4">
                {list.map((t) => (
                  <TalkCard key={t.id || t.title} talk={t} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}