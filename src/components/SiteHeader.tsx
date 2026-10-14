"use client";

import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import "./site-shell.css";

type MenuName = "Shop" | "Learn" | "About";
const menuContent: Record<MenuName, { title: string; links: string[] }[]> = {
  Shop: [
    { title: "Shop by use", links: ["Everyday typing", "Gaming", "Your first keyboard"] },
    { title: "Shop by size", links: ["Full size", "Tenkeyless", "Compact"] },
    { title: "Explore", links: ["Keyboards", "Switches", "Accessories"] },
  ],
  Learn: [
    { title: "Getting started", links: ["Guides", "Find your layout", "Keyboard basics"] },
    { title: "Switches and sound", links: ["Switches 101", "Hear the difference", "Glossary"] },
    { title: "Care and setup", links: ["Build your setup", "Keyboard care", "Browse articles"] },
  ],
  About: [{ title: "About Kliks", links: ["Our Story", "Sustainability", "FAQ", "Contact"] }],
};
const destination = (label: string) => label === "Guides" || label === "Browse articles" ? "/learn" : label === "Switches 101" ? "/learn/switches" : label === "Hear the difference" ? "/#hear-the-difference" : `/coming-soon?from=${encodeURIComponent(label)}`;
function Icon({ name }: { name: string }) { return <img className="site-ui-icon" src={`/icons/${name}.svg`} alt="" />; }

export default function SiteHeader() {
  const [menu, setMenu] = useState<MenuName | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuName | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("kliks-cart-v1") || "[]") as { quantity?: number }[];
        setCartCount(cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0));
      } catch { setCartCount(0); }
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("kliks-cart-updated", update);
    return () => { window.removeEventListener("storage", update); window.removeEventListener("kliks-cart-updated", update); };
  }, []);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setMenu(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenu(null); setMobileOpen(false); setMobileSection(null); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    mobileCloseRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);
  const closeAll = () => { setMenu(null); setMobileOpen(false); setMobileSection(null); };
  return <header className="site-header" ref={headerRef}>
    <div className="site-header-inner">
      <Logo className="site-header-logo" onClick={closeAll} />
      <nav className="site-nav" aria-label="Main navigation">
        {(["Shop", "Learn", "About"] as MenuName[]).map(name => <button key={name} className={menu === name ? "site-nav-trigger is-active" : "site-nav-trigger"} type="button" aria-expanded={menu === name} aria-controls={`site-menu-${name.toLowerCase()}`} onClick={() => setMenu(menu === name ? null : name)}>{name}<Icon name="chevron-down" /></button>)}
      </nav>
      <div className="site-header-actions">
        <Button variant="nav" className="site-find" href="/coming-soon?from=Find%20Your%20Keyboard" onClick={closeAll}>Find your keyboard</Button>
        <Link className="site-icon-link site-search" href="/coming-soon?from=Search" aria-label="Search coming soon" onClick={closeAll}><Icon name="search" /></Link>
        <Link className="site-icon-link site-user" href="/coming-soon?from=Account" aria-label="Account coming soon" onClick={closeAll}><Icon name="user" /></Link>
        <Link className="site-icon-link site-cart" href="/checkout" aria-label={`Checkout, ${cartCount} items`} onClick={closeAll}><Icon name="shopping-bag" />{cartCount > 0 && <span className="site-cart-count">{cartCount}</span>}</Link>
        <button className="site-menu-toggle" type="button" aria-label="Open menu" aria-expanded={mobileOpen} aria-controls="site-mobile-menu" onClick={() => { setMobileOpen(true); setMobileSection(null); }}><Icon name="menu" /></button>
      </div>
    </div>
    {(["Shop", "Learn", "About"] as MenuName[]).map(name => <div id={`site-menu-${name.toLowerCase()}`} key={name} className={`site-menu-panel ${name === "About" ? "is-compact" : ""} ${menu === name ? "is-open" : ""}`} aria-hidden={menu !== name} inert={menu !== name}>
      <div className="site-menu-content">
        {menuContent[name].map(group => <div className="site-menu-group" key={group.title}><h2>{group.title}</h2>{group.links.map(label => <Link key={label} href={destination(label)} onClick={closeAll}>{label}<Icon name="arrow-forward" /></Link>)}</div>)}
        {name !== "About" && <div className="site-menu-feature"><span>{name === "Shop" ? "A keyboard that fits you" : "New to mechanical keyboards?"}</span><p>{name === "Shop" ? "Explore the feel, sound, and size that make every click yours." : "Start with the basics and find your favorite feel."}</p><Link href={name === "Shop" ? "/coming-soon?from=Find%20Your%20Keyboard" : "/learn"} onClick={closeAll}>{name === "Shop" ? "Find your keyboard" : "Explore Learn"}<Icon name="arrow-forward" /></Link></div>}
      </div>
    </div>)}
    {mobileOpen && <div className="site-mobile-backdrop" onPointerDown={(event) => { if (event.target === event.currentTarget) closeAll(); }}><div className="site-mobile-panel" id="site-mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="site-mobile-panel-head">{mobileSection ? <button className="site-mobile-back" type="button" onClick={() => setMobileSection(null)}><img src="/icons/chevron-left.svg" alt="" /> Back</button> : <strong>Menu</strong>}<button ref={mobileCloseRef} className="site-mobile-close" type="button" aria-label="Close menu" onClick={closeAll}><Icon name="close" /></button></div>
      <div className="site-mobile-panel-body">{mobileSection ? <><h2>{mobileSection}</h2>{menuContent[mobileSection].map(group => <div className="site-mobile-group" key={group.title}><h3>{group.title}</h3>{group.links.map(label => <Link key={label} href={destination(label)} onClick={closeAll}>{label}<Icon name="chevron-right" /></Link>)}</div>)}</> : <><nav aria-label="Mobile navigation">{(["Shop", "Learn", "About"] as MenuName[]).map(name => <button className="site-mobile-row" type="button" key={name} onClick={() => setMobileSection(name)}>{name}<Icon name="chevron-right" /></button>)}</nav><Link className="site-mobile-row site-mobile-find" href="/coming-soon?from=Find%20Your%20Keyboard" onClick={closeAll}>Find Your Keyboard<Icon name="chevron-right" /></Link><Link className="site-mobile-row" href="/coming-soon?from=Search" onClick={closeAll}>Search</Link><Link className="site-mobile-row" href="/coming-soon?from=Account" onClick={closeAll}>Account</Link><Link className="site-mobile-row" href="/checkout" onClick={closeAll}>Cart</Link></>}</div>
    </div></div>}
  </header>;
}
