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
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cookies = new Cookies();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (cookies.get("Authorization")) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
      isButton: true,
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
      isButton: false,
    },
    {
      label: "About Us",
      href: "/#about",
      isButton: false,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <nav
        className={cn(
          "fixed left-1/2 top-4 z-[9999] w-full max-w-[95dvw] -translate-x-1/2 transition-all duration-300 sm:max-w-[90dvw] lg:max-w-[80dvw]",
          scrolled ? "top-2" : "top-6",
          className,
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:h-20 sm:px-6 lg:px-8",
            scrolled
              ? "border-slate-700/50 bg-slate-900/80 shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-lg"
              : "border-slate-700/30 bg-slate-900/40 backdrop-blur-md",
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-shrink-0 items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-sky-500/20 transition-transform group-hover:scale-105 sm:h-12 sm:w-12">
              <img
                src="/logo.png"
                alt="Cendekia Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-sky-300 sm:text-2xl">
              <span className="hidden sm:inline">Cendekia</span>
              <span className="sm:hidden">Cendekia</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden flex-row items-center gap-2 md:flex lg:gap-4">
            {navLinks.map((link, index) =>
              link.isButton ? (
                <button
                  key={index}
                  onClick={link.onClick}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white lg:text-base"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={index}
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white lg:text-base"
                >
                  {link.label}
                </Link>
              ),
            )}

            {/* CTA Button */}
            {mounted && (
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    router.push("/profile/history");
                  } else {
                    router.push("/login");
                  }
                }}
                className="ml-4 rounded-xl bg-sky-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-400 hover:shadow-sky-400/40 lg:text-base"
              >
                {isLoggedIn ? "Profile" : "Get Started"}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="rounded-xl p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white md:hidden"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`
            absolute left-0 right-0 top-full mt-4 origin-top overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/95 shadow-2xl backdrop-blur-xl
            transition-all duration-300 ease-in-out md:hidden
            ${
              isMobileMenuOpen
                ? "visible translate-y-0 scale-y-100 opacity-100"
                : "invisible -translate-y-4 scale-y-95 opacity-0"
            }
          `}
        >
          <div className="flex flex-col gap-2 p-4">
            {navLinks.map((link, index) => (
              <div key={index} className="w-full">
                {link.isButton ? (
                  <button
                    onClick={link.onClick}
                    className="w-full rounded-xl px-4 py-3 text-left text-base font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block w-full rounded-xl px-4 py-3 text-base font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="my-2 h-px w-full bg-slate-800"></div>
            {mounted && (
              <button
                onClick={() => {
                  closeMobileMenu();
                  if (isLoggedIn) {
                    router.push("/profile/history");
                  } else {
                    router.push("/login");
                  }
                }}
                className="w-full rounded-xl bg-sky-500 px-4 py-3 text-center font-bold text-white transition-colors hover:bg-sky-400"
              >
                {isLoggedIn ? "Profile" : "Login"}
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
