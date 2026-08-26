import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">Application not found</p><h1>We couldn&apos;t find that demo application.</h1><p>Try one of the application numbers listed on the lookup page.</p><Link href="/">Back to application lookup</Link></main>;
}
