"use client";

import { useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/Button";
import CarouselArrows from "@/components/CarouselArrows";
import "./learn.css";

const guides = [
  { category: "LAYOUTS & SIZES", title: "Keyboard sizes explained", summary: "From 60% to full size, find a layout that fits your desk.", image: "/learn/guide-sizes.webp", slug: "keyboard-sizes-explained" },
  { category: "SWITCHES & SOUND", title: "Switch types, made simple", summary: "Linear, tactile, or clicky? Learn what changes the feel.", image: "/learn/guide-switches.webp", slug: "switch-types-made-simple" },
  { category: "GETTING STARTED", title: "Find your typing feel", summary: "Match your daily routine with keys that feel just right.", image: "/learn/guide-feel.webp", slug: "find-your-typing-feel" },
  { category: "CARE & SETUP", title: "Care for your keyboard", summary: "A simple cleaning routine for keys that feel fresh.", image: "/learn/guide-care.webp", slug: "care-for-your-keyboard" },
  { category: "CARE & SETUP", title: "Build a better workspace", summary: "Small setup changes can make long sessions easier.", image: "/learn/hero-workspace.webp", slug: "build-a-better-workspace" },
  { category: "SWITCHES & SOUND", title: "Hear the difference", summary: "Compare sound profiles and find a click that suits you.", image: "/learn/guide-sound.webp", slug: "hear-the-difference" },
];

const topics = [
  { title: "Switches & sound", summary: "Hear and feel the differences before you decide.", image: "/learn/guide-switches.webp", slug: "switches-and-sound" },
  { title: "Layouts & sizes", summary: "Compare familiar layouts and find the right footprint.", image: "/learn/topic-layouts.webp", slug: "layouts-and-sizes" },
  { title: "Care & setup", summary: "Keep your keyboard clean, comfortable, and ready.", image: "/learn/hero-workspace.webp", slug: "care-and-setup" },
];

function Arrow() {
  return <img className="learn-arrow" src="/learn/arrow-forward.svg" alt="" aria-hidden="true" />;
}

export default function LearnPage() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollGuides = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({ left: direction * 384, behavior: "smooth" });
  };

  return (
    <>
      <SiteHeader />
      <main className="learn-page">
        <section className="learn-hero" aria-labelledby="learn-heading">
          <div className="learn-container learn-hero-inner">
            <div className="learn-hero-copy">
              <h1 id="learn-heading">Know what makes your keyboard Klik.</h1>
              <p>Simple guides to switches, sound, layouts, and care—so you can choose with confidence.</p>
              <Button variant="primary" icon="trailing" href="#start-here" className="learn-keycap">Start with the basics</Button>
            </div>
            <div className="learn-hero-media">
              <p className="learn-hero-wordmark" aria-hidden="true">LEARN</p>
              <img className="learn-hero-image" src="/learn/hero-workspace.webp" alt="A compact mechanical keyboard in a laptop workspace" />
            </div>
          </div>
        </section>

        <section className="learn-guides" id="start-here" aria-labelledby="learn-guides-heading">
          <div className="learn-container">
            <div className="learn-section-heading">
              <h2 id="learn-guides-heading">Start here</h2>
              <p>New to mechanical keyboards? These guides will get you up to speed.</p>
            </div>
            <div className="learn-guide-track" ref={carouselRef}>
              {guides.map((guide) => (
                <a className="learn-guide-card" href={guide.slug === "switch-types-made-simple" ? "/learn/switches" : `/coming-soon?from=${guide.slug}`} key={guide.slug} aria-label={guide.slug === "switch-types-made-simple" ? `${guide.title} — read guide` : `${guide.title} — read guide (under construction)`}>
                  <img src={guide.image} alt="" loading="lazy" />
                  <span className="learn-card-copy">
                    <span className="learn-card-text">
                      <span className="learn-eyebrow">{guide.category}</span>
                      <strong>{guide.title}</strong>
                      <span className="learn-card-summary">{guide.summary}</span>
                    </span>
                    <span className="learn-card-action">Read guide <Arrow /></span>
                  </span>
                </a>
              ))}
            </div>
            <CarouselArrows className="learn-carousel-controls" previousLabel="Previous guides" nextLabel="Next guides" onPrevious={() => scrollGuides(-1)} onNext={() => scrollGuides(1)} />
          </div>
        </section>

        <section className="learn-topics" aria-labelledby="learn-topics-heading">
          <div className="learn-container">
            <div className="learn-section-heading">
              <h2 id="learn-topics-heading">Explore by curiosity</h2>
              <p>Dive into the topics that interest you most.</p>
            </div>
            <div className="learn-topic-grid">
              {topics.map((topic) => (
                <a className="learn-topic-card" href={topic.slug === "switches-and-sound" ? "/learn/switches" : `/coming-soon?from=${topic.slug}`} key={topic.slug} aria-label={topic.slug === "switches-and-sound" ? `${topic.title} — explore topic` : `${topic.title} — explore topic (under construction)`}>
                  <img src={topic.image} alt="" loading="lazy" />
                  <span className="learn-card-copy">
                    <span className="learn-card-text">
                      <span className="learn-eyebrow">LEARN A TOPIC</span>
                      <strong>{topic.title}</strong>
                      <span className="learn-card-summary">{topic.summary}</span>
                    </span>
                    <span className="learn-card-action">Explore <Arrow /></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="learn-finder" aria-labelledby="learn-finder-heading">
          <div className="learn-container learn-finder-inner">
            <div className="learn-finder-copy">
              <h2 id="learn-finder-heading">Ready to find your fit?</h2>
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
