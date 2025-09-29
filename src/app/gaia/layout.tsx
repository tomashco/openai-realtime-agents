import type { Metadata } from "next";
import "../globals.css";
import s from "./layout.module.css";
import "../lib/envSetup";
// import classNames from "classnames";

export const metadata: Metadata = {
  title: "Realtime API Agents",
  description: "A demo app from OpenAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className={s.page}>{children}</div>
      </body>
    </html>
  );
}
