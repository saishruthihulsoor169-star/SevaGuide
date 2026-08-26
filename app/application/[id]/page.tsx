import Link from "next/link";
import { notFound } from "next/navigation";

type TimelineState = "complete" | "current" | "upcoming";

type TimelineItem = {
  label: string;
  state: TimelineState;
  note?: string;
};

type Application = {
  service: string;
  applicant: string;
  updated: string;
  status: string;
  timeline: TimelineItem[];
  meaning: string;
  action: string;
  actionDetail: string;
  next: string;
};

const applications: Record<string, Application> = {
  "MSV-DEMO-1024": {
    service: "Income Certificate",
    applicant: "Priya Sharma",
    updated: "26 August 2026, 10:30 AM",
    status: "Verification in progress",
    timeline: [
      { label: "Application submitted", state: "complete" },
      { label: "Documents received", state: "complete" },
      { label: "Documents verified", state: "complete" },
      {
        label: "Department verification",
        state: "current",
        note: "In progress",
      },
      { label: "Officer review", state: "upcoming" },
      { label: "Certificate issued", state: "upcoming" },
    ],
    meaning:
      "Your application has been received and is currently being verified by the concerned department.",
    action: "No action required right now.",
    actionDetail: "We’ll let you know if anything is needed.",
    next:
      "After department verification, your application will move to officer review before the certificate is issued.",
  },

  "MSV-DEMO-2048": {
    service: "Caste Certificate",
    applicant: "Arjun Kumar",
    updated: "26 August 2026, 2:15 PM",
    status: "Action required",
    timeline: [
      { label: "Application submitted", state: "complete" },
      { label: "Documents received", state: "complete" },
      {
        label: "Documents verified",
        state: "current",
        note: "Action required",
      },
      { label: "Department verification", state: "upcoming" },
      { label: "Officer review", state: "upcoming" },
      { label: "Certificate issued", state: "upcoming" },
    ],
    meaning:
      "One of your supporting documents is unclear or incomplete, so the department cannot continue verification yet.",
    action: "Please upload a clearer copy of the required document.",
    actionDetail:
      "Make sure the document is complete, readable, and clearly visible before uploading it again.",
    next:
      "Once the document is accepted, department verification can continue, followed by officer review and certificate issuance.",
  },

  "MSV-DEMO-3072": {
    service: "Residence Certificate",
    applicant: "Fatima Begum",
    updated: "26 August 2026, 11:00 AM",
    status: "Certificate issued",
    timeline: [
      { label: "Application submitted", state: "complete" },
      { label: "Documents received", state: "complete" },
      { label: "Documents verified", state: "complete" },
      { label: "Department verification", state: "complete" },
      { label: "Officer review", state: "complete" },
      { label: "Certificate issued", state: "complete" },
    ],
    meaning:
      "Your application has been approved and all verification steps have been completed.",
    action: "Your Residence Certificate has been issued.",
    actionDetail:
      "The certificate is ready and no further action is required from you.",
    next:
      "You can use your issued Residence Certificate for the relevant government service or requirement.",
  },
};

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = rawId.toUpperCase();

  const application = applications[id];

  if (!application) notFound();

  return (
    <main className="dashboard-shell">
      <header className="site-header dashboard-header">
        <Link className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>SevaGuide</span>
        </Link>

        <Link className="back-link" href="/">
          ← Look up another application
        </Link>
      </header>

      <div className="prototype-notice compact">
        <strong>Prototype demo</strong>
        <span>
          This experience uses representative application data and simulated
          status progression. It is not connected to the MeeSeva backend.
        </span>
      </div>

      <section className="dashboard-heading">
        <div>
          <p className="eyebrow">Application overview</p>

          <h1>{application.service}</h1>

          <p className="application-id">
            Application ID <strong>{id}</strong>
          </p>
        </div>

        <div className="status-pill">
          <span className="pulse-dot" />
          {application.status}
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="card journey-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your journey</p>
              <h2>Where your application is</h2>
            </div>

            <p className="updated">
              Last updated
              <br />
              <strong>{application.updated}</strong>
            </p>
          </div>

          <ol className="timeline">
            {application.timeline.map((item) => (
              <li className={item.state} key={item.label}>
                <span className="timeline-marker">
                  {item.state === "complete"
                    ? "✓"
                    : item.state === "current"
                      ? "●"
                      : "○"}
                </span>

                <span>{item.label}</span>

                {item.note && <small>{item.note}</small>}
              </li>
            ))}
          </ol>
        </section>

        <aside className="card details-card">
          <p className="eyebrow">Application details</p>

          <dl>
            <div>
              <dt>Applicant</dt>
              <dd>{application.applicant}</dd>
            </div>

            <div>
              <dt>Service</dt>
              <dd>{application.service}</dd>
            </div>

            <div>
              <dt>Current status</dt>
              <dd>{application.status}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <section
        className="guidance-grid"
        aria-label="Application guidance"
      >
        <article className="guidance-card meaning">
          <p className="card-icon">◎</p>

          <h2>What does this mean?</h2>

          <p>{application.meaning}</p>
        </article>

        <article className="guidance-card action">
          <p className="card-icon">
            {application.status === "Action required" ? "!" : "✓"}
          </p>

          <h2>What should I do?</h2>

          <p>
            <strong>{application.action}</strong>
          </p>

          <p className="muted">{application.actionDetail}</p>
        </article>

        <article className="guidance-card next">
          <p className="card-icon">→</p>

          <h2>What happens next?</h2>

          <p>{application.next}</p>
        </article>
      </section>

      <p className="support-note">
        Need help with your application? Please contact your nearest MeeSeva
        centre for official assistance.
      </p>
    </main>
  );
}
