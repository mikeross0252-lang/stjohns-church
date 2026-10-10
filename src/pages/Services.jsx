import { Link } from 'react-router-dom'
import { church, services } from '../data/churchData.js'
import { Crest } from '../components/Logos.jsx'

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    church.coordinates || church.address + ', Nigeria'
)}`

export default function Services() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
             <Crest className="mx-auto mb-4 h-16 sm:h-20" beat={false} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            Join us
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">
            Services and Programs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Everyone is welcome. Here is when we meet to worship, pray, and study together.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        {services.length > 0 ? (
          <div className="space-y-4">
            {services.map((s, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-navy/10 sm:flex sm:items-start sm:justify-between sm:gap-6 sm:p-6"
              >
                <div>
                  <h2 className="font-display text-3xl text-navy sm:text-4xl">{s.name}</h2>
                  {s.note && <p className="mt-1 text-ink/70">{s.note}</p>}
                </div>
                <div className="mt-3 shrink-0 sm:mt-0 sm:text-right">
                  <p className="font-semibold text-royal">{s.day}</p>
                  <p className="text-ink/80">{[s.time, s.place].filter(Boolean).join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-navy/10">
            <h2 className="font-display text-4xl text-navy">Times coming soon</h2>
            <p className="mt-2 text-ink/70">
              Our service and program times will be posted here very soon.
            </p>
          </div>
        )}
      </section>

      {/* Plan your visit */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:py-16">
          <h2 className="font-display text-4xl sm:text-6xl">Plan your visit</h2>
          <p className="mt-3 text-white/80">{church.address}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={mapsLink} target="_blank" rel="noreferrer" className="btn btn-gold">
              Get directions
            </a>
            <Link to="/new-here" className="btn btn-outline-light">
              I am visiting
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}