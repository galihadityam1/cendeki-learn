import Link from "next/link";
import React from "react";
import { FaGithub, FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";

export default function HeroFooter() {
  return (
    <div className="relative mt-24 w-full border-t border-slate-800 bg-slate-950/80 pb-8 pt-16 backdrop-blur-md">
      {/* Decorative gradient line at the top */}
      <div className="absolute left-1/2 top-0 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 md:px-8">
        <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand & Description */}
          <div className="flex max-w-sm flex-col items-center gap-4 text-center md:items-start md:text-left">
            <Link href="#" className="group flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-500/20 transition-transform group-hover:scale-105">
                <span className="text-2xl font-black text-white">C</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Cendekia
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Transforming education through interactive storytelling and
              gamified learning experiences.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-end">
            <Link
              href="/lobby"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-sky-400"
            >
              Categories
            </Link>
            <Link
              href="/leaderboard"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-sky-400"
            >
              Leaderboard
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-sky-400"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex w-full flex-col items-center justify-between gap-6 border-t border-slate-800/50 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Cendekia Learning Platform. All rights
            reserved.
          </p>

          <div className="flex gap-4">
            <Link
              href="#"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 transition-all hover:border-sky-500/30 hover:bg-sky-500/10"
            >
              <FaTwitter className="size-4 text-slate-400 transition-colors group-hover:text-sky-400" />
            </Link>
            <Link
              href="#"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/10"
            >
              <FaFacebookF className="size-4 text-slate-400 transition-colors group-hover:text-indigo-400" />
            </Link>
            <Link
              href="#"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 transition-all hover:border-pink-500/30 hover:bg-pink-500/10"
            >
              <FaInstagram className="size-4 text-slate-400 transition-colors group-hover:text-pink-400" />
            </Link>
            <Link
              href="#"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 transition-all hover:border-slate-600 hover:bg-slate-700"
            >
              <FaGithub className="size-4 text-slate-400 transition-colors group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
