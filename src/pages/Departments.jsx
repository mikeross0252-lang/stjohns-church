import { Link } from 'react-router-dom'
import { departments } from '../data/churchData.js'
import { GroupPhoto } from '../components/Placeholders.jsx'

const meetingText = (d) => {
  const m = d.meets && d.meets[0]
  if (!m || !m.day || m.day === 'To be added') return ''
  return [m.day, m.time].filter(Boolean).join(', ')
}

export default function Departments() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-widest text-royal">Our church family</p>
      <h1 className="mt-1 font-display text-4xl font-bold text-navy sm:text-5xl">
        Departments and Groups
      </h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        Tap a department to meet its leader, see when it meets, and join.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <Link
            key={d.slug}
            to={`/departments/${d.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <GroupPhoto src={d.groupPhoto} alt={`${d.name} group photo`} name={d.name} />
            </div>
            <div className="p-5">
              <h2 className="font-display text-2xl font-bold text-navy">{d.name}</h2>
              <p className="mt-1 text-sm text-ink/70">Leader: {d.leader.name}</p>
              {meetingText(d) && <p className="text-sm text-ink/70">Meets: {meetingText(d)}</p>}
              <p className="mt-3 text-sm font-semibold text-royal group-hover:underline">
                View department →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}