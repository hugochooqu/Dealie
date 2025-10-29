"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user } = useAuth();

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
                src="/dealie-icon.png"
                alt="dealie logo"
                width={60}
                height={40}
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="flex items-center space-x-6">
            {user ? (
              <Link
                href="/dashboard"
                className="flex text-white px-6 py-3 rounded-xl text-sm md:text-lg font-medium flex-row gap-2"
              >
                Go to Dashboard{" "}
                <FaArrowRight size={20} className="pt-1 text-sm animate-pulse" />
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="flex text-white px-6 py-3 rounded-xl text-sm md:text-lg font-medium flex-row gap-2"
              >
                Sign In <FaArrowRight size={20} className="pt-1 text-sm animate-pulse" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
