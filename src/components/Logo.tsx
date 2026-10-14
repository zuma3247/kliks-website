import Link from "next/link";
import "./logo.css";

type LogoProps = {
  className?: string;
  /** Hide the "Kliks" wordmark and show only the key mark (Figma mobile nav). */
  markOnly?: boolean;
  onClick?: () => void;
};

// Figma: Kliks logo. Mark 45.5px; wordmark at its natural 54x19.3px, 10px from the mark.
export default function Logo({ className, markOnly, onClick }: LogoProps) {
  return (
    <Link className={["kliks-logo", markOnly && "kliks-logo--mark", className].filter(Boolean).join(" ")} href="/" aria-label="Kliks Home" onClick={onClick}>
      <img className="kliks-logo-mark" src="/images/kliks-mark.svg" alt="" width={45.5} height={45.5} />
      <img className="kliks-logo-word" src="/images/kliks-logotype.svg" alt="" width={54} height={19.3} />
    </Link>
  );
}
