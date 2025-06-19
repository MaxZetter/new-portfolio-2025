// src/app/layout.tsx
import "./globals.css";
import Header from '../components/Header';
import { Lora } from 'next/font/google';
import SplineBackground from "../components/SplineBackground";
import { Suspense } from 'react';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'], // Normal and bold weights
  variable: '--font-lora',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lora.className}>
      <body className="bg-black">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        }>
          <SplineBackground />
        </Suspense>
        <Header />
        <main className="relative z-0">{children}</main>
      </body>
    </html>
  );
}