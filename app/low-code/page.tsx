import Link from "next/link";

import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";

export default function LowCodePage() {
  const reportPath = "/reports/gross-lone-naghizadeh_final-report.pdf";

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6">
      <div className="mb-10">
        <Link href="/#focus" className="btn-ghost inline-flex px-4 py-2 text-sm">
          Back to focus
        </Link>
      </div>

      <FadeIn>
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Low-code platforms for business applications"
            subtitle="IntelliJ IDEA with GitHub Copilot and Claude"
            description="Read the full paper (with references) below."
          />
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="chip">Low-code</span>
            <span className="chip">AI-assisted</span>
            <span className="chip">Evaluation</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="btn-ghost inline-flex px-4 py-2 text-sm"
              href={reportPath}
              target="_blank"
              rel="noreferrer"
            >
              Open full paper (PDF)
            </a>
            <a
              className="btn-ghost inline-flex px-4 py-2 text-sm"
              href={reportPath}
              download
            >
              Download PDF
            </a>
          </div>
        </div>
      </FadeIn>

      <section className="mt-12 panel p-3 sm:p-4">
        <iframe
          title="Full paper (PDF)"
          src={reportPath}
          className="h-[78vh] w-full rounded-xl bg-black"
        />
        <p className="px-3 pb-3 pt-4 text-xs text-muted-foreground">
          If the PDF viewer doesn't load in your browser, use "Open full paper (PDF)".
        </p>
      </section>
    </main>
  );
}
