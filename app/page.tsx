"use client";

import { useEffect, useMemo, useState } from "react";
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

  const featuredWork = [
    {
      title: "ML Ops Platform",
      category: "Product Design",
      image: "/dummy-project-1.svg",
    },
    {
      title: "RAG Research Studio",
      category: "AI Systems",
      image: "/dummy-project-2.svg",
    },
    {
      title: "Vision Tracking Lab",
      category: "Applied Research",
      image: "/dummy-project-3.svg",
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
        <section id="home" className="py-24">
          <FadeIn>
            <div className="panel-strong relative overflow-hidden px-6 py-10 sm:px-10">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div className="space-y-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">
                    My name is {profile.name} and I am a
                  </p>
                  <div className="space-y-2">
                    <h1 className="hero-title font-semibold text-ink">
                      Machine Learning Engineer
                    </h1>
                    <h2 className="hero-title hero-outline font-semibold">
                      &amp; Researcher
                    </h2>
                  </div>
                  <p className="hero-subtitle text-muted">
                    based in {profile.location}.
                  </p>
                  <p className="max-w-xl text-sm text-muted">
                    {aboutSummary}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#work" className="btn-primary px-5 py-3 text-xs uppercase tracking-[0.24em]">
                      Discover my work
                    </a>
                    <a href="#contact" className="btn-ghost px-5 py-3 text-xs uppercase tracking-[0.24em]">
                      Contact me
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-muted">
                    <span className="inline-flex items-center gap-2">
                      <FiMapPin /> {profile.location}
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex cursor-pointer items-center gap-2 hover:text-ink hover:underline hover:underline-offset-4"
                      aria-label={`Email ${profile.email}`}
                    >
                      <FiMail /> {profile.email}
                    </a>
                    <span className="inline-flex items-center gap-2">
                      <FiPhone /> {profile.phone}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="image-frame">
                    <img
                      src="/dummy-portrait.svg"
                      alt="Portrait placeholder"
                      className="h-[440px] w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
                    {profile.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.label}
                          href={link.url}
                          className="btn-ghost inline-flex items-center gap-2 px-4 py-2 uppercase tracking-[0.2em]"
                        >
                          <Icon /> {link.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="about" className="py-20">
          <FadeIn>
            <SectionHeader
              title="About"
              subtitle="Building reliable ML systems"
              description="Focused on production ML workflows, MLOps reliability, and scalable AI delivery."
            />
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="panel card-hover p-6 text-muted">
                <p className="text-base text-muted">{aboutSummary}</p>
                <ul className="mt-6 space-y-3 text-sm text-subtle">
                  {aboutHighlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="panel card-hover p-6">
                <p className="text-kicker">Languages</p>
                <div className="mt-4 space-y-2 text-sm text-muted">
                  <p>English</p>
                  <p>German (A2)</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="focus" className="py-20">
          <FadeIn>
            <SectionHeader
              title="Focus Areas"
              subtitle="What I am working on now"
              description="Two current tracks that blend applied research with practical delivery."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <Link
                href="/low-code"
                className="panel focus-card card-hover p-6 animate-float"
                aria-label="Low-code seminar details"
              >
                <p className="text-kicker">Low-Code Seminar</p>
                <h3 className="focus-card-title mt-4 text-xl font-semibold text-ink">
                  Web-App for Managing Student Projects
                </h3>
              </Link>
              <Link
                href="/bat-tracking"
                className="panel focus-card card-hover p-6 animate-float"
                aria-label="Bat tracking project details"
              >
                <p className="text-kicker">Bat Tracking</p>
                <h3 className="focus-card-title mt-4 text-xl font-semibold text-ink">
                  Master project using all YOLO versions
                </h3>
              </Link>
            </div>
          </FadeIn>
        </section>

        <section id="work" className="py-20">
          <FadeIn>
            <SectionHeader
              title="Selected Work"
              subtitle="Design / Research"
              description="A curated set of recent ML product and research work."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredWork.map((work) => (
                <div key={work.title} className="panel-soft card-hover p-6">
                  <div className="image-frame">
                    <img
                      src={work.image}
                      alt={`${work.title} preview`}
                      className="h-[320px] w-full object-cover"
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-between text-sm text-muted">
                    <p className="text-ink">{work.title}</p>
                    <p className="text-subtle">{work.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="skills" className="py-20">
          <FadeIn>
            <SectionHeader
              title="Skills"
              subtitle="Technical toolkit"
              description="Core stack across ML, backend, frontend, and MLOps tooling."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {skills.map((group) => (
                <SkillGroup
                  key={group.title}
                  title={group.title}
                  skills={group.items}
                />
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="projects" className="py-20">
          <FadeIn>
            <SectionHeader
              title="Projects"
              subtitle="Selected work"
              description="A mix of production ML pipelines, RAG systems, and applied research."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="experience" className="py-20">
          <FadeIn>
            <SectionHeader
              title="Experience"
              subtitle="Industry and research"
              description="Hands-on ML engineering, MLOps, and applied research roles."
            />
            <div className="grid gap-4">
              {experiences.map((experience) => (
                <ExperienceCard key={experience.role} experience={experience} />
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="education" className="py-20">
          <FadeIn>
            <SectionHeader
              title="Education"
              subtitle="Academic background"
              description="Formal training in data science and computer engineering."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {education.map((item) => (
                <div key={item.school} className="panel card-hover p-6">
                  <h3 className="text-lg font-semibold text-ink">
                    {item.school}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.degree}</p>
                  <p className="mt-1 text-sm text-subtle">{item.location}</p>
                  <p className="mt-2 text-sm text-subtle">{item.date}</p>
                  {item.details.length > 0 && (
                    <ul className="mt-3 space-y-1 text-sm text-muted">
                      {item.details.map((detail) => (
                        <li key={detail}>• {detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="contact" className="py-20">
          <FadeIn>
            <SectionHeader
              title="Contact"
              subtitle="Start a conversation"
              description="Open to ML engineering, RAG pipeline, and MLOps roles."
            />
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div className="panel card-hover p-6 text-muted">
                <p className="text-base">
                  Want to collaborate or discuss ML/MLOps work? Send a message
                  and I will get back to you.
                </p>
                <div className="mt-6 space-y-3 text-sm">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex cursor-pointer items-center gap-2 hover:text-ink hover:underline hover:underline-offset-4"
                    aria-label={`Email ${profile.email}`}
                  >
                    <FiMail /> {profile.email}
                  </a>
                  <p className="inline-flex items-center gap-2">
                    <FiPhone /> {profile.phone}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <FiMapPin /> {profile.location}
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-black/10 py-10">
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


