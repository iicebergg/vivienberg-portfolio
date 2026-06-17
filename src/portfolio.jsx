import React, { useState, useEffect, useRef } from "react";

const PROFILE = {
  name: "Vivien Berg",
  role: "Student developer · Northern Virginia",
  intro:
    "Hello! My name is Vivien Berg, and I am a rising senior in high school passionate about web development, AI, machine learning, and research.",
  email: "vivien@learnsolace.org",
  photo: "/vivien.jpeg",
};

const PROJECTS = [
  {
    title: "SOLace",
    blurb:
      "A free practice platform for Virginia Standards of Learning tests, built for K–12 students. Tracks anonymous data for ongoing research at George Mason University. Featured on ABC7 and the Fairfax County Times.",
    stat: "9,500+",
    statLabel: "practices completed",
    tags: ["JavaScript", "PostgreSQL"],
    href: "https://learnsolace.org",
    featured: true,
  }
];

const LINKS = [
  { label: "GitHub", href: "https://github.com/iicebergg", note: "Code and repositories" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vivien-berg/", note: "Background and contact" },
  { label: "ORCID", href: "https://orcid.org/0009-0008-5085-8458", note: "Academic profile" },
];

const SunIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
    <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 2.6v2.4M12 19v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M2.6 12h2.4M19 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7" />
    </g>
  </svg>
);

