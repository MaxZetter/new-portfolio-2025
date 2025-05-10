// src/components/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
] as const;

// Define prop types explicitly
interface NavItem {
  name: string;
  path: string;
}

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
}

interface MenuItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

// Component for individual nav buttons (large screens)
function NavButton({ item, isActive }: NavButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      buttonRef.current.style.setProperty('--mouse-x', `${x}%`);
      buttonRef.current.style.setProperty('--mouse-y', `${y}%`);
    }
  };

  return (
    <li>
      <Link
        href={item.path}
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        className={`px-4 py-2 rounded-md border border-gray-600 text-gray-300 text-xl transition-all duration-300 ${
          isActive
            ? 'bg-blue-600 text-yellow-300 border-blue-600 font-bold'
            : 'bg-gray-800 cursor-shimmer animate-shimmer hover:text-white hover:shadow-md'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.name}
      </Link>
    </li>
  );
}

// Component for dropdown menu items (small screens)
function MenuItem({ item, isActive, onClick }: MenuItemProps) {
  const menuItemRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (menuItemRef.current) {
      const rect = menuItemRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      menuItemRef.current.style.setProperty('--mouse-x', `${x}%`);
      menuItemRef.current.style.setProperty('--mouse-y', `${y}%`);
    }
  };

  return (
    <li>
      <Link
        href={item.path}
        ref={menuItemRef}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        className={`block px-4 py-2 text-gray-300 text-xl transition-all duration-300 ${
          isActive
            ? 'bg-blue-600 text-yellow-300 font-bold'
            : 'cursor-shimmer animate-shimmer hover:text-white hover:shadow-md'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.name}
      </Link>
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent shadow-md py-4 px-6 flex justify-between items-center z-10 font-pirata-one">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/placeholder_logo.jpg"
          alt="Logo"
          width={50}
          height={30}
          className="object-contain"
          priority
        />
      </Link>

      {/* Navigation (Desktop) and Hamburger (Mobile) */}
      <div className="flex items-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-5">
            {navItems.map((item) => (
              <NavButton key={item.path} item={item} isActive={pathname === item.path} />
            ))}
          </ul>
        </nav>

        {/* Hamburger Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-3 text-3xl text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 shadow-lg border border-gray-600 mt-2 rounded-md absolute left-0 right-0 mx-6">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <MenuItem
                key={item.path}
                item={item}
                isActive={pathname === item.path}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}