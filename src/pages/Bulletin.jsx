import { bulletins } from '../data/churchData.js'
import { Crest } from '../components/Logos.jsx'

const formatDate = (iso) =>
  iso
    ? new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

const absolute = (u) => (u.startsWith('http') ? u : `${window.location.origin}${u}`)

const whatsappLink = (b) =>
  `https://wa.me/?text=${encodeURIComponent(`${b.title}\n${absolute(b.url)}`)}`

export default function Bulletin() {
  const sorted = [...bulletins].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  const latest = sorted[0]
  const older = sorted.slice(1)

  return (
    <div>
      {/* Header: shows /images/bulletin.jpg when it exists, a blue gradient until then */}
      <section
        className="relative text-white"
        style={{
          backgroundImage:
            "url('/images/bulletin.jpg'), linear-gradient(135deg, #0A2557 0%, #17407F 100%)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <Crest className="mx-auto mb-4 h-16 sm:h-20" beat={false} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            Stay informed
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">Bulletin</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Read the church bulletin on your phone, and share it with family and friends.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {!latest ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-navy/10">
            <h2 className="font-display text-4xl text-navy">Bulletin coming soon</h2>
            <p className="mt-2 text-ink/70">
              The church bulletin will be posted here each week.
            </p>
          </div>
        ) : (
          <>
            {/* Latest */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
                Latest bulletin
              </p>
              <h2 className="mt-2 font-display text-4xl leading-tight text-navy sm:text-5xl">
                {latest.title}
              </h2>
              {latest.date && <p className="mt-1 text-ink/70">{formatDate(latest.date)}</p>}
              {latest.note && <p className="mt-3 text-ink/80">{latest.note}</p>}

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={latest.url} target="_blank" rel="noreferrer" className="btn btn-navy">
                  Open bulletin
                </a>
                <a
                  href={whatsappLink(latest)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-navy"
                >
                  Share on WhatsApp
                </a>
              </div>
            </div>

            {/* Older */}
            {older.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-3xl text-navy sm:text-4xl">Previous bulletins</h2>
                <ul className="mt-4 divide-y divide-navy/10 rounded-xl bg-white shadow-sm ring-1 ring-navy/10">
                  {older.map((b, i) => (
                    <li key={i}>
                      <a
                        href={b.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-mist"
                      >
                        <span>
                          <span className="block font-semibold text-navy">{b.title}</span>
                          {b.date && (
                            <span className="block text-sm text-ink/70">{formatDate(b.date)}</span>
                          )}
                        </span>
                        <span className="shrink-0 text-sm font-semibold text-royal">Open →</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}