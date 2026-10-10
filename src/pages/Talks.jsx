import { Link } from 'react-router-dom'
import { talkCategories, talks } from '../data/churchData.js'
import { Crest } from '../components/Logos.jsx'

export default function Talks() {
  const count = (slug) => talks.filter((t) => t.category === slug).length

  return (
    <div>
      {/* Header: shows /images/talks.jpg when it exists, a blue gradient until then */}
      <section
        className="relative text-white"
        style={{
          backgroundImage:
            "url('/images/talks.jpg'), linear-gradient(135deg, #0A2557 0%, #17407F 100%)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <Crest className="mx-auto mb-4 h-16 sm:h-20" beat={false} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            Listen and watch
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">Talks</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Short talks on marriage, faith and more. Pick a topic, then choose to listen or watch.
          </p>
        </div>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {talkCategories.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-navy/10">
            <h2 className="font-display text-4xl text-navy">Talks coming soon</h2>
            <p className="mt-2 text-ink/70">Our talks will appear here. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {talkCategories.map((c) => {
              const n = count(c.slug)
              return (
                <Link
                  key={c.slug}
                  to={`/talks/${c.slug}`}
                  className="group rounded-xl bg-navy p-6 text-white ring-1 ring-navy transition hover:bg-white hover:text-navy"
                >
                  <h2 className="font-display text-4xl">{c.name}</h2>
                  {c.description && (
                    <p className="mt-2 text-white/80 transition group-hover:text-ink/80">
                      {c.description}
                    </p>
                  )}
                  <p className="mt-4 text-sm font-semibold text-gold transition group-hover:text-royal">
                    {n > 0 ? `${n} ${n === 1 ? 'talk' : 'talks'}` : 'Coming soon'} →
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}