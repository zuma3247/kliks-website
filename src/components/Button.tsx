import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import "./button.css";

// Figma: Button/Primary/Teal, Button/Secondary and Button/Primary/Nav CTA.
// Primary and nav are two-layer "keycaps" (plate over bevel); secondary is a flat outlined button.
type ButtonProps = {
  variant?: "primary" | "secondary" | "nav";
  /** Arrow before or after the label (Figma "Icon Position"). */
  icon?: "leading" | "trailing";
  /** Secondary only: 52px tall instead of the component's 44px (used beside primary CTAs). */
  size?: "default" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  /** Renders a link when set, otherwise a <button>. */
  href?: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  children: ReactNode;
};

export default function Button({ variant = "primary", icon, size = "default", fullWidth, disabled, href, type = "button", onClick, className, children }: ButtonProps) {
  const classes = ["kbtn", `kbtn--${variant}`, size === "large" && "kbtn--large", fullWidth && "kbtn--full", className].filter(Boolean).join(" ");
  const arrow = icon ? <img className="kbtn-icon" src="/icons/arrow-right.svg" alt="" aria-hidden="true" /> : null;
  const content = <>{icon === "leading" && arrow}<span className="kbtn-label">{children}</span>{icon === "trailing" && arrow}</>;
  const body = variant === "secondary" ? content : <span className="kbtn-plate">{content}</span>;

  if (href && !disabled) return <Link className={classes} href={href} onClick={onClick}>{body}</Link>;
  if (href) return <a className={classes} aria-disabled="true" role="link">{body}</a>;
  return <button className={classes} type={type} disabled={disabled} onClick={onClick}>{body}</button>;
}
