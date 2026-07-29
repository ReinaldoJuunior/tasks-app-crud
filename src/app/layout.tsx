import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tasks APP CRUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="">
        <header className="fixed top-0 right-0 left-0 p-2 border-b text-center shadow-xl">
          <Link className="font-bold" href="/">
          Tasks App
          </Link>
        </header>
        
        <main className="mt-24 mb-14 flex justify-center">{children}</main>

        <footer className="text-center">
          <p className="text-sm">Projeto do curso Fundamentos front-end React</p>
          <p className="text-xs">2026</p>
        </footer>
        </body>
    </html>
  );
}
