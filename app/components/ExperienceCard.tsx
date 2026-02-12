type Experience = {
  role: string;
  company: string;
  date: string;
  location: string;
  bullets: string[];
};

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <div className="glass-card card-hover relative p-6">
      <span className="absolute left-6 top-7 h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]" />
      <div className="border-l border-black/10 pl-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-ink">
              {experience.role}
            </h3>
            <p className="text-sm text-muted">{experience.company}</p>
            <p className="text-xs text-subtle">{experience.location}</p>
          </div>
          <p className="text-sm text-muted">{experience.date}</p>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {experience.bullets.map((line, idx) => (
            <li key={idx}>• {line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
