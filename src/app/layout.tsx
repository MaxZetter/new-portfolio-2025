// src/app/layout.tsx
import "./globals.css";
import Header from '../components/Header';
import { Pirata_One } from 'next/font/google';
import SplineBackground from "../components/SplineBackground";
import { Suspense } from 'react';

const pirata = Pirata_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pirata-one',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pirata.className}>
      <body className="bg-black">
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>}>
          <SplineBackground />
        </Suspense>
        <Header />
        <main className="relative z-0">{children}</main>
      </body>
    </html>
  );
}