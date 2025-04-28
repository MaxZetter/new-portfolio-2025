// src/components/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
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
    <header className="bg-transparent shadow-md py-4 px-6 flex justify-between items-center font-pirata-one">
      {/* Emblem */}
      <Link href="/">
        <Image
          src="/images/placeholder_logo.jpg"
          alt="Logo"
          width={50} // Adjust based on your logo's aspect ratio
          height={30} // Matches h-10 (40px)
          className="object-contain"
          priority // Load eagerly for above-the-fold content
        />
      </Link>

      {/* Hamburger Icon */}
      <button
        className="md:hidden text-gray-300 hover:text-blue-400 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      {/* Navigation */}
      <nav className="relative">
        {/* Button List */}
        <ul className="hidden md:flex space-x-5">
          {navItems.map((item) => (
            <NavButton key={item.path} item={item} isActive={pathname === item.path} />
          ))}
        </ul>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <ul className="md:hidden absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md border border-gray-600 flex flex-col">
            {navItems.map((item) => (
              <MenuItem
                key={item.path}
                item={item}
                isActive={pathname === item.path}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}