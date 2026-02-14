"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import ContactForm from "./components/ContactForm";
import ExperienceCard from "./components/ExperienceCard";
import FadeIn from "./components/FadeIn";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import SectionHeader from "./components/SectionHeader";
import SkillGroup from "./components/SkillGroup";
import SmokyCursor from "./components/SmokyCursor";

function TypewriterHero() {
  const text = "AI Engineer in training — building scalable GenAI, RAG, and ML systems for real-world applications.";
  const [displayedCount, setDisplayedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (displayedCount < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedCount((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [displayedCount, text.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[0.9] rainbow-text">
      {text.slice(0, displayedCount)}
      <span
        className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle"
        style={{ opacity: showCursor ? 1 : 0, WebkitTextFillColor: "white" }}
      />
    </h1>
  );
}

export default function Home() {
  const sections = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "focus", label: "Focus" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "education", label: "Education" },
      { id: "contact", label: "Contact" },
    ],
    []
  );
  const navItems = useMemo(
    () => sections.filter((section) => section.id !== "contact"),
    [sections]
  );

  const [activeId, setActiveId] = useState("home");
  const [smokeEnabled, setSmokeEnabled] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarse =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;

    if (prefersReduced || isCoarse) {
      setSmokeEnabled(false);
    }
  }, []);

  const rotatingHeadlines = [
    "Machine Learning Engineer (MLOps) | RAG | AI Pipelines",
    "Low-Code Seminar Builder | Product Strategy",
    "Computer Vision | YOLO Tracking | Applied Research",
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % rotatingHeadlines.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [rotatingHeadlines.length]);

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
    headline: "Machine Learning Engineer (MLOps) | RAG | AI Pipelines",
    location: "Frankfurt, Hessen, Germany",
    email: "lone@students.uni-marburg.de",
    phone: "0-1521-690-8924",
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/faizan-hamid-50b113215/",
        icon: FaLinkedin,
      },
      {
        label: "GitHub",
        url: "https://github.com/saffronhamid",
        icon: FaGithub,
      },
    ],
  };

  const aboutSummary =
    "To leverage expertise in ML, RAG, and MLOps to build reliable AI systems that scale from research to production with measurable impact.";

  const aboutHighlights = [
    "Focused on reliable ML systems with strong data integrity and monitoring.",
    "Experienced with MLflow pipelines and continuous learning workflows.",
    "Built production-ready pipelines for real-time ML services.",
    "Comfortable across ML, backend APIs, and frontend integrations.",
  ];

  const skills = [
    {
      title: "ML / Data Science",
      items: [
        "Scikit-learn",
        "TensorFlow",
        "PyTorch",
        "Keras",
        "XGBoost",
        "Pandas",
        "OpenCV",
        "NumPy",
      ],
    },
    {
      title: "Backend",
      items: [
        "Python",
        "FastAPI",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
      ],
    },
    {
      title: "Frontend",
      items: ["React", "JavaScript", "React Router", "Redux"],
    },
    {
      title: "Tools",
      items: ["MLflow", "Docker", "Git", "GitHub Actions", "CI/CD pipelines"],
    },
  ];

  const projects = [
    {
      title: "Phishing URL Detection System",
      description: [
        "Phishing ETL pipeline with Python, MongoDB, and scikit-learn using KNN imputation.",
        "MLOps pipeline with MLflow, DagsHub, AWS S3, and Dockerized FastAPI.",
      ],
      tech: ["Python", "FastAPI", "Scikit-learn", "MLflow", "MongoDB"],
      links: {
        live: "#",
        repo: "https://github.com/saffronhamid/networksecurity.git",
      },
    },
    {
      title: "Retrieval-Augmented Generation (RAG) Pipeline",
      description: [
        "Modular ingestion pipeline for PDFs, TXT, and web pages.",
        "LangGraph workflow nodes to orchestrate retrieval and generation.",
      ],
      tech: ["LangChain", "LangGraph", "OpenAI", "FAISS", "Pydantic"],
      links: {
        live: "#",
        repo: "https://github.com/saffronhamid/code.git",
      },
    },
  ];



  const experiences = [
    {
      role: "Machine Learning Engineer (MLOps)",
      company: "Solid Works",
      date: "Sep 2023 - Mar 2024",
      location: "Srinagar, India",
      bullets: [
        "Engineered preprocessing pipelines to handle missing data and confounding variables.",
        "Built Python pipelines to clean, validate, and optimize operational datasets.",
        "Developed MLflow-based MLOps workflows for continuous learning and adaptation.",
      ],
    },
    {
      role: "Research Assistant",
      company: "National Institute Of Technology",
      date: "Mar 2023 - Jul 2023",
      location: "Srinagar, India",
      bullets: [
        "Built a real-time autonomous navigation system using a TensorFlow CNN.",
        "Improved reliability through drift analysis and hyperparameter tuning.",
      ],
    },
    {
      role: "React Intern",
      company: "Solid Works",
      date: "Jul 2021 - Jan 2022",
      location: "Srinagar, India",
      bullets: [
        "Built responsive React apps with React Router and Redux.",
        "Developed Node/Express APIs with MongoDB for CRUD and auth.",
      ],
    },
  ];

  const education = [
    {
      school: "Philipps-Universitat Marburg",
      degree: "M.Sc. in Data Science",
      date: "Apr 2024 - Sep 2026",
      location: "Marburg, Germany",
      details: [],
    },
    {
      school: "University of Jammu",
      degree: "B.E. in Computer Engineering",
      date: "Aug 2019 - Sep 2023",
      location: "Jammu, India",
      details: ["GPA: 2.5 (Good)", "Ranked among top 10% of class"],
    },
  ];

  return (
    <div className="min-h-screen text-ink">
      <SmokyCursor enabled={smokeEnabled} />
      <Navbar items={navItems} activeId={activeId} />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6">
        <section id="home" className="min-h-[85vh] flex items-center pt-20 pb-0 overflow-hidden relative">
          <div className="mx-auto w-full max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center h-full">
            <div className="space-y-8 z-10 w-full">
              <div className="min-h-[160px] sm:min-h-[200px] lg:min-h-[280px] flex flex-col justify-center">
                <TypewriterHero />
                <p className="mt-6 text-sm sm:text-base text-muted/80 tracking-wide font-medium">
                  Master’s in Data Science | Germany | Open to Werkstudent & AI/ML Roles
                </p>
              </div>
              <div className="flex gap-6 text-sm font-medium text-muted uppercase tracking-widest">
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="https://www.linkedin.com/in/faizan-hamid-50b113215/" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="https://github.com/saffronhamid" target="_blank" className="hover:text-white transition-colors">GitHub</a>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-[85vh] w-full flex items-end justify-center lg:justify-end">
              {/* Gradient overlays for extra blending safety */}
              <div className="absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-black via-transparent to-transparent w-32 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-black via-transparent to-transparent w-32 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

              <img
                src="/portrait.png"
                alt="Faizan Hamid"
                className="h-full w-full object-contain object-right"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
                }}
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

        <section id="about" className="py-24">
          <FadeIn>
            <SectionHeader
              title="About"
              subtitle="Building reliable ML systems"
              description="Focused on production ML workflows, MLOps reliability, and scalable AI delivery."
            />
          </FadeIn>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <FadeIn delay={0.2}>
              <div>
                <p className="text-lg text-muted leading-relaxed">{aboutSummary}</p>
                <ul className="mt-8 space-y-4">
                  {aboutHighlights.map((item, idx) => (
                    <li key={item} className="flex gap-3 text-sm text-muted">
                      <span className="text-[#a78bfa] mt-0.5 text-xs">▸</span>
                      <span className="hover:text-white transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="border-l border-white/[0.08] pl-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[#a78bfa] font-semibold mb-4">Languages</p>
                <div className="space-y-3 text-sm text-muted">
                  <p className="hover:text-white transition-colors">English</p>
                  <p className="hover:text-white transition-colors">German (A2)</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="focus" className="py-24">
          <FadeIn>
            <SectionHeader
              title="Focus Areas"
              subtitle="What I am working on now"
              description="Two current tracks that blend applied research with practical delivery."
            />
          </FadeIn>
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn delay={0.15}>
              <Link
                href="/low-code"
                className="group block relative py-8 px-6 -mx-6 rounded-2xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-500"
                aria-label="Low-code seminar details"
              >
                <div className="absolute left-0 top-8 w-1 h-0 bg-[#22d3ee] rounded-full group-hover:h-16 transition-all duration-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-[#22d3ee] font-semibold mb-3">Low-Code Seminar</p>
                <h3 className="text-2xl font-semibold text-white group-hover:translate-x-2 transition-transform duration-300">
                  Web-App for Managing Student Projects
                </h3>
                <p className="mt-3 text-sm text-muted">Explore →</p>
              </Link>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                href="/bat-tracking"
                className="group block relative py-8 px-6 -mx-6 rounded-2xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-500"
                aria-label="Bat tracking project details"
              >
                <div className="absolute left-0 top-8 w-1 h-0 bg-[#34d399] rounded-full group-hover:h-16 transition-all duration-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-[#34d399] font-semibold mb-3">Bat Tracking</p>
                <h3 className="text-2xl font-semibold text-white group-hover:translate-x-2 transition-transform duration-300">
                  Master project using all YOLO versions
                </h3>
                <p className="mt-3 text-sm text-muted">Explore →</p>
              </Link>
            </FadeIn>
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="skills" className="py-24">
          <FadeIn>
            <SectionHeader
              title="Skills"
              subtitle="Technical toolkit"
              description="Core stack across ML, backend, frontend, and MLOps tooling."
            />
          </FadeIn>
          <div className="grid gap-0 md:grid-cols-2 md:gap-x-12">
            {skills.map((group) => (
              <SkillGroup
                key={group.title}
                title={group.title}
                skills={group.items}
              />
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="projects" className="py-24">
          <FadeIn>
            <SectionHeader
              title="Projects"
              subtitle="Selected work"
              description="A mix of production ML pipelines, RAG systems, and applied research."
            />
          </FadeIn>
          <div className="space-y-0">
            {projects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="experience" className="py-24">
          <FadeIn>
            <SectionHeader
              title="Experience"
              subtitle="Industry and research"
              description="Hands-on ML engineering, MLOps, and applied research roles."
            />
          </FadeIn>
          <div className="space-y-0">
            {experiences.map((experience, idx) => (
              <ExperienceCard key={experience.role} experience={experience} index={idx} />
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="education" className="py-24">
          <FadeIn>
            <SectionHeader
              title="Education"
              subtitle="Academic background"
              description="Formal training in data science and computer engineering."
            />
          </FadeIn>
          <div className="grid gap-12 md:grid-cols-2">
            {education.map((item, idx) => (
              <FadeIn key={item.school} delay={idx * 0.15}>
                <div className="group relative pl-8 py-6">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-8 w-3 h-3 rounded-full border-2 border-[#fbbf24] bg-black group-hover:bg-[#fbbf24] transition-colors duration-300" />
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#fbbf24] transition-colors duration-300">
                    {item.school}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.degree}</p>
                  <p className="mt-1 text-xs text-white/30">{item.location}</p>
                  <p className="mt-2 text-sm text-muted">{item.date}</p>
                  {item.details.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="text-[#fbbf24] mt-1 text-xs">▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="contact" className="py-24">
          <FadeIn>
            <SectionHeader
              title="Contact"
              subtitle="Start a conversation"
              description="Open to ML engineering, RAG pipeline, and MLOps roles."
            />
          </FadeIn>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
            <FadeIn delay={0.15}>
              <div className="space-y-8">
                <p className="text-lg text-muted leading-relaxed">
                  Want to collaborate or discuss ML/MLOps work? Send a message
                  and I will get back to you.
                </p>
                <div className="space-y-4 text-sm">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-3 text-muted hover:text-white transition-colors duration-300"
                    aria-label={`Email ${profile.email}`}
                  >
                    <span className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:border-[#a78bfa] group-hover:bg-[#a78bfa]/10 transition-all duration-300">
                      <FiMail className="text-sm" />
                    </span>
                    {profile.email}
                  </a>
                  <div className="group flex items-center gap-3 text-muted">
                    <span className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center">
                      <FiPhone className="text-sm" />
                    </span>
                    {profile.phone}
                  </div>
                  <div className="group flex items-center gap-3 text-muted">
                    <span className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center">
                      <FiMapPin className="text-sm" />
                    </span>
                    {profile.location}
                  </div>
                </div>
              </div>
            </FadeIn>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-subtle sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={profile.links[0].url}
              className="text-xs text-subtle transition hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={profile.links[1].url}
              className="text-xs text-subtle transition hover:text-ink"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


