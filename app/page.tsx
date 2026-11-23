"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LiveFigure from "./components/three/LiveFigure";
import AgentConsole from "./components/AgentConsole";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const profile = {
  email: "lone@students.uni-marburg.de",
  linkedin: "https://www.linkedin.com/in/faizan-hamid-50b113215/",
  github: "https://github.com/saffronhamid",
  cv: "/Faizan_CV.pdf",
};

const nav = [
  { id: "deutsche-boerse", label: "Deutsche Börse" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

const experiences = [
  {
    company: "Deutsche Börse",
    role: "Intern — BAT, Test Automation & AI",
    date: "Aug 2026 — Present",
    location: "Frankfurt, Germany",
    current: true,
    bullets: [
      "Built a data converter for OKF supporting both structured and unstructured data formats.",
      "Led an AI agent project using hybrid retrieval, improving correctness by 40% while cutting token usage by 60%.",
      "Built an agent that transforms Gherkin test scenarios into automated test code, streamlining BAT workflows.",
    ],
  },
  {
    company: "Solid Works",
    role: "Machine Learning Engineer",
    date: "Sep 2023 — Mar 2024",
    location: "Srinagar, India",
    bullets: [
      "Engineered preprocessing pipelines to handle missing data and confounding variables.",
      "Built Python pipelines to clean, validate and optimise operational datasets.",
      "Developed MLflow-based MLOps workflows for continuous learning and adaptation.",
    ],
  },
  {
    company: "National Institute of Technology",
    role: "Research Assistant",
    date: "Mar 2023 — Jul 2023",
    location: "Srinagar, India",
    bullets: [
      "Built a real-time autonomous navigation system using a TensorFlow CNN.",
      "Improved reliability through drift analysis and hyperparameter tuning.",
    ],
  },
  {
    company: "Solid Works",
    role: "React Intern",
    date: "Jul 2021 — Jan 2022",
    location: "Srinagar, India",
    bullets: [
      "Built responsive React apps with React Router and Redux.",
      "Developed Node/Express APIs with MongoDB for CRUD and auth.",
    ],
  },
];

const skills = [
  { title: "Generative AI", items: ["LangChain", "LangGraph", "FAISS", "Hybrid retrieval", "OpenAI", "Pydantic"] },
  { title: "Machine Learning", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Keras", "XGBoost", "OpenCV", "Pandas", "NumPy"] },
  { title: "MLOps", items: ["MLflow", "Docker", "GitHub Actions", "AWS S3", "DagsHub", "Git"] },
  { title: "Backend", items: ["Python", "FastAPI", "Node.js", "Express", "PostgreSQL", "MongoDB", "MySQL"] },
  { title: "Frontend", items: ["TypeScript", "React", "Next.js", "Redux", "Three.js"] },
];

const education = [
  { school: "Philipps-Universität Marburg", degree: "M.Sc. Data Science", date: "2024 — 2026", location: "Marburg, Germany" },
  { school: "University of Jammu", degree: "B.E. Computer Engineering", date: "2019 — 2023", location: "Jammu, India" },
];

const certifications = [
  { title: "Ultimate RAG Bootcamp — LangChain, LangGraph & LangSmith", issuer: "Udemy · Krish Naik", date: "2026", href: "/certificates/ultimate-rag-bootcamp.pdf" },
  { title: "MLOps Specialization", issuer: "DeepLearning.AI", date: "2024" },
  { title: "Deep Learning Specialization", issuer: "Coursera · Andrew Ng", date: "2023" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2023" },
  { title: "Top 10% — Computer Engineering", issuer: "University of Jammu", date: "2023" },
];

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 8 14" width="7" height="12" aria-hidden>
      <path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cta({ href, children, variant = "fill" }: { href: string; children: ReactNode; variant?: "fill" | "outline" }) {
  const external = href.startsWith("http") || href.endsWith(".pdf") || href.startsWith("mailto:");
  const cls = `cta cta-${variant}`;
  if (external) {
    return (
      <a className={cls} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) return <a className={cls} href={href}>{children}</a>;
  return <Link className={cls} href={href}>{children}</Link>;
}

function Tile({
  id,
  tone = "light",
  eyebrow,
  title,
  subtitle,
  ctas,
  children,
  className = "",
}: {
  id?: string;
  tone?: "light" | "grey" | "dark";
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  ctas?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`tile tile-${tone} ${className}`}>
      <Reveal className="tile-copy">
        {eyebrow && <p className="tile-eyebrow">{eyebrow}</p>}
        <h2 className="tile-title">{title}</h2>
        <p className="tile-sub">{subtitle}</p>
        {ctas && <div className="tile-ctas">{ctas}</div>}
      </Reveal>
      {children}
    </section>
  );
}

function Carousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };

  useEffect(update, []);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <div className="carousel-track" ref={track} onScroll={update}>
        {children}
      </div>
      <div className="carousel-controls">
        <button type="button" aria-label="Previous" onClick={() => page(-1)} disabled={edge.start}>
          <svg viewBox="0 0 8 14" width="8" height="14" aria-hidden><path d="M7 1 1 7l6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" aria-label="Next" onClick={() => page(1)} disabled={edge.end}>
          <svg viewBox="0 0 8 14" width="8" height="14" aria-hidden><path d="m1 1 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ---------- Global nav ---------- */}
      <header className="gnav" data-open={menuOpen}>
        <div className="gnav-inner">
          <a href="#top" className="gnav-mark">
            Faizan Hamid
          </a>
          <nav className="gnav-links" aria-label="Sections">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={profile.cv} className="gnav-cv" target="_blank" rel="noopener noreferrer">
            CV
          </a>
          <button type="button" className="gnav-burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="top">
        {/* ---------- Ribbon ---------- */}
        <div className="ribbon">
          <p>
            Now at Deutsche Börse — building AI agents for test automation.{" "}
            <a href="#deutsche-boerse">
              Learn more <Chevron />
            </a>
          </p>
        </div>

        {/* ---------- Hero ---------- */}
        <Tile
          tone="light"
          className="tile-hero"
          eyebrow={<span className="hero-name">Faizan Hamid</span>}
          title={<>AI Engineer.<br />Built for production.</>}
          subtitle="AI agents, RAG systems and MLOps — from the first notebook to the service people rely on."
          ctas={
            <>
              <Cta href="#work">See the work</Cta>
              <Cta href={profile.cv} variant="outline">Download CV</Cta>
            </>
          }
        >
          <LiveFigure shape={1} className="tile-figure tile-figure-hero" label="Agent pipeline: work packets flowing around a loop of six stations, with the active station highlighted" />
        </Tile>

        {/* ---------- Deutsche Börse ---------- */}
        <Tile
          id="deutsche-boerse"
          tone="dark"
          eyebrow="Deutsche Börse · Frankfurt"
          title="Agents that write the tests."
          subtitle="Intern on the BAT, Test Automation & AI team since August 2026."
          ctas={<Cta href="#experience">View experience</Cta>}
        >
          <Reveal className="console-wrap">
            <AgentConsole />
          </Reveal>
          <Reveal className="stats">
            <div>
              <span className="stat-num">40%</span>
              <span className="stat-label">higher correctness from a hybrid-retrieval agent</span>
            </div>
            <div>
              <span className="stat-num">60%</span>
              <span className="stat-label">lower token usage on the same agent</span>
            </div>
            <div>
              <span className="stat-num stat-num-text">Gherkin → code</span>
              <span className="stat-label">an agent that turns test scenarios into automated tests</span>
            </div>
          </Reveal>
        </Tile>

        {/* ---------- Work ---------- */}
        <div id="work" className="grid">
          <Tile
            tone="grey"
            className="tile-half"
            eyebrow="Retrieval"
            title="Modular RAG Pipeline."
            subtitle="PDFs, text and the web — orchestrated as LangGraph nodes over FAISS."
            ctas={<Cta href="https://github.com/saffronhamid/code.git">View source</Cta>}
          >
            <LiveFigure shape={2} className="tile-figure tile-figure-half" label="Rotating embedding space with seven clusters" />
          </Tile>
          <Tile
            tone="dark"
            className="tile-half"
            eyebrow="Master's research"
            title="Bat Tracking."
            subtitle="Every YOLO release, benchmarked for nocturnal wildlife."
            ctas={<Cta href="/bat-tracking">Read case study</Cta>}
          >
            <LiveFigure shape={3} dark className="tile-figure tile-figure-half" label="Flight trajectories streaming through space" />
          </Tile>
          <Tile
            tone="dark"
            className="tile-half"
            eyebrow="MLOps"
            title="Phishing URL Detection."
            subtitle="ETL to inference: MLflow, DagsHub and a Dockerised FastAPI service on AWS."
            ctas={<Cta href="https://github.com/saffronhamid/networksecurity.git">View source</Cta>}
          >
            <LiveFigure shape={4} dark className="tile-figure tile-figure-half" label="Three-dimensional confusion matrix" />
          </Tile>
          <Tile
            tone="grey"
            className="tile-half"
            eyebrow="Low-code seminar"
            title="Student Project Manager."
            subtitle="Auth, dashboards and reporting for coordinating student research."
            ctas={<Cta href="/low-code">Read case study</Cta>}
          >
            <LiveFigure shape={0} className="tile-figure tile-figure-half" label="Animated landscape of points" />
          </Tile>
        </div>

        {/* ---------- Experience ---------- */}
        <section id="experience" className="shelf">
          <Reveal>
            <h2 className="headline">
              Experience. <span>Where the work happened.</span>
            </h2>
          </Reveal>
          <Carousel>
            {experiences.map((e) => (
              <article key={`${e.company}-${e.role}`} className={`card ${e.current ? "card-current" : ""}`}>
                <p className="card-eyebrow">
                  {e.current && <span className="live-dot" />}
                  {e.date}
                </p>
                <h3 className="card-title">{e.company}</h3>
                <p className="card-role">{e.role}</p>
                <ul className="card-list">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="card-foot">{e.location}</p>
              </article>
            ))}
          </Carousel>
        </section>

        {/* ---------- Credentials ---------- */}
        <section id="credentials" className="shelf shelf-white">
          <Reveal>
            <h2 className="headline">
              Credentials. <span>Stack, education and certificates.</span>
            </h2>
          </Reveal>
          <div className="creds">
            <Reveal className="creds-col">
              <h3>Stack</h3>
              <dl className="creds-stack">
                {skills.map((g) => (
                  <div key={g.title}>
                    <dt>{g.title}</dt>
                    <dd>{g.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.06} className="creds-col">
              <h3>Education</h3>
              <ul className="creds-list">
                {education.map((e) => (
                  <li key={e.school}>
                    <b>{e.degree}</b>
                    <span>{e.school}</span>
                    <span>{e.date}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12} className="creds-col">
              <h3>Certificates</h3>
              <ul className="creds-list">
                {certifications.map((c) => (
                  <li key={c.title}>
                    <b>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="link">
                          {c.title} <Chevron />
                        </a>
                      ) : (
                        c.title
                      )}
                    </b>
                    <span>
                      {c.issuer} · {c.date}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <Tile
          id="contact"
          tone="dark"
          className="tile-contact"
          title="Let's talk."
          subtitle="Open to AI engineering, RAG and MLOps roles in Germany and beyond."
          ctas={
            <>
              <Cta href={`mailto:${profile.email}`}>Email me</Cta>
              <Cta href={profile.linkedin} variant="outline">LinkedIn</Cta>
            </>
          }
        >
          <Reveal className="form-wrap">
            <form className="form" action="https://formspree.io/f/xdaaodyn" method="POST" aria-label="Contact form">
              <input type="hidden" name="_subject" value="New portfolio message" />
              <div className="form-row">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
              </div>
              <label>
                <span>Message</span>
                <textarea name="message" rows={4} required />
              </label>
              <button type="submit" className="cta cta-fill">Send message</button>
            </form>
          </Reveal>
        </Tile>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-note">
            Figures on this page are rendered live in Three.js and only animate while on screen.
          </p>
          <div className="footer-cols">
            <div>
              <h4>Explore</h4>
              <ul>
                {nav.map((n) => (
                  <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Projects</h4>
              <ul>
                <li><a href="https://github.com/saffronhamid/code.git" target="_blank" rel="noopener noreferrer">Modular RAG Pipeline</a></li>
                <li><Link href="/bat-tracking">Bat Tracking</Link></li>
                <li><a href="https://github.com/saffronhamid/networksecurity.git" target="_blank" rel="noopener noreferrer">Phishing URL Detection</a></li>
                <li><Link href="/low-code">Student Project Manager</Link></li>
              </ul>
            </div>
            <div>
              <h4>Experience</h4>
              <ul>
                <li>Deutsche Börse</li>
                <li>Solid Works</li>
                <li>NIT Srinagar</li>
              </ul>
            </div>
            <div>
              <h4>Connect</h4>
              <ul>
                <li><a href={`mailto:${profile.email}`}>Email</a></li>
                <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href={profile.cv} target="_blank" rel="noopener noreferrer">Curriculum vitae</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-legal">
            <p>Copyright © {new Date().getFullYear()} Faizan Hamid. All rights reserved.</p>
            <p>Frankfurt am Main, Germany</p>
          </div>
        </div>
      </footer>
    </>
  );
}
