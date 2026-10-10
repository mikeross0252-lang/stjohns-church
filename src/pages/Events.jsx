import { church, events } from '../data/churchData.js'
import { Crest } from '../components/Logos.jsx'

const pad = (n) => String(n).padStart(2, '0')
const toDate = (iso) => new Date(iso + 'T00:00:00')
const ymd = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
const todayIso = () => {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const dayNum = (iso) => toDate(iso).getDate()
const monthShort = (iso) => toDate(iso).toLocaleDateString('en-GB', { month: 'short' })
const monthHeading = (iso) =>
  toDate(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
const longDate = (iso) =>
  toDate(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

function calendarLink(e) {
  const start = toDate(e.date)
  const end = new Date(start)
  end.setDate(end.getDate() + 1)
  const details = [e.time && `Time: ${e.time}`, e.description].filter(Boolean).join('\n')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${ymd(start)}/${ymd(end)}`,
    details,
    location: [e.place, church.address].filter(Boolean).join(', '),
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function EventCard({ event, past = false }) {
  return (
    <article className="flex gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-navy/10 sm:gap-5 sm:p-5">
      <div
        className={`flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-lg text-white sm:h-24 sm:w-20 ${
          past ? 'bg-ink/60' : 'bg-navy'
        }`}
      >
        <span className="font-display text-4xl leading-none sm:text-5xl">{dayNum(event.date)}</span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
          {monthShort(event.date)}
        </span>
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-3xl leading-tight text-navy">{event.title}</h3>
        <p className="mt-1 text-sm text-ink/70">{longDate(event.date)}</p>
        {(event.time || event.place) && (
          <p className="text-sm text-ink/80">
            {[event.time, event.place].filter(Boolean).join(' · ')}
          </p>
        )}
        {event.description && <p className="mt-2 text-ink/80">{event.description}</p>}
        {!past && (
          <a
            href={calendarLink(event)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-navy btn-sm mt-3"
          >
            Add to Google Calendar
          </a>
        )}
      </div>
    </article>
  )
}

export default function Events() {
  const today = todayIso()

  const upcoming = events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const past = events
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8)

  // Group upcoming events by month
  const groups = []
  upcoming.forEach((e) => {
    const heading = monthHeading(e.date)
    const last = groups[groups.length - 1]
    if (last && last.heading === heading) last.items.push(e)
    else groups.push({ heading, items: [e] })
  })

  return (
    <div>
      {/* Header: shows /images/events.jpg when it exists, a blue gradient until then */}
      <section
        className="relative text-white"
        style={{
          backgroundImage:
            "url('/images/events.jpg'), linear-gradient(135deg, #0A2557 0%, #17407F 100%)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <Crest className="mx-auto mb-4 h-16 sm:h-20" beat={false} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            What is coming up
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">Events</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Programs and special services at {church.shortName}. Save the date and join us.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {groups.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-navy/10">
            <h2 className="font-display text-4xl text-navy">No events right now</h2>
            <p className="mt-2 text-ink/70">
              New events will be posted here. Please check back soon.
            </p>
          </div>
        ) : (
          groups.map((g) => (
            <div key={g.heading} className="mb-10 last:mb-0">
              <h2 className="font-display text-4xl text-navy sm:text-5xl">{g.heading}</h2>
              <div className="mt-4 space-y-4">
                {g.items.map((e, i) => (
                  <EventCard key={`${e.date}-${i}`} event={e} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Past events */}
      {past.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
            <details>
              <summary className="cursor-pointer font-display text-3xl text-navy sm:text-4xl">
                Past events
              </summary>
              <div className="mt-5 space-y-4">
                {past.map((e, i) => (
                  <EventCard key={`${e.date}-${i}`} event={e} past />
                ))}
              </div>
            </details>
          </div>
        </section>
      )}
    </div>
  )
}