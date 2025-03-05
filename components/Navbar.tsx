'use client'

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-purple-600 font-bold text-xl">
              Negotron
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-600 hover:text-purple-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/features" className="text-purple-600 hover:text-purple-800">
              Features
            </Link>
            <Link href="/solutions" className="text-purple-600 hover:text-purple-800">
              Solutions
            </Link>
            <Link href="/docs" className="text-purple-600 hover:text-purple-800">
              Docs
            </Link>
            <Link href="/pricing" className="text-purple-600 hover:text-purple-800">
              Pricing
            </Link>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-800">
              Start Demo
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/features" className="block text-purple-600 hover:text-purple-800">
              Features
            </Link>
            <Link href="/solutions" className="block text-purple-600 hover:text-purple-800">
              Solutions
            </Link>
            <Link href="/docs" className="block text-purple-600 hover:text-purple-800">
              Docs
            </Link>
            <Link href="/pricing" className="block text-purple-600 hover:text-purple-800">
              Pricing
            </Link>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-800">
              Start Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;