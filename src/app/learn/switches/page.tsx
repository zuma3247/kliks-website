import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "../learn.css";
import "./switch-guide.css";

export const metadata: Metadata = {
  title: "Switches, made simple | Kliks",
  description: "A visual beginner's guide to linear, tactile, and clicky mechanical keyboard switches.",
};

const base = "/learn/switch-guide";

const steps = [
  { title: "Press a key", copy: "Your finger pushes the keycap and the stem underneath it down." },
  { title: "Close the circuit", copy: "Two metal contacts inside the switch touch." },
  { title: "Send the letter", copy: "The keyboard notices the press and types the letter." },
];

const feels = [
  { name: "Linear", className: "linear", description: "Smooth from top to bottom. No bump, no click.", goodFor: "Fast typing and gaming", alt: "A smooth line that rises steadily with no bump." },
  { name: "Tactile", className: "tactile", description: "A small bump tells you the key has registered.", goodFor: "Everyday typing", alt: "A line that rises to a small bump partway down, then continues." },
  { name: "Clicky", className: "clicky", description: "A bump plus a sharp click you can hear.", goodFor: "Hearing each press, away from shared rooms", alt: "A line with a sharp peak and click marks partway down." },
];

const parts = [
  { name: "Housing", copy: "The outer shell that holds everything together." },
  { name: "Stem", copy: "The part your keycap sits on. Its shape sets the feel." },
  { name: "Spring", copy: "Pushes the key back up. A stiffer spring feels heavier." },
  { name: "Contact", copy: "Two metal leaves that touch to register the press." },
];

const choices = [
  { name: "Linear", className: "linear", want: "Smooth", sound: "Quiet", goodFor: "Fast typing and gaming" },
  { name: "Tactile", className: "tactile", want: "A noticeable bump", sound: "Soft", goodFor: "Everyday typing" },
  { name: "Clicky", className: "clicky", want: "An audible click", sound: "Loud", goodFor: "Hearing each press" },
];

export default function SwitchGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="learn-page switch-guide">
        <section className="learn-hero" aria-labelledby="switch-guide-title">
          <div className="learn-container learn-hero-inner">
            <div className="learn-hero-copy">
              <h1 id="switch-guide-title">Switches, made simple.</h1>
              <p>The switch under each key decides how typing feels and sounds. Here&apos;s what to know before you pick one.</p>
            </div>
            <img className="learn-hero-image" src="/learn/guide-switches.webp" alt="Close up of mechanical keyboard switches" />
          </div>
        </section>

        <section className="sg-section" aria-labelledby="what-it-does-title">
          <div className="learn-container">
            <div className="learn-section-heading">
              <h2 id="what-it-does-title">What a switch does</h2>
              <p>Every key sits on its own small switch. Pressing the key is what tells the keyboard to type.</p>
            </div>
            <figure className="sg-figure sg-overview">
              <picture>
                <source media="(max-width: 767px)" srcSet={`${base}/how-it-works-vertical.svg`} />
                <img src={`${base}/how-it-works.svg`} alt="A keycap is pressed down, the contacts inside the switch touch, and the letter K appears on a screen." />
              </picture>
            </figure>
            <ol className="sg-steps">
              {steps.map((step, index) => <li key={step.title}><h3>{index + 1}. {step.title}</h3><p>{step.copy}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="sg-section sg-tint" aria-labelledby="three-feels-title">
          <div className="learn-container">
            <div className="learn-section-heading">
              <h2 id="three-feels-title">Three feels</h2>
              <p>Each line shows how a key feels as you press it down. A bump in the line is a bump you can feel.</p>
            </div>
            <div className="sg-feel-grid">
              {feels.map((feel) => (
                <article className={`sg-feel-card ${feel.className}`} key={feel.name}>
                  <h3>{feel.name}</h3>
                  <p>{feel.description}</p>
                  <figure className="sg-figure"><img src={`${base}/${feel.className}.svg`} alt={feel.alt} /></figure>
                  <p className="sg-good-for"><strong>Good for:</strong> {feel.goodFor}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sg-section" aria-labelledby="inside-title">
          <div className="learn-container">
            <div className="learn-section-heading">
              <h2 id="inside-title">What&apos;s inside a switch</h2>
              <p>Four small parts work together every time you press a key.</p>
            </div>
            <div className="sg-anatomy">
              <figure className="sg-figure">
                <img src={`${base}/anatomy.svg`} alt="A switch taken apart into four numbered parts: 1 housing, 2 stem, 3 spring, 4 contact." />
              </figure>
              <ol className="sg-parts">
                {parts.map((part, index) => (
                  <li key={part.name}>
                    <span className="sg-part-number" aria-hidden="true">{index + 1}</span>
                    <div><h3>{part.name}</h3><p>{part.copy}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="sg-section sg-soft" aria-labelledby="choose-title">
          <div className="learn-container">
            <div className="learn-section-heading">
              <h2 id="choose-title">Choose by preference</h2>
              <p>Start with what you want to feel. You can always try a few switches before you decide.</p>
            </div>
            <table className="sg-table">
              <thead><tr><th scope="col">If you want</th><th scope="col">Pick</th><th scope="col">Sound</th><th scope="col">Good for</th></tr></thead>
              <tbody>
                {choices.map((choice) => (
                  <tr key={choice.name}>
                    <td className="sg-want">{choice.want}</td>
                    <th scope="row" className={choice.className}>{choice.name}</th>
                    <td data-label="Sound">{choice.sound}</td>
                    <td data-label="Good for">{choice.goodFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="learn-finder" aria-labelledby="switch-guide-finder-title">
          <div className="learn-container learn-finder-inner">
            <div className="learn-finder-copy">
              <h2 id="switch-guide-finder-title">Ready to find your fit?</h2>
              <p>Answer a few quick questions and we’ll recommend a keyboard that feels right for you.</p>
              <a href="/coming-soon?from=find-your-keyboard" className="learn-finder-link">Find my keyboard</a>
            </div>
            <img src="/learn/guide-sound.webp" alt="Close up of mechanical keyboard switches" loading="lazy" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
