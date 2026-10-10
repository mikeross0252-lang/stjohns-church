import { Link } from "react-router-dom";
import {
  church,
  services,
  events,
  welcome,
  departments,
} from "../data/churchData.js";
import { Crest } from "../components/Logos.jsx";

const query = encodeURIComponent(
  church.coordinates || church.address + ", Nigeria",
);
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
const mapSrc =
  church.mapEmbedUrl || `https://www.google.com/maps?q=${query}&output=embed`;

const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Home() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <div>
      {/* Hero: shows /images/hero.jpeg when it exists, a blue gradient until then */}
      <section
        className="relative text-white"
        style={{
          backgroundImage:
            "url('/images/hero.jpeg'), linear-gradient(135deg, #0A2557 0%, #17407F 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-14 text-center sm:py-24">
          <Crest />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            {church.location}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">
            {church.name}
          </h1>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            &ldquo;{church.tagline}&rdquo;
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/new-here" className="btn btn-gold">
              New here?
            </Link>
            <Link to="/talks" className="btn btn-outline-light">
              Watch &amp; Listen
            </Link>
          </div>
        </div>
      </section>

      {/* Service times and location in one card */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy/10 md:grid md:grid-cols-2">
          <div className="p-6 sm:p-8">
            <h2 className="font-display text-3xl text-navy sm:text-4xl">
              Service times
            </h2>
            {services.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {services.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between gap-4 border-b border-navy/10 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-right text-ink/80">
                      {s.day}, {s.time}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-ink/70">
                Service times will be posted here soon.
              </p>
            )}
          </div>

          <div className="flex flex-col border-t border-navy/10 p-6 sm:p-8 md:border-l md:border-t-0">
            <h2 className="font-display text-3xl text-navy sm:text-4xl">
              Find us
            </h2>
            <p className="mt-3 text-ink/80">{church.address}</p>
            <iframe
              title={`Map showing ${church.name}`}
              src={mapSrc}
              className="mt-4 h-56 w-full flex-1 rounded-lg border-0 md:min-h-[16rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-navy mt-5 self-start"
            >
              Get directions
            </a>
          </div>
        </div>
      </section>

      {/* Welcome (dark) */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:py-16">
          <h2 className="font-display text-4xl sm:text-6xl">{welcome.title}</h2>
          <p className="mt-4 text-lg text-white/80">{welcome.text}</p>
          <Link to="/new-here" className="btn btn-gold mt-7">
            Tell us you are visiting
          </Link>
        </div>
      </section>

      {/* Upcoming events (hidden until events are added) */}
      {upcoming.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-4xl text-navy sm:text-5xl">
                Upcoming events
              </h2>
              <Link
                to="/events"
                className="text-sm font-semibold text-royal hover:underline"
              >
                See all
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {upcoming.map((e, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-mist p-5 ring-1 ring-navy/10"
                >
                  <p className="text-sm font-semibold text-royal">
                    {formatDate(e.date)}
                  </p>
                  <h3 className="mt-1 font-display text-3xl text-navy">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/70">
                    {[e.time, e.place].filter(Boolean).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Find your place */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <h2 className="font-display text-4xl text-navy sm:text-5xl">
          Find your place
        </h2>
        <p className="mt-2 max-w-2xl text-ink/80">
          Meet the leaders of our departments and groups, see when they meet,
          and join one.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {departments.map((d) => (
            <Link
              key={d.slug}
              to={`/departments/${d.slug}`}
              className="flex min-h-16 items-center justify-center rounded-lg bg-navy px-3 py-3 text-center font-display text-2xl text-white ring-1 ring-navy transition hover:bg-white hover:text-navy"
            >
              {d.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Prayer (dark) */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:py-16">
          <h2 className="font-display text-4xl sm:text-6xl">Need prayer?</h2>
          <p className="mt-3 text-white/80">
            Send us your prayer request and our prayer team will stand with you.
          </p>
          <Link to="/prayer" className="btn btn-gold mt-7">
            Send a prayer request
          </Link>
        </div>
      </section>
    </div>
  );
}
