import { FiExternalLink, FiGithub } from "react-icons/fi";

type Project = {
  title: string;
  description: string[];
  tech: string[];
  links: {
    live: string;
    repo: string;
  };
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass-card card-hover flex h-full flex-col justify-between p-6">
      <div>
        <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {project.description.map((line, idx) => (
            <li key={idx}>• {line}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-4 text-sm text-accent">
        <a
          className="inline-flex items-center gap-2 hover:opacity-80"
          href={project.links.live}
          aria-label={`Open live project for ${project.title}`}
        >
          <FiExternalLink /> Live
        </a>
        <a
          className="inline-flex items-center gap-2 hover:opacity-80"
          href={project.links.repo}
          aria-label={`Open repository for ${project.title}`}
        >
          <FiGithub /> GitHub
        </a>
      </div>
    </div>
  );
}
