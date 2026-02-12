type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      {subtitle && (
        <p className="text-kicker">{subtitle}</p>
      )}
      <h2 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
        <span className="section-title">{title}</span>
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
