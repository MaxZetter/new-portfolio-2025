// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-transparent black shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/">
        <img src="/emblem.png" alt="Emblem" className="h-10" />
      </Link>

      <nav>
      <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`px-4 py-2 rounded-md border border-gray-300 text-yellow-300 hover:bg-blue-100 hover:text-blue-600 transition-colors ${
                  pathname === item.path
                    ? 'bg-blue-600 text-yellow-300 border-blue-600 font-bold'
                    : 'bg-transparent'
                }`}
                aria-current={pathname === item.path ? 'page' : undefined}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}