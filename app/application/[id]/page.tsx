import Link from "next/link";
import { notFound } from "next/navigation";

const applications = {
  "MSV-DEMO-1024": {
    service: "Income Certificate",
    applicant: "Priya Sharma",
    updated: "26 August 2026, 10:30 AM",
    status: "Verification in progress",
  },
  "MSV-DEMO-2048": { service: "Income Certificate", applicant: "Arjun Kumar", updated: "25 August 2026, 2:15 PM", status: "Verification in progress" },
  "MSV-DEMO-3072": { service: "Income Certificate", applicant: "Fatima Begum", updated: "24 August 2026, 11:00 AM", status: "Verification in progress" },
} as const;

const timeline = [
  ["Application submitted", "complete"],
  ["Documents received", "complete"],
  ["Documents verified", "complete"],
  ["Department verification", "current"],
  ["Officer review", "upcoming"],
  ["Certificate issued", "upcoming"],
] as const;

export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = rawId.toUpperCase();
  const application = applications[id as keyof typeof applications];
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
        <div className="status-pill"><span className="pulse-dot" />{application.status}</div>
      </section>

      <div className="dashboard-grid">
        <section className="card journey-card">
          <div className="section-heading"><div><p className="eyebrow">Your journey</p><h2>Where your application is</h2></div><p className="updated">Last updated<br /><strong>{application.updated}</strong></p></div>
          <ol className="timeline">
            {timeline.map(([label, state], index) => <li className={state} key={label}><span className="timeline-marker">{state === "complete" ? "✓" : state === "current" ? "●" : "○"}</span><span>{label}</span>{index === 3 && <small>In progress</small>}</li>)}
          </ol>
        </section>
        <aside className="card details-card">
          <p className="eyebrow">Application details</p>
          <dl><div><dt>Applicant</dt><dd>{application.applicant}</dd></div><div><dt>Service</dt><dd>{application.service}</dd></div><div><dt>Current status</dt><dd>{application.status}</dd></div></dl>
        </aside>
      </div>

      <section className="guidance-grid" aria-label="Application guidance">
        <article className="guidance-card meaning"><p className="card-icon">◎</p><h2>What does this mean?</h2><p>Your application has been received and is currently being reviewed by the concerned department.</p></article>
        <article className="guidance-card action"><p className="card-icon">✓</p><h2>What should I do?</h2><p><strong>No action required right now.</strong></p><p className="muted">We&apos;ll let you know if anything is needed.</p></article>
        <article className="guidance-card next"><p className="card-icon">→</p><h2>What happens next?</h2><p>After department verification, your application will move to officer review before the certificate is issued.</p></article>
      </section>
      <p className="support-note">Need help with your application? Please contact your nearest MeeSeva centre for official assistance.</p>
    </main>
  );
}
