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
    <div className="glass-card relative p-6">
      <span className="absolute left-6 top-7 h-2.5 w-2.5 rounded-full bg-emerald-300" />
      <div className="border-l border-white/10 pl-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {experience.role}
            </h3>
            <p className="text-sm text-zinc-400">{experience.company}</p>
            <p className="text-xs text-zinc-500">{experience.location}</p>
          </div>
          <p className="text-sm text-zinc-400">{experience.date}</p>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
          {experience.bullets.map((line, idx) => (
            <li key={idx}>• {line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
