export default function SectionHeader({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">
        {title}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {subtitle}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">{description}</p>
      ) : null}
    </div>
  );
}
