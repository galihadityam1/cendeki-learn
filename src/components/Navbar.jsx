"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar({ className }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cookies = new Cookies();
  const router = useRouter();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Close mobile menu when switching to desktop
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function handleCategory() {
    let data = cookies.get("Authorization");
    setIsMobileMenuOpen(false); // Close mobile menu
    if (!data) {
      return router.push("/login");
    }
    return router.push("/lobby");
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    {
      label: "Category",
      onClick: handleCategory,
      isButton: true
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
      isButton: false
    },
    {
      label: "About Us",
      href: "/#about",
      isButton: false
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <nav
        className={cn(
          "sticky top-0 z-[9999] mx-auto my-6 sm:my-8 lg:my-12 flex h-16 sm:h-20 lg:h-24 max-w-[95dvw] sm:max-w-[90dvw] lg:max-w-[80dvw] items-center justify-between bg-white rounded-lg px-4 sm:px-6 lg:px-8",
          className,
        )}
      >
        {/* Logo */}
        <Link href="/" className="text-primary flex items-center gap-2 flex-shrink-0">
          <img src="/logo.png" className="size-8 sm:size-10 lg:size-12" alt="Logo" />
          <h1 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
            <span className="hidden sm:inline">Cendeki App</span>
            <span className="sm:hidden">Cendeki</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row items-center">
          {navLinks.map((link, index) => (
            link.isButton ? (
              <button
                key={index}
                onClick={link.onClick}
                className="border-primary text-primary px-3 lg:px-4 pb-2 lg:pb-3 text-base lg:text-lg font-bold hover:border-b-4 transition-all duration-200 hover:text-blue-700"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={index}
                href={link.href}
                className="border-primary text-primary px-3 lg:px-4 pb-2 lg:pb-3 text-base lg:text-lg font-bold hover:border-b-4 transition-all duration-200 hover:text-blue-700"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-primary hover:bg-blue-50 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <div
          className={`
            absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 md:hidden
            transition-all duration-300 ease-in-out origin-top
            ${isMobileMenuOpen 
              ? 'opacity-100 scale-y-100 translate-y-0 visible' 
              : 'opacity-0 scale-y-95 -translate-y-2 invisible'
            }
          `}
        >
          <div className="py-4 px-2">
            {navLinks.map((link, index) => (
              <div key={index} className="w-full">
                {link.isButton ? (
                  <button
                    onClick={link.onClick}
                    className="w-full text-left px-4 py-3 text-primary font-semibold hover:bg-blue-50 rounded-lg transition-colors text-base"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-3 text-primary font-semibold hover:bg-blue-50 rounded-lg transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}