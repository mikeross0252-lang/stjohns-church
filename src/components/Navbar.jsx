import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { church, mainNav, moreNav } from '../data/churchData.js'
import Logos from './Logos.jsx'


export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const close = () => {
    setOpen(false)
    setMoreOpen(false)
  }

  const desktopLink = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition hover:text-gold ${
      isActive ? 'text-gold' : 'text-white'
    }`

  const panelLink = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-base font-semibold transition ${
      isActive ? 'bg-white/10 text-gold' : 'text-white hover:bg-white/5'
    }`

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" onClick={close} className="flex items-center gap-3 text-gold">
          <Logos size="h-8 sm:h-11" gap="gap-2 sm:gap-3" />
          <span className="hidden leading-tight lg:block">
            <span className="block font-display text-2xl font-bold text-white">{church.shortName}</span>
            <span className="block text-[11px] uppercase tracking-wider text-white/70">
              Military Protestant Church
            </span>
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={desktopLink}>
              {l.label}
            </NavLink>
          ))}

          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              className="rounded-md px-3 py-2 text-sm font-semibold text-white transition hover:text-gold"
            >
              More ▾
            </button>
            {moreOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-lg bg-navy p-2 shadow-xl ring-1 ring-white/10">
                {moreNav.map((l) => (
                  <NavLink key={l.to} to={l.to} onClick={close} className={panelLink}>
                    {l.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/new-here"
            className="btn btn-gold btn-sm ml-2"
          >
            New here?
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl text-white lg:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 px-4 pb-6 pt-3 lg:hidden">
          {[...mainNav, ...moreNav].map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={close} className={panelLink}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/new-here"
            onClick={close}
           className="btn btn-gold mt-4"
          >
            New here? You are welcome!
          </Link>
        </div>
      )}
    </header>
  )
}