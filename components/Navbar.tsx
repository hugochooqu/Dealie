"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-between h-14 bg-slate-900 rounded-4xl px-3 lg:px-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-primary-200 font-bold text-xl">
              <Image
                src="/NEGOAI.png"
                alt="negotron logo"
                width={60}
                height={40}
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="flex items-center space-x-6">
            <button className="bg-gradient-to-r from-primary-200 via-primary-200 to-primary-100 bg-clip-text text-transparent font-semibold text-base lg:text-lg px-1 md:px-4 py-2 rounded-md ">
              Request a Demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
