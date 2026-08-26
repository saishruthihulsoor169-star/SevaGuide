"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const demoIds = ["MSV-DEMO-1024", "MSV-DEMO-2048", "MSV-DEMO-3072"];

export default function Home() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = applicationId.trim().toUpperCase();
    if (!demoIds.includes(id)) {
      setError("Enter one of the demo application numbers shown below.");
      return;
    }
    router.push(`/application/${id}`);
  }

  return (
    <main className="landing-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="SevaGuide home"><span className="brand-mark">S</span><span>SevaGuide</span></a>
        <span className="header-label">A clearer path through public services</span>
      </header>
      <section className="hero" id="top">
        <p className="eyebrow">Application status, made clear</p>
        <h1>Don&apos;t just check your status. <em>Understand it.</em></h1>
        <p className="hero-copy">See what&apos;s happening, what comes next, and whether you need to take action.</p>
        <form className="lookup-card" onSubmit={submit} noValidate>
          <label htmlFor="application-number">Application number</label>
          <div className="lookup-row">
            <input id="application-number" value={applicationId} onChange={(event) => { setApplicationId(event.target.value); setError(""); }} placeholder="Enter your application number" autoCapitalize="characters" aria-describedby={error ? "lookup-error" : "demo-hint"} />
            <button type="submit">Understand my application <span aria-hidden="true">→</span></button>
          </div>
          {error ? <p className="field-error" id="lookup-error" role="alert">{error}</p> : <p className="demo-hint" id="demo-hint">Try a demo: {demoIds.join(" · ")}</p>}
        </form>
      </section>
      <section className="landing-points" aria-label="How SevaGuide helps">
        <article><span>01</span><h2>Plain language</h2><p>Clear explanations for every stage of your application.</p></article>
        <article><span>02</span><h2>Know your next step</h2><p>Understand what happens next and when to act.</p></article>
        <article><span>03</span><h2>Stay informed</h2><p>Follow progress without decoding government jargon.</p></article>
      </section>
      <footer className="prototype-notice"><strong>Prototype demo</strong><span>This experience uses representative application data and simulated status progression. It is not connected to the MeeSeva backend.</span></footer>
    </main>
  );
}
