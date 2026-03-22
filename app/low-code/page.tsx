import Link from "next/link";

import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";

export default function LowCodePage() {
  const reportPath = "/reports/gross-lone-naghizadeh_final-report.pdf";
  const modules = [
    {
      title: "User Management",
      summary:
        "CRUD-based user management with an invitation flow. SMTP setup was problematic, so invitations were implemented via Mailtrap for development/testing.",
      rows: [
        { id: "5.1.1", useCase: "Log in to the server", status: "Fully Implemented" },
        { id: "5.1.2", useCase: "Invite user", status: "Partially Implemented" },
        { id: "5.1.3", useCase: "Accept invitation", status: "Fully Implemented" },
        { id: "5.1.4", useCase: "Display all user accounts", status: "Fully Implemented" },
        { id: "5.1.5", useCase: "Filter displayed user accounts", status: "Fully Implemented" },
        { id: "5.1.6", useCase: "Display details of a user account", status: "Fully Implemented" },
        { id: "5.1.7", useCase: "Change your own user account", status: "Fully Implemented" },
        { id: "5.1.8", useCase: "Change another user's account", status: "Fully Implemented" },
        { id: "5.1.9", useCase: "Delete a user account", status: "Fully Implemented" },
        { id: "5.1.10", useCase: "Anonymize a user account", status: "Fully Implemented" },
      ],
    },
    {
      title: "Project Management",
      summary:
        "Standard CRUD project management. Clear requirements and a simple data model made this module well-suited for AI-assisted development.",
      rows: [
        { id: "5.2.1", useCase: "Create project", status: "Fully Implemented" },
        { id: "5.2.2", useCase: "Show all projects", status: "Fully Implemented" },
        { id: "5.2.3", useCase: "Display own projects", status: "Fully Implemented" },
        { id: "5.2.4", useCase: "Filter displayed projects", status: "Fully Implemented" },
        { id: "5.2.5", useCase: "Display project details", status: "Fully Implemented" },
        { id: "5.2.6", useCase: "Change project data", status: "Fully Implemented" },
        { id: "5.2.7", useCase: "Delete project", status: "Fully Implemented" },
      ],
    },
    {
      title: "Appointment Management",
      summary:
        "Appointments follow CRUD patterns. Calendar integration was implemented via iCalendar (.ics) export instead of direct provider integration.",
      rows: [
        { id: "5.3.1", useCase: "Create appointment", status: "Fully Implemented" },
        {
          id: "5.3.2",
          useCase: "Display all appointments for a project",
          status: "Fully Implemented",
        },
        { id: "5.3.3", useCase: "Add appointment to calendar", status: "Partially Implemented" },
        { id: "5.3.4", useCase: "Change appointment data", status: "Fully Implemented" },
        { id: "5.3.5", useCase: "Delete appointment", status: "Fully Implemented" },
      ],
    },
    {
      title: "Commenting",
      summary:
        "Public/private comments with filtering and lifecycle actions. Comment analysis is technically implemented but requires a paid API key; otherwise it shows mock results.",
      rows: [
        { id: "5.4.1", useCase: "Write public comment", status: "Fully Implemented" },
        { id: "5.4.2", useCase: "Write private comment", status: "Fully Implemented" },
        { id: "5.4.3", useCase: "Display all comments of a project", status: "Fully Implemented" },
        { id: "5.4.4", useCase: "Display public comments of a project", status: "Fully Implemented" },
        { id: "5.4.5", useCase: "Filter displayed comments", status: "Fully Implemented" },
        { id: "5.4.6", useCase: "Change own comment", status: "Fully Implemented" },
        { id: "5.4.7", useCase: "Delete comment", status: "Fully Implemented" },
        { id: "5.4.8", useCase: "Analyze the comments of a project", status: "Partially Implemented" },
      ],
    },
    {
      title: "Settings",
      summary: "A small settings module focused on connection interruption detection intervals.",
      rows: [
        {
          id: "5.5.1",
          useCase: "Change the period for detecting connection interrupts",
          status: "Fully Implemented",
        },
      ],
    },
    {
      title: "Non-functional Requirements",
      summary:
        "Reliability, user feedback, and UI requirements were addressed with reconnection/error handling and consistent loading/notification patterns.",
      rows: [
        { id: "6.1", useCase: "Reliability of communication connection", status: "Fully Implemented" },
        { id: "6.2", useCase: "Feedback to the user", status: "Fully Implemented" },
        { id: "6.3", useCase: "User interface", status: "Fully Implemented" },
      ],
    },
  ] as const;

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
            description="Read the full paper (with references) below, plus a quick module-by-module status summary."
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

      <div className="mt-12 grid gap-6">
        {modules.map((module) => (
          <section key={module.title} className="panel card-hover p-6">
            <h2 className="text-lg font-semibold text-foreground">{module.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {module.summary}
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="border-b border-white/[0.08] py-2 pr-4 font-semibold">
                      ID
                    </th>
                    <th className="border-b border-white/[0.08] py-2 pr-4 font-semibold">
                      Use case
                    </th>
                    <th className="border-b border-white/[0.08] py-2 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {module.rows.map((row) => (
                    <tr key={row.id} className="text-muted-foreground">
                      <td className="border-b border-white/[0.06] py-2 pr-4 whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="border-b border-white/[0.06] py-2 pr-4 min-w-[22rem]">
                        <span className="text-foreground/90">{row.useCase}</span>
                      </td>
                      <td className="border-b border-white/[0.06] py-2 whitespace-nowrap">
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
