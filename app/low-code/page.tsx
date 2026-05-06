import Link from "next/link";

import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";

export default function LowCodePage() {
  const reportPath = "/reports/gross-lone-naghizadeh_final-report.pdf";

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-14 sm:px-10">
      <div className="mb-12">
        <Link
          href="/#work"
          className="text-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back
        </Link>
      </div>

      <FadeIn>
        <SectionHeader
          number="case study"
          title="Low-Code."
          description="Seminar paper on low-code platforms for business applications, exploring AI-assisted workflows in IntelliJ IDEA with GitHub Copilot and Claude."
        />
        <div className="mb-10 flex flex-wrap gap-2">
          <span className="chip">Low-code</span>
          <span className="chip">AI-assisted</span>
          <span className="chip">Evaluation</span>
        </div>
        <div className="mb-12 flex flex-wrap gap-3">
          <a className="btn-ghost" href={reportPath} target="_blank" rel="noreferrer">
            Open paper (PDF)
          </a>
          <a className="btn-ghost" href={reportPath} download>
            Download
          </a>
        </div>
      </FadeIn>

      <section className="border-t border-white/[0.06] pt-6">
        <iframe
          title="Full paper (PDF)"
          src={reportPath}
          className="h-[78vh] w-full rounded-md bg-black"
        />
        <p className="text-mono mt-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
          If the viewer doesn&apos;t load, use &ldquo;Open paper (PDF)&rdquo;.
        </p>
      </section>
    </main>
  );
}
