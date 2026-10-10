import { Link } from 'react-router-dom'
import { church, mainNav, moreNav } from '../data/churchData.js'
import Logos from './Logos.jsx'
import SocialIcons from './SocialIcons.jsx'

export default function Footer() {
  const links = [...mainNav, ...moreNav]

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logos size="h-16 sm:h-20" gap="gap-4" />
          <p className="mt-3 font-display text-2xl font-bold">{church.name}</p>
          <p className="mt-1 font-semibold text-gold">{church.tagline}</p>
        </div>

        <div>
          <p className="font-semibold text-gold">Quick links</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-block py-1.5 text-sm text-white/80 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gold">Find us</p>
          <p className="mt-3 text-sm text-white/80">{church.address}</p>
          <SocialIcons className="mt-4" />
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {church.name}. Website by{' '}
        <a href={church.builder.url} target="_blank" rel="noreferrer" className="text-gold hover:underline">
          {church.builder.name}
        </a>
        .
      </div>
    </footer>
  )
}