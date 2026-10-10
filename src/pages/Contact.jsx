import { Link } from 'react-router-dom'
import { church, social } from '../data/churchData.js'
import { Crest } from '../components/Logos.jsx'
import SocialIcons from '../components/SocialIcons.jsx'

// Placeholders that start with ADD are treated as "not set yet"
const isSet = (v) => v && !v.startsWith('ADD')

const query = encodeURIComponent(church.coordinates || church.address + ', Nigeria')
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`
const mapSrc = church.mapEmbedUrl || `https://www.google.com/maps?q=${query}&output=embed`

export default function Contact() {
  const email = isSet(church.email) ? church.email : social.email
  const phone = isSet(church.phone) ? church.phone : ''

  return (
    <div>
      {/* Header */}
      <section
        className="relative text-white"
        style={{
          backgroundImage:
            "url('/images/contact.jpg'), linear-gradient(135deg, #0A2557 0%, #17407F 100%)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <Crest className="mx-auto mb-4 h-20 sm:h-28" beat={false} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            Get in touch
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            We would love to hear from you. Visit us, call, or message us.
          </p>
        </div>
      </section>

      {/* Details and map */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy/10 lg:grid lg:grid-cols-2">
          <div className="p-6 sm:p-8">
            <h2 className="font-display text-3xl text-navy sm:text-4xl">Visit us</h2>
            <p className="mt-3 font-semibold">{church.name}</p>
            <p className="text-ink/80">{church.address}</p>
            <a href={mapsLink} target="_blank" rel="noreferrer" className="btn btn-navy mt-5">
              Get directions
            </a>

            {(phone || email) && (
              <div className="mt-8 space-y-2 border-t border-navy/10 pt-6">
                {phone && (
                  <p>
                    <span className="font-semibold text-navy">Phone: </span>
                    <a href={`tel:${phone}`} className="text-royal hover:underline">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="break-words">
                    <span className="font-semibold text-navy">Email: </span>
                    <a href={`mailto:${email}`} className="text-royal hover:underline">
                      {email}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          <iframe
            title={`Map showing ${church.name}`}
            src={mapSrc}
            className="h-72 w-full border-0 sm:h-96 lg:h-full lg:min-h-[24rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* Social accounts */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:py-14">
          <h2 className="font-display text-4xl text-navy sm:text-5xl">Follow us</h2>
          <SocialIcons tone="light" className="mt-6 justify-center" />
        </div>
      </section>

      {/* Closing */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:py-16">
          <h2 className="font-display text-4xl sm:text-6xl">How can we help?</h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/new-here" className="btn btn-gold">
              I am visiting
            </Link>
            <Link to="/prayer" className="btn btn-outline-light">
              Prayer request
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}