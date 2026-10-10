import { Link, useParams } from 'react-router-dom'
import { departments, joinLink } from '../data/churchData.js'
import { GroupPhoto, LeaderPhoto } from '../components/Placeholders.jsx'

const meetingLine = (m) => [m.day, m.time, m.place].filter(Boolean).join(' · ')

function ContactButtons({ socials = {} }) {
  const items = []
  if (socials.whatsapp) items.push({ label: 'WhatsApp', href: `https://wa.me/${socials.whatsapp}` })
  if (socials.facebook) items.push({ label: 'Facebook', href: socials.facebook })
  if (socials.instagram) items.push({ label: 'Instagram', href: socials.instagram })
  if (socials.x) items.push({ label: 'X', href: socials.x })
  if (socials.email) items.push({ label: 'Email', href: `mailto:${socials.email}` })

  if (items.length === 0) {
    return <p className="text-ink/70">Contact details coming soon.</p>
  }

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-navy btn-sm"
        >
          {i.label}
        </a>
      ))}
    </div>
  )
}

export default function DepartmentDetail() {
  const { slug } = useParams()
  const dept = departments.find((d) => d.slug === slug)

  if (!dept) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-navy">Department not found</h1>
        <Link to="/departments" className="mt-4 inline-block font-semibold text-royal hover:underline">
          ← Back to all departments
        </Link>
      </section>
    )
  }

  const join = joinLink(dept)

  return (
    <article>
      <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/7]">
        <GroupPhoto src={dept.groupPhoto} alt={`${dept.name} group photo`} name={dept.name} />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <Link to="/departments" className="text-sm font-semibold text-royal hover:underline">
          ← All departments
        </Link>
        <h1 className="mt-2 font-display text-4xl font-bold text-navy sm:text-5xl">{dept.name}</h1>
        <p className="mt-3 text-ink/80">{dept.about}</p>

        <div className="mt-8 flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/5">
          <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-28">
            <LeaderPhoto src={dept.leader.photo} name={dept.leader.name} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-royal">
              {dept.leader.title}
            </p>
            <p className="font-display text-2xl font-bold text-navy sm:text-3xl">
              {dept.leader.name}
            </p>
          </div>
        </div>

        <h2 className="mt-10 font-display text-2xl font-bold text-navy">When we meet</h2>
        <ul className="mt-3 space-y-2">
          {dept.meets.map((m, i) => (
            <li key={i} className="rounded-lg bg-white px-4 py-3 ring-1 ring-navy/5">
              {meetingLine(m)}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-2xl font-bold text-navy">Contact the department</h2>
        <div className="mt-3">
          <ContactButtons socials={dept.socials} />
        </div>

        {dept.slug !== 'chaplaincy' && (
          <div className="mt-10 rounded-2xl bg-navy p-6 text-center text-white sm:p-8">
            <h2 className="font-display text-3xl font-bold">Join {dept.name}</h2>
            <p className="mt-2 text-white/80">
              Fill a short form and the church office will get in touch with you.
            </p>
            {join ? (
              <Link to={`/join?dept=${dept.slug}`} className="btn btn-gold mt-5">
                Join this department
              </Link>
            ) : (
              <p className="mt-5 inline-block rounded-full bg-white/10 px-6 py-3 text-sm font-semibold">
                Join form coming soon
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  )
}