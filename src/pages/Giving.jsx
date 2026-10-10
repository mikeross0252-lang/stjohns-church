import { useState } from 'react'
import { Link } from 'react-router-dom'
import { giving } from '../data/churchData.js'
import { Crest } from '../components/Logos.jsx'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this account number:', text)
    }
  }

  return (
    <button onClick={copy} className="btn btn-navy btn-sm">
      {copied ? 'Copied!' : 'Copy number'}
    </button>
  )
}

export default function Giving() {
  const { intro, accounts, note } = giving

  return (
    <div>
      {/* Header */}
              <section
        className="relative text-white"
        style={{
          backgroundImage:
            "url('/images/giving.jpg'), linear-gradient(135deg, #0A2557 0%, #17407F 100%)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
            <Crest className="mx-auto mb-4 h-20 sm:h-28" beat={false} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            Support the church
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">Giving</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {accounts.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-navy/10">
            <h2 className="font-display text-4xl text-navy">Giving details coming soon</h2>
            <p className="mt-2 text-ink/70">
              Our official account details will be posted here soon.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {accounts.map((a, i) => (
                <article key={i} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
                  <h2 className="font-display text-4xl leading-tight text-navy">{a.purpose}</h2>
                  <dl className="mt-3 space-y-1 text-ink/80">
                    <div>
                      <dt className="inline font-semibold text-navy">Bank: </dt>
                      <dd className="inline">{a.bank}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-navy">Account name: </dt>
                      <dd className="inline">{a.accountName}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 font-display text-5xl tracking-wider text-royal">
                    {a.accountNumber}
                  </p>
                  <div className="mt-4">
                    <CopyButton text={a.accountNumber} />
                  </div>
                </article>
              ))}
            </div>

            {note && <p className="mt-6 text-center text-ink/80">{note}</p>}

            <p className="mt-8 rounded-lg border-l-4 border-gold bg-white p-4 text-sm text-ink/80 shadow-sm">
              <span className="font-semibold text-navy">Please be careful. </span>
              Only give to the accounts listed on this page. If you are unsure about any account
              details, confirm with the church office before you send anything.
            </p>
          </>
        )}
      </section>

      {/* Questions */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:py-16">
          <h2 className="font-display text-4xl sm:text-6xl">Questions about giving?</h2>
          <p className="mt-3 text-white/80">Please contact the church office.</p>
          <Link to="/contact" className="btn btn-gold mt-7">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  )
}