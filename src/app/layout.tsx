import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kliks — Find a keyboard you'll love clicking",
  description: "Explore keyboard sounds, feel, layouts, and a demo shopping experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