const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" {...props}>
    <path
      d="M20 14.2A8 8 0 0 1 9.8 4 8 8 0 1 0 20 14.2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", as: Tag = "div" }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState("light");

  // Start from the visitor's system preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  const initials = PROFILE.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="root" data-theme={theme}>
      <style>{CSS}</style>

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="nav" aria-label="Primary">
          <a href="#top" className="brand">
            {PROFILE.name}
          </a>
          <div className="nav-right">
            <ul className="nav-links">
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#links">Links</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-pressed={theme === "dark"}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top" aria-labelledby="hero-name">
          <div className="hero-text">
            <p className="eyebrow">Portfolio</p>
            <h1 id="hero-name" className="hero-name">
              Vivien Berg
            </h1>
            <p className="hero-intro">{PROFILE.intro}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">
                See my work
              </a>
              <a className="btn btn-ghost" href={`mailto:${PROFILE.email}`}>
                Get in touch
              </a>
            </div>
          </div>

          <div className="hero-photo">
            {PROFILE.photo ? (
              <img src={PROFILE.photo} alt={`Portrait of ${PROFILE.name}`} />
            ) : (
              <div className="photo-placeholder" role="img" aria-label={`Photo of ${PROFILE.name} goes here`}>
                <span aria-hidden="true">{initials}</span>
                <span className="photo-hint">Add your photo</span>
              </div>
            )}
            <div className="photo-info">
              <a href={`mailto:${PROFILE.email}`} className="photo-email">{PROFILE.email}</a>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section className="section" id="work" aria-labelledby="work-heading">
          <Reveal as="header" className="section-head">
            <span className="section-index">01</span>
            <h2 id="work-heading">Selected work</h2>
            <p className="section-sub">Projects I have designed, built, and deployed.</p>
          </Reveal>

          <ul className="work-grid" role="list">
            {PROJECTS.map((p) => (
              <Reveal as="li" key={p.title} className={`card ${p.featured ? "card-featured" : ""}`}>
                <article>
                  <div className="card-top">
                    <h3 className="card-title">{p.title}</h3>
                    {p.featured && <span className="badge">Flagship</span>}
                  </div>
                  <p className="card-blurb">{p.blurb}</p>

                  {p.stat && (
                    <p className="card-stat">
                      <span className="stat-num">{p.stat}</span>
                      <span className="stat-label">{p.statLabel}</span>
                    </p>
                  )}

                  <ul className="tags" role="list">
                    {p.tags.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <a className="card-link" href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    Visit {p.title}
                    <span aria-hidden="true" className="arrow">
                      →
                    </span>
                  </a>
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* LINKS */}
        <section className="section" id="links" aria-labelledby="links-heading">
          <Reveal as="header" className="section-head">
            <span className="section-index">02</span>
            <h2 id="links-heading">Find me elsewhere</h2>
            <p className="section-sub">Other places to find my work.</p>
          </Reveal>

          <ul className="links-list" role="list">
            {LINKS.map((l) => (
              <Reveal as="li" key={l.label} className="link-row">
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  <span className="link-label">{l.label}</span>
                  <span className="link-note">{l.note}</span>
                  <span aria-hidden="true" className="arrow">
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>
      </main>

      {/* CONTACT / FOOTER */}
      <footer className="site-footer" id="contact" aria-labelledby="contact-heading">
        <div className="footer-inner">
          <h2 id="contact-heading" className="footer-heading">
            Let's <span className="mark">connect</span>!
          </h2>
          <p className="footer-sub">
            I'm open to collaborations, research, and inquiries.
          </p>
          <a className="footer-email" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          <p className="footer-meta">
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Hanken+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

html, body { margin: 0; padding: 0; }

.root {
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body: 'Hanken Grotesk', system-ui, sans-serif;
  --font-mono: 'Space Mono', ui-monospace, monospace;
  --maxw: 1080px;
  --radius: 16px;
  font-family: var(--font-body);
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  transition: background-color 0.35s ease, color 0.35s ease;
  -webkit-font-smoothing: antialiased;
}

.root[data-theme="light"] {
  --bg: #FCFBF8;
  --surface: #FFFFFF;
  --ink: #1A1A17;
  --muted: #5F5E55;
  --border: #E9E6DD;
  --gold: #F2B705;
  --gold-deep: #B8830A;
  --gold-soft: rgba(242,183,5,0.22);
  --shadow: 0 1px 2px rgba(26,26,23,0.04), 0 12px 30px rgba(26,26,23,0.06);
}

.root[data-theme="dark"] {
  --bg: #141310;
  --surface: #1C1B15;
  --ink: #F4F1E8;
  --muted: #A6A398;
  --border: #2C2B22;
  --gold: #F5C13A;
  --gold-deep: #F5C13A;
  --gold-soft: rgba(245,193,58,0.16);
  --shadow: 0 1px 2px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.45);
}

.root * { box-sizing: border-box; }

/* Focus visibility for keyboard users */
.root a:focus-visible,
.root button:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 3px;
  border-radius: 6px;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--gold);
  color: #1A1A17;
  padding: 10px 16px;
  font-weight: 700;
  z-index: 100;
  border-radius: 0 0 10px 0;
}
.skip-link:focus { left: 0; }

/* Highlighter mark — the signature accent */
.mark {
  position: relative;
  white-space: nowrap;
}
.mark::after {
  content: "";
  position: absolute;
  left: -0.08em;
  right: -0.08em;
  bottom: 0.08em;
  height: 0.42em;
  background: var(--gold-soft);
  z-index: -1;
  transform: skewX(-4deg);
  transform-origin: left;
  animation: swipe 0.7s 0.2s cubic-bezier(0.2,0.8,0.2,1) both;
}
@keyframes swipe {
  from { transform: skewX(-4deg) scaleX(0); }
  to   { transform: skewX(-4deg) scaleX(1); }
}

/* Header / nav */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  border-bottom: 1px solid var(--border);
}
.nav {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.brand {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  color: var(--ink);
  text-decoration: none;
}
.nav-right { display: flex; align-items: center; gap: 20px; }
.nav-links {
  display: flex;
  gap: 22px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  padding-bottom: 3px;
}
.nav-links a::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 3px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}
.nav-links a:hover { color: var(--ink); }
.nav-links a:hover::after { transform: scaleX(1); }

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  color: var(--ink);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 14px 7px 11px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.1s ease;
}
.theme-toggle:hover { border-color: var(--gold); }
.theme-toggle:active { transform: scale(0.97); }

/* Hero */
.hero {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 84px 24px 64px;
  display: grid;
  grid-template-columns: 1.4fr 0.85fr;
  gap: 56px;
  align-items: center;
}
.eyebrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  color: var(--gold-deep);
  margin: 0 0 18px;
}
.hero-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.1rem, 5.2vw, 3.7rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 22px;
}
.hero-intro {
  font-size: 1.12rem;
  line-height: 1.6;
  color: var(--muted);
  max-width: 46ch;
  margin: 0 0 32px;
}
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }

.btn {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.98rem;
  padding: 13px 22px;
  border-radius: 999px;
  text-decoration: none;
  transition: transform 0.12s ease, background-color 0.2s ease, border-color 0.2s ease;
}
.btn-primary {
  background: var(--gold);
  color: #1A1A17;
  border: 1px solid var(--gold);
}
.btn-primary:hover { background: var(--gold-deep); border-color: var(--gold-deep); transform: translateY(-2px); }
.root[data-theme="dark"] .btn-primary:hover { color: #141310; }
.btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--border);
}
.btn-ghost:hover { border-color: var(--gold); transform: translateY(-2px); }

