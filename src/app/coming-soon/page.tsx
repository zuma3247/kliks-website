import Link from "next/link";
import Button from "@/components/Button";
import "./coming-soon.css";

export const metadata = { title: "Under construction | Kliks" };

export default function ComingSoon() {
  return (
    <main className="coming-page">
      <div className="coming-brand"><img src="/images/kliks-mark.svg" alt="" /><img src="/images/kliks-logotype.svg" alt="Kliks" /></div>
      <section className="coming-panel" aria-labelledby="coming-title">
        <div className="coming-key" aria-hidden="true">K</div>
        <p className="coming-eyebrow">Something good is clicking into place</p>
        <h1 id="coming-title">This page is under construction.</h1>
        <p>We’re still putting the finishing touches on this part of Kliks. Explore the pages that are ready in the meantime.</p>
        <div className="coming-actions">
          <Button variant="primary" icon="trailing" href="/">Back to Home</Button>
          <Button variant="secondary" size="large" href="/learn">Explore Learn</Button>
        </div>
      </section>
    </main>
  );
}
