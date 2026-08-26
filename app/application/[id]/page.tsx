import Link from "next/link";
import { notFound } from "next/navigation";

type TimelineState = "complete" | "current" | "upcoming";

type Application = {
  service: string;
  applicant: string;
  updated: string;
  status: string;
  statusTone: "progress" | "action-required" | "issued";
  timeline: { label: string; state: TimelineState; note?: string }[];
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
    statusTone: "progress",
    timeline: [
      { label: "Application submitted", state: "complete" },
      { label: "Documents received", state: "complete" },
      { label: "Documents verified", state: "complete" },
      { label: "Department verification", state: "current", note: "In progress" },
      { label: "Officer review", state: "upcoming" },
      { label: "Certificate issued", state: "upcoming" },
    ],
    meaning: "Your application has been received and is currently being reviewed by the concerned department.",
    action: "No action required right now.",
    actionDetail: "We’ll let you know if anything is needed.",
    next: "After department verification, your application will move to officer review before the certificate is issued.",
  },
  "MSV-DEMO-2048": {
    service: "Caste Certificate",
    applicant: "Arjun Kumar",
    updated: "26 August 2026, 2:15 PM",
    status: "Action required",
    statusTone: "action-required",
    timeline: [
      { label: "Application submitted", state: "complete" },
      { label: "Documents received", state: "complete" },
      { label: "Documents verified", state: "upcoming", note: "Action required" },
      { label: "Department verification", state: "upcoming" },
      { label: "Officer review", state: "upcoming" },
      { label: "Certificate issued", state: "upcoming" },
    ],
    meaning: "One of your supporting documents is not clear enough for the department to verify your application.",
    action: "Upload a clearer supporting document.",
    actionDetail: "Please upload a clear, readable copy so verification can continue.",
    next: "Once the clearer document is uploaded, the department will verify it and move your application to officer review.",
  },
  "MSV-DEMO-3072": {
    service: "Residence Certificate",
    applicant: "Fatima Begum",
    updated: "26 August 2026, 11:00 AM",
    status: "Certificate issued",
    statusTone: "issued",
    timeline: [
      { label: "Application submitted", state: "complete" },
      { label: "Documents received", state: "complete" },
      { label: "Documents verified", state: "complete" },
      { label: "Department verification", state: "complete" },
      { label: "Officer review", state: "complete" },
      { label: "Certificate issued", state: "complete", note: "Complete" },
    ],
    meaning: "Your application has been approved and your Residence Certificate is ready.",
    action: "Your certificate is ready.",
    actionDetail: "You can now download it or collect it from your MeeSeva centre.",
    next: "Your application journey is complete. Keep your certificate in a safe place for future use.",
  },
};

export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = rawId.toUpperCase();
  const application = applications[id];
  if (!application) notFound();

  return (
    <main className="dashboard-shell">
      <header className="site-header dashboard-header">
        <Link className="brand" href="/"><span className="brand-mark">S</span><span>SevaGuide</span></Link>
        <Link className="back-link" href="/">← Look up another application</Link>
      </header>
      <div className="prototype-notice compact"><strong>Prototype demo</strong><span>This experience uses representative application data and simulated status progression. It is not connected to the MeeSeva backend.</span></div>
      <section className="dashboard-heading">
        <div>
          <p className="eyebrow">Application overview</p>
          <h1>{application.service}</h1>
          <p className="application-id">Application ID <strong>{id}</strong></p>
        </div>
        <div className={`status-pill ${application.statusTone}`}><span className="pulse-dot" />{application.status}</div>
      </section>

      <div className="dashboard-grid">
        <section className="card journey-card">
          <div className="section-heading"><div><p className="eyebrow">Your journey</p><h2>Where your application is</h2></div><p className="updated">Last updated<br /><strong>{application.updated}</strong></p></div>
          <ol className="timeline">
            {application.timeline.map(({ label, state, note }) => <li className={state} key={label}><span className="timeline-marker">{state === "complete" ? "✓" : state === "current" ? "●" : "○"}</span><span>{label}</span>{note && <small>{note}</small>}</li>)}
          </ol>
        </section>
        <aside className="card details-card">
          <p className="eyebrow">Application details</p>
          <dl><div><dt>Applicant</dt><dd>{application.applicant}</dd></div><div><dt>Service</dt><dd>{application.service}</dd></div><div><dt>Current status</dt><dd>{application.status}</dd></div></dl>
        </aside>
      </div>

      <section className="guidance-grid" aria-label="Application guidance">
        <article className="guidance-card meaning"><p className="card-icon">◎</p><h2>What does this mean?</h2><p>{application.meaning}</p></article>
        <article className="guidance-card action"><p className="card-icon">✓</p><h2>What should I do?</h2><p><strong>{application.action}</strong></p><p className="muted">{application.actionDetail}</p></article>
        <article className="guidance-card next"><p className="card-icon">→</p><h2>What happens next?</h2><p>{application.next}</p></article>
      </section>
      <p className="support-note">Need help with your application? Please contact your nearest MeeSeva centre for official assistance.</p>
    </main>
  );
}