.hero-photo { justify-self: end; width: 100%; max-width: 320px; }
.hero-photo img,
.photo-placeholder {
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius);
  object-fit: cover;
  border: 1px solid var(--border);
}
.photo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background:
    radial-gradient(120% 100% at 50% 0%, var(--gold-soft), transparent 60%),
    var(--surface);
  box-shadow: var(--shadow);
}
.photo-placeholder span:first-child {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--gold-deep);
}
.photo-hint {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.photo-info {
  margin-top: 14px;
  text-align: center;
}
.photo-email {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 2px solid var(--gold-soft);
  padding-bottom: 2px;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.photo-email:hover {
  border-bottom-color: var(--gold);
  color: var(--gold-deep);
}

/* Sections */
.section {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 64px 24px;
}
.section-head { margin-bottom: 40px; }
.section-index {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--gold-deep);
  letter-spacing: 0.1em;
}
.section-head h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.7rem, 3.6vw, 2.5rem);
  letter-spacing: -0.02em;
  margin: 6px 0 8px;
}
.section-sub { color: var(--muted); font-size: 1.02rem; margin: 0; }

/* Work grid */
.work-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}
.card:hover { transform: translateY(-4px); border-color: var(--gold); box-shadow: var(--shadow); }
.card article { display: flex; flex-direction: column; height: 100%; }
.card-featured {
  grid-column: 1 / -1;
  background:
    linear-gradient(135deg, var(--gold-soft), transparent 55%),
    var(--surface);
}
.card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.card-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  margin: 0;
}
.badge {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 9px;
  border-radius: 999px;
  background: var(--gold);
  color: #1A1A17;
  font-weight: 700;
}
.card-blurb { color: var(--muted); line-height: 1.6; margin: 0 0 18px; max-width: 60ch; }
.card-stat { display: flex; align-items: baseline; gap: 10px; margin: 0 0 18px; }
.stat-num {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.9rem;
  color: var(--ink);
}
.stat-label {
  font-size: 0.88rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.tags { list-style: none; margin: 0 0 22px; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  padding: 5px 10px;
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--muted);
}
.card-link {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
  width: fit-content;
}
.card-link .arrow, .arrow { transition: transform 0.2s ease; }
.card-link:hover .arrow { transform: translateX(4px); }
.card-link { border-bottom: 2px solid var(--gold-soft); padding-bottom: 2px; }
.card-link:hover { border-bottom-color: var(--gold); }

/* Links list */
.links-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--border); }
.link-row a {
  display: grid;
  grid-template-columns: 200px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 22px 4px;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  color: var(--ink);
  transition: padding-left 0.2s ease, background-color 0.2s ease;
}
.link-row a:hover { padding-left: 14px; }
.link-label { font-family: var(--font-display); font-weight: 700; font-size: 1.25rem; }
.link-note { color: var(--muted); font-size: 0.96rem; }
.link-row a:hover .arrow { transform: translate(3px,-3px); }

/* Footer */
.site-footer {
  border-top: 1px solid var(--border);
  background: var(--surface);
  margin-top: 40px;
}
.footer-inner { max-width: var(--maxw); margin: 0 auto; padding: 80px 24px; text-align: center; }
.footer-heading {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.2rem);
  letter-spacing: -0.02em;
  margin: 0 0 14px;
}
.footer-sub { color: var(--muted); font-size: 1.05rem; margin: 0 0 28px; }
.footer-email {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  color: var(--ink);
  text-decoration: none;
  border-bottom: 3px solid var(--gold);
  padding-bottom: 4px;
  transition: color 0.2s ease;
}
.footer-email:hover { color: var(--gold-deep); }
.footer-meta { margin: 42px 0 0; color: var(--muted); font-size: 0.85rem; font-family: var(--font-mono); }

/* Reveal animation */
.reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.is-visible { opacity: 1; transform: none; }

/* Responsive */
@media (max-width: 860px) {
  .hero { grid-template-columns: 1fr; padding-top: 56px; gap: 36px; }
  .hero-photo { justify-self: start; max-width: 240px; }
  .work-grid { grid-template-columns: 1fr; }
  .card-featured { grid-column: auto; }
  .nav-links { display: none; }
  .link-row a { grid-template-columns: 1fr auto; }
  .link-note { display: none; }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .root *, .root *::before, .root *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  .reveal { opacity: 1; transform: none; }
  .mark::after { transform: skewX(-4deg) scaleX(1); }
}
`;
