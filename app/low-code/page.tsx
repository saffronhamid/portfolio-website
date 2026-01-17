import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";

export default function LowCodePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6">
      <div className="mb-10">
        <Link
          href="/#focus"
          className="btn-ghost inline-flex px-4 py-2 text-sm"
        >
          Back to focus
        </Link>
      </div>

      <FadeIn>
        <SectionHeader
          title="Low-Code Seminar"
          subtitle="Web-App for Managing Student Projects"
          description="Requirements specification and scope definition."
        />
      </FadeIn>

      <div className="grid gap-6">
        <section className="glass-card card-hover p-6">
          <h2 className="text-lg font-semibold text-white">
            Requirements specification
          </h2>
          <p className="mt-2 text-sm text-zinc-400">Date: October 17, 2025</p>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">1. Objective</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Develop a web application that enables users to manage student
            projects.
          </p>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">
            2. General description
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            The app supports user and rights management, creation and
            management of projects and project data, comments, and appointment
            management.
          </p>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">
            3. Definitions and abbreviations
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>Server: backend with REST API and data persistence.</li>
            <li>
              User account: user name, email, password, role, first and last
              name, student ID, course of study, exam regulations.
            </li>
            <li>Role: administrator or end user with role-based rights.</li>
            <li>Logging in as: user logs in with a role-specific account.</li>
            <li>
              Project type: bachelor&apos;s thesis, master&apos;s thesis,
              advanced internship, project work, seminar paper, independent
              scientific work.
            </li>
            <li>
              Project status: proposed, registered, evaluated, completed.
            </li>
            <li>Project roles: manager and developer.</li>
            <li>
              Appointment types: deadline, meeting, group meeting, template.
            </li>
          </ul>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">
            4. Product environment
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Web app for lecturers and students, compatible with Chrome,
            Firefox, Safari, and Edge.
          </p>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">
            5. Functional requirements
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            All requirements assume a logged-in user, except 5.1.1 and 5.1.3.
          </p>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">
            5.1 User management
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>
              5.1.1 Log in to the server: enter username or email and password;
              server validates or rejects.
            </li>
            <li>
              5.1.2 Invite user: admin sends invitation email with role and
              optional project assignment.
            </li>
            <li>
              5.1.3 Accept invitation: provide invitation key, name, username,
              password, and optional student details.
            </li>
            <li>
              5.1.4 Display all user accounts: admin overview with usernames
              and emails and filtering.
            </li>
            <li>
              5.1.5 Filter displayed user accounts: text filter updates the
              overview on change.
            </li>
            <li>
              5.1.6 Display details of a user account: show all data except
              password for authorized users.
            </li>
            <li>
              5.1.7 Change your own user account: edit all fields except role;
              change password with current and new password.
            </li>
            <li>
              5.1.8 Change another user&apos;s account: admin edits data and
              sets new password with admin confirmation.
            </li>
            <li>
              5.1.9 Delete a user account: admin confirms deletion; user and
              comments removed.
            </li>
            <li>
              5.1.10 Anonymize a user account: authorized user removes personal
              data; login no longer possible.
            </li>
          </ul>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">
            5.2 Project management
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>
              5.2.1 Create project: admin sets name, type, status; optional
              description and team members; no dual role.
            </li>
            <li>
              5.2.2 Show all projects: admin overview with name, type, status,
              and team emails; filtering supported.
            </li>
            <li>
              5.2.3 Display own projects: user sees projects where they are
              manager or developer; filtering supported.
            </li>
            <li>
              5.2.4 Filter displayed projects: text filter by name, type, and
              team member emails.
            </li>
            <li>
              5.2.5 Display project details: show name, description, type,
              status, managers and developers; URLs are interactive.
            </li>
            <li>
              5.2.6 Change project data: managers can edit all project fields.
            </li>
            <li>5.2.7 Delete project: admin confirms and deletes.</li>
          </ul>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">
            5.3 Appointment management
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>
              5.3.1 Create appointment: managers and developers set name, type,
              start/end, and optional description.
            </li>
            <li>
              5.3.2 Display all appointments: list for project, sorted by start
              time.
            </li>
            <li>
              5.3.3 Add appointment to calendar: confirm transfer and store
              local calendar flag.
            </li>
            <li>
              5.3.4 Change appointment data: managers and developers edit
              appointments.
            </li>
            <li>5.3.5 Delete appointment: confirm and delete.</li>
          </ul>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">5.4 Commenting</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>
              5.4.1 Write public comment: managers and developers add public
              comments.
            </li>
            <li>
              5.4.2 Write private comment: managers and developers add private
              comments.
            </li>
            <li>
              5.4.3 Display all comments of a project: admin and managers see
              chronological comments with filters.
            </li>
            <li>
              5.4.4 Display public comments: show public comments in
              chronological order.
            </li>
            <li>
              5.4.5 Filter displayed comments: show all, public only, or private
              only.
            </li>
            <li>
              5.4.6 Change own comment: author edits text and visibility.
            </li>
            <li>5.4.7 Delete comment: author confirms deletion.</li>
            <li>
              5.4.8 Analyze comments: managers request AI analysis (summary,
              issue prediction, deadline risk).
            </li>
          </ul>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">5.5 Settings</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>
              5.5.1 Change connection interrupt period: view and update interval
              in seconds.
            </li>
          </ul>
        </section>

        <section className="glass-card card-hover p-6">
          <h3 className="text-base font-semibold text-white">
            6. Non-functional requirements
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>
              6.1 Reliability: detect connection interruptions at configurable
              intervals and prevent data loss.
            </li>
            <li>
              6.2 Feedback: clear status and actionable error messages.
            </li>
            <li>
              6.3 UI: intuitive interface based on established patterns.
            </li>
          </ul>
        </section>

        <section className="glass-card p-6">
          <h3 className="text-base font-semibold text-white">7. Glossary</h3>
          <p className="mt-2 text-sm text-zinc-400">None</p>
        </section>

        <section className="glass-card p-6">
          <h3 className="text-base font-semibold text-white">8. References</h3>
          <p className="mt-2 text-sm text-zinc-400">None</p>
        </section>
      </div>
    </main>
  );
}
