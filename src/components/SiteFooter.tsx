import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import "./site-shell.css";

const rows = [
  { title: "Shop", links: ["Keyboards", "Keycaps", "Switches", "Accessories", "New Arrivals", "Best Sellers"] },
  { title: "Learn", links: ["Guides", "Switches 101", "Layouts", "Build Your Setup", "Blog", "Glossary"] },
  { title: "About", links: ["Our Story", "Sustainability", "FAQ", "Contact"] },
];
const href = (label: string) => label === "Learn" || label === "Guides" ? "/learn" : label === "Switches 101" ? "/learn/switches" : `/coming-soon?from=${encodeURIComponent(label)}`;
export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer-main">
      <div className="site-footer-brand">
        <Logo />
        <p>Mechanical keyboards,<br/>made simple.</p>
      </div>
      <div className="site-footer-links">
        <Button variant="primary" icon="trailing" fullWidth className="site-footer-newsletter" href={href("Newsletter")}>Join our newsletter</Button>
        <div className="site-footer-link-groups">{rows.map(row => <div className="site-footer-row" key={row.title}><Link className="site-footer-key site-footer-key-category" href={href(row.title)}><span>{row.title}</span></Link>{row.links.map(label => <Link className="site-footer-key" href={href(label)} key={label}><span>{label}</span></Link>)}{row.title === "About" && <Link className="site-footer-key site-footer-key-newsletter" href={href("Newsletter")}><span>Join our newsletter <img src="/icons/arrow-forward.svg" alt="" /></span></Link>}</div>)}</div>
      </div>
      <div className="site-footer-service">{[["truck", "Shipping"], ["package", "Returns"], ["headset", "Support"]].map(([icon,label]) => <Link href={href(label)} key={label}><img src={`/icons/${icon}.svg`} alt=""/>{label}<img className="site-service-arrow" src="/icons/arrow-forward.svg" alt=""/></Link>)}</div>
    </div>
    <div className="site-footer-bottom"><div className="site-footer-social"><Link href={href("Discord")}>Discord</Link><Link href={href("YouTube")}>YouTube</Link><Link href={href("Instagram")}>Instagram</Link><Link href={href("X")}>X</Link></div><p>© 2026 KLIKS. All rights reserved.</p><div className="site-footer-legal"><Link href={href("Privacy Policy")}>Privacy Policy</Link><span aria-hidden="true">|</span><Link href={href("Terms of Service")}>Terms of Service</Link></div></div>
  </footer>;
}
