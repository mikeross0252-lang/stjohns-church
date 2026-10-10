import { Crest } from '../components/Logos.jsx'

export default function FormPage({ eyebrow, title, intro, url, note, image }) {
  const ready = url && !url.startsWith('PASTE')
  const embed = ready ? `${url}${url.includes('?') ? '&' : '?'}embedded=true` : ''

  const bg = image
    ? `url('${image}'), linear-gradient(135deg, #0A2557 0%, #17407F 100%)`
    : 'linear-gradient(135deg, #0A2557 0%, #17407F 100%)'

  return (
    <div>
      {/* Header: shows the picture when it exists, a blue gradient until then */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: bg,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <Crest className="mx-auto mb-4 h-16 sm:h-20" beat={false} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {ready ? (
          <>
            {note && (
              <p className="mb-5 rounded-lg border-l-4 border-gold bg-white p-4 text-sm text-ink/80 shadow-sm">
                {note}
              </p>
            )}

            {/* Phones: open the form in its own tab, which is easier to fill in */}
            <div className="text-center sm:hidden">
              <a href={url} target="_blank" rel="noreferrer" className="btn btn-navy">
                Open the form
              </a>
            </div>

            {/* Tablets and laptops: the form sits inside the page */}
            <div className="hidden sm:block">
              <iframe
                title={title}
                src={embed}
                className="h-[950px] w-full rounded-xl border-0 bg-white shadow-sm ring-1 ring-navy/10"
                loading="lazy"
              >
                Loading…
              </iframe>
              <p className="mt-4 text-center text-sm text-ink/70">
                Form not loading?{' '}
                <a href={url} target="_blank" rel="noreferrer" className="font-semibold text-royal underline">
                  Open it in a new tab
                </a>
                .
              </p>
            </div>
          </>
        ) : (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-navy/10">
            <h2 className="font-display text-4xl text-navy">Form coming soon</h2>
            <p className="mt-2 text-ink/70">This form will be ready very soon. Please check back.</p>
          </div>
        )}
      </section>
    </div>
  )
}