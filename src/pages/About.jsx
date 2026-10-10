import { Link } from "react-router-dom";
import { church, about, vicars } from "../data/churchData.js";
import { LeaderPhoto } from "../components/Placeholders.jsx";
import { Crest } from "../components/Logos.jsx";

const years = (v) => [v.from, v.to].filter(Boolean).join(" – ");
const isCurrent = (v) => !v.to || v.to === "Present";

export default function About() {
  const realVicars = vicars.filter((v) => v.name && v.name !== "To be added");

  return (
    <div>
      {/* Header: shows /images/about.jpg when it exists, a blue gradient until then */}
      <section
        className="relative text-white"
        style={{
          backgroundImage:
            "url('/images/about.jpg'), linear-gradient(135deg, #0A2557 0%, #17407F 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <div className="flex justify-center">
            <Crest className="h-24 sm:h-32" beat={false} />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
            About us
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">
            {church.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            We worship at {church.address}. &ldquo;{church.tagline}&rdquo;
          </p>
        </div>
      </section>

      {/* Our story */}
      {about.history.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <h2 className="font-display text-4xl text-navy sm:text-5xl">
            Our story
          </h2>
          <div className="mt-4 space-y-4 text-lg text-ink/80">
            {about.history.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* Vision and mission */}
      {(about.vision || about.mission) && (
        <section className="mx-auto max-w-6xl px-4 pb-10 sm:pb-14">
          <div className="grid gap-4 md:grid-cols-2">
            {about.vision && (
              <div className="rounded-xl bg-navy p-6 text-white sm:p-8">
                <h2 className="font-display text-4xl text-gold">Our vision</h2>
                <p className="mt-3 text-white/85">{about.vision}</p>
              </div>
            )}
            {about.mission && (
              <div className="rounded-xl bg-navy p-6 text-white sm:p-8">
                <h2 className="font-display text-4xl text-gold">Our mission</h2>
                <p className="mt-3 text-white/85">{about.mission}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* What we believe */}
      {about.beliefs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-10 sm:pb-14">
          <h2 className="font-display text-4xl text-navy sm:text-5xl">
            What we believe
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {about.beliefs.map((b, i) => (
              <li
                key={i}
                className="rounded-lg border-l-4 border-gold bg-white p-4 shadow-sm"
              >
                {b}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Vicars through the years */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <h2 className="font-display text-4xl text-navy sm:text-5xl">
            Our vicars through the years
          </h2>
          {realVicars.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {realVicars.map((v, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-lg bg-mist p-4 ring-1 ring-navy/10"
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md">
                    <LeaderPhoto src={v.photo} name={v.name} />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`mb-1 inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                        isCurrent(v)
                          ? "bg-navy text-white"
                          : "bg-white text-navy ring-1 ring-navy/30"
                      }`}
                    >
                      {isCurrent(v) ? "Current" : "Past"}
                    </span>
                    <p className="font-display text-3xl leading-none text-royal">
                      {years(v)}
                    </p>
                    <p className="mt-1 font-semibold text-navy">{v.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-ink/70">
              The list of our past vicars will be added here soon.
            </p>
          )}
        </div>
      </section>

            {/* Closing */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:py-16">
          <h2 className="font-display text-4xl sm:text-6xl">
            We would love to meet you
          </h2>
          <p className="mt-3 text-white/80">
            Visit us this Sunday, and tell us you are coming so we can welcome
            you properly.
          </p>
          <Link to="/new-here" className="btn btn-gold mt-7">
            I am visiting
          </Link>
        </div>
      </section>
    </div>
  );
}
      