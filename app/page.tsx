"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiMail, FiMapPin } from "react-icons/fi";
import BackToTop from "./components/BackToTop";
import Certifications from "./components/Certifications";
import CommandPalette from "./components/CommandPalette";
import ContactForm from "./components/ContactForm";
import ExperienceCard from "./components/ExperienceCard";
import FadeIn from "./components/FadeIn";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import SectionHeader from "./components/SectionHeader";
import SideRail from "./components/SideRail";
import SkillGroup from "./components/SkillGroup";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";

export default function Home() {
  const sections = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "stats", label: "Numbers" },
      { id: "work", label: "Work" },
      { id: "experience", label: "Experience" },
      { id: "skills", label: "Stack" },
      { id: "education", label: "Education" },
      { id: "recognition", label: "Recognition" },
      { id: "contact", label: "Contact" },
    ],
    []
  );
  const navItems = useMemo(
    () => sections.filter((section) => section.id !== "home" && section.id !== "contact"),
    [sections]
  );

  const [activeId, setActiveId] = useState("home");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 }
    );

    targets.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sections]);

  const profile = {
    name: "Faizan Hamid",
    location: "Frankfurt, Germany",
    email: "lone@students.uni-marburg.de",
    linkedin: "https://www.linkedin.com/in/faizan-hamid-50b113215/",
    github: "https://github.com/saffronhamid",
  };

  const aboutHighlights = [
    "Production ML pipelines with MLflow, Docker, and FastAPI.",
    "RAG systems with LangChain, LangGraph, and FAISS.",
    "Drift detection and continuous-learning workflows.",
    "Comfortable across data, backend APIs, and frontends.",
  ];

  const skills = [
    {
      title: "ML / Data",
      items: ["PyTorch", "TensorFlow", "Scikit-learn", "Keras", "XGBoost", "Pandas", "NumPy", "OpenCV"],
    },
    {
      title: "Backend",
      items: ["Python", "FastAPI", "Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL"],
    },
    {
      title: "GenAI",
      items: ["LangChain", "LangGraph", "FAISS", "OpenAI", "Pydantic"],
    },
    {
      title: "Tooling",
      items: ["MLflow", "Docker", "GitHub Actions", "AWS S3", "DagsHub", "Git"],
    },
    {
      title: "Frontend",
      items: ["React", "Next.js", "Redux", "TypeScript"],
    },
  ];

  const projects = [
    {
      title: "Phishing URL Detection",
      year: "2024",
      description: [
        "End-to-end MLOps pipeline detecting phishing URLs at scale: ETL with KNN imputation, MLflow tracking, DagsHub artifacts, and a Dockerized FastAPI inference service deployed to AWS S3.",
      ],
      tech: ["Python", "FastAPI", "Scikit-learn", "MLflow", "MongoDB", "Docker"],
      links: {
        live: "#",
        repo: "https://github.com/saffronhamid/networksecurity.git",
      },
    },
    {
      title: "RAG Pipeline",
      year: "2024",
      description: [
        "Modular retrieval-augmented generation system orchestrating PDFs, TXT, and web sources via LangGraph workflow nodes, with FAISS retrieval and Pydantic-typed contracts.",
      ],
      tech: ["LangChain", "LangGraph", "OpenAI", "FAISS", "Pydantic"],
      links: {
        live: "#",
        repo: "https://github.com/saffronhamid/code.git",
      },
    },
    {
      title: "Bat Tracking with YOLO",
      year: "2025",
      description: [
        "Master's research project benchmarking every YOLO release for nocturnal wildlife tracking — from preprocessing pipelines to model evaluation under low-light conditions.",
      ],
      tech: ["PyTorch", "YOLO", "OpenCV", "Python"],
      links: {
        live: "/bat-tracking",
        repo: "#",
      },
    },
    {
      title: "Low-Code Student Project Manager",
      year: "2024",
      description: [
        "Web application built within a low-code seminar to coordinate student research projects — auth, dashboards, and reporting flows shipped end-to-end.",
      ],
      tech: ["React", "Node.js", "Low-code", "PostgreSQL"],
      links: {
        live: "/low-code",
        repo: "#",
      },
    },
  ];

  const experiences = [
    {
      role: "Machine Learning Engineer",
      company: "Solid Works",
      date: "Sep 2023 — Mar 2024",
      location: "Srinagar, India",
      bullets: [
        "Engineered preprocessing pipelines to handle missing data and confounding variables.",
        "Built Python pipelines to clean, validate, and optimize operational datasets.",
        "Developed MLflow-based MLOps workflows for continuous learning and adaptation.",
      ],
    },
    {
      role: "Research Assistant",
      company: "National Institute of Technology",
      date: "Mar 2023 — Jul 2023",
      location: "Srinagar, India",
      bullets: [
        "Built a real-time autonomous navigation system using a TensorFlow CNN.",
        "Improved reliability through drift analysis and hyperparameter tuning.",
      ],
    },
    {
      role: "React Intern",
      company: "Solid Works",
      date: "Jul 2021 — Jan 2022",
      location: "Srinagar, India",
      bullets: [
        "Built responsive React apps with React Router and Redux.",
        "Developed Node/Express APIs with MongoDB for CRUD and auth.",
      ],
    },
  ];

  const education = [
    {
      school: "Philipps-Universität Marburg",
      degree: "M.Sc. Data Science",
      date: "Apr 2024 — Sep 2026",
      location: "Marburg, Germany",
    },
    {
      school: "University of Jammu",
      degree: "B.E. Computer Engineering",
      date: "Aug 2019 — Sep 2023",
      location: "Jammu, India",
    },
  ];

  return (
    <div className="relative min-h-screen text-foreground">
      <Navbar items={navItems} activeId={activeId} />
      <SideRail sections={sections} activeId={activeId} />
      <CommandPalette />
      <BackToTop />

      <main className="mx-auto max-w-6xl px-6 sm:px-10">
        <Hero />

        {/* 01 — About */}
        <section id="about" className="border-t border-white/[0.06] py-24 md:py-32">
          <SectionHeader
            number="01"
            title="About."
            description="Building reliable ML systems, from data ingestion to production deployment, with a focus on MLOps and measurable impact."
          />
          <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-20">
            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  I&apos;m a Master&apos;s student in Data Science at Philipps-Universität
                  Marburg, currently focused on production-grade ML pipelines and
                  retrieval-augmented generation systems.
                </p>
                <p>
                  My work blends applied research with practical delivery —
                  shipping ML services that monitor themselves, recover gracefully,
                  and stay accurate under drift. I care about the bits between the
                  notebook and the user.
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-foreground/85">
                  {aboutHighlights.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span className="text-mono mt-2 inline-block h-px w-4 shrink-0 bg-muted-foreground/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <aside className="flex flex-col gap-6 md:w-56">
                <div className="flex flex-col gap-2">
                  <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                    Based in
                  </span>
                  <span className="text-foreground">{profile.location}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                    Languages
                  </span>
                  <span className="text-foreground/85">English · German (A2)</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                    Currently
                  </span>
                  <span className="text-foreground/85">
                    M.Sc. Data Science · open to Werkstudent / full-time AI roles
                  </span>
                </div>
              </aside>
            </FadeIn>
          </div>
        </section>

        {/* 02 — Numbers */}
        <section id="stats" className="border-t border-white/[0.06] py-24 md:py-32">
          <SectionHeader
            number="02"
            title="By the numbers."
            description="A snapshot of the practice translated into shipped systems and outcomes."
          />
          <Stats />
        </section>

        {/* 03 — Work */}
        <section id="work" className="border-t border-white/[0.06] py-24 md:py-32">
          <SectionHeader
            number="03"
            title="Selected work."
            description="A mix of production ML pipelines, RAG systems, and applied research."
          />
          <div className="flex flex-col">
            {projects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </div>
        </section>

        {/* 04 — Experience */}
        <section id="experience" className="border-t border-white/[0.06] py-24 md:py-32">
          <SectionHeader
            number="04"
            title="Experience."
            description="Hands-on ML engineering, MLOps, and applied-research roles."
          />
          <div className="flex flex-col">
            {experiences.map((experience, idx) => (
              <ExperienceCard key={experience.role} experience={experience} index={idx} />
            ))}
          </div>
        </section>

        {/* 05 — Stack */}
        <section id="skills" className="border-t border-white/[0.06] py-24 md:py-32">
          <SectionHeader
            number="05"
            title="Stack."
            description="The tools I reach for across ML, backend, and tooling."
          />
          <div className="flex flex-col">
            {skills.map((group) => (
              <SkillGroup key={group.title} title={group.title} skills={group.items} />
            ))}
          </div>
        </section>

        {/* 06 — Education */}
        <section id="education" className="border-t border-white/[0.06] py-24 md:py-32">
          <SectionHeader
            number="06"
            title="Education."
            description="Formal training in data science and computer engineering."
          />
          <ul className="flex flex-col">
            {education.map((item, idx) => (
              <FadeIn key={item.school} delay={idx * 0.1}>
                <li className="grid gap-2 border-t border-white/[0.06] py-8 last:border-b md:grid-cols-[200px_1fr_auto] md:items-baseline md:gap-12">
                  <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                    {item.date}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-display text-xl font-medium text-foreground sm:text-2xl">
                      {item.school}
                    </h3>
                    <span className="text-sm text-muted-foreground">{item.degree}</span>
                  </div>
                  <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                    {item.location}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </section>

        {/* 07 — Recognition */}
        <section id="recognition" className="border-t border-white/[0.06] py-24 md:py-32">
          <SectionHeader
            number="07"
            title="Recognition."
            description="Credentials and feedback from collaborators along the way."
          />
          <div className="flex flex-col gap-20">
            <div>
              <h4 className="text-mono mb-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Certifications
              </h4>
              <Certifications />
            </div>
            <div>
              <h4 className="text-mono mb-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Testimonials
              </h4>
              <Testimonials />
            </div>
          </div>
        </section>

        {/* 08 — Contact */}
        <section id="contact" className="border-t border-white/[0.06] py-24 md:py-32">
          <SectionHeader
            number="08"
            title="Contact."
            description="Open to ML engineering, RAG, and MLOps roles. Drop a message and I'll reply within a day or two."
          />
          <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-10">
                <p className="display-lg text-foreground">
                  Let&apos;s build something{" "}
                  <span className="text-muted-foreground/60">reliable.</span>
                </p>
                <div className="flex flex-col gap-5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <FiMail className="text-base" />
                    <span className="link-underline">{profile.email}</span>
                  </a>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <FiMapPin className="text-base" />
                    {profile.location}
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
                  >
                    LinkedIn <FiArrowUpRight className="text-sm" />
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
                  >
                    GitHub <FiArrowUpRight className="text-sm" />
                  </a>
                </div>
              </div>
            </FadeIn>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:items-center sm:px-10">
          <p>
            © {new Date().getFullYear()} {profile.name}. Made in Frankfurt.
          </p>
          {!prefersReduced && (
            <motion.span
              className="text-muted-foreground/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Designed and built end-to-end.
            </motion.span>
          )}
        </div>
      </footer>
    </div>
  );
}
