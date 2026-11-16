import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drive Harbor — Multi-account Drive storage",
  description: "One calm view of every Google Drive account and its storage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
