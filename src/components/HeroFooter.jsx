import Link from "next/link";
import React from "react";
import {
  FaSquareGithub,
  FaSquareXTwitter,
  FaSquareFacebook,
  FaSquareInstagram,
} from "react-icons/fa6";

export default function HeroFooter() {
  return (
    <div className="mx-auto mb-8 sm:mb-12 md:mb-16 mt-16 sm:mt-24 md:mt-32 flex max-w-[95%] sm:max-w-[85%] md:max-w-[70%] items-center justify-between flex-col sm:flex-row gap-6 sm:gap-4 px-4 sm:px-0">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="#">
          <img src="logo.png" alt="Logo" className="h-8 sm:h-10 md:h-12 w-auto" />
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 text-center">
        <Link 
          href="/lobby" 
          className="text-sm sm:text-base hover:text-primary transition-colors"
        >
          Category
        </Link>
        <Link 
          href="/leaderboard" 
          className="text-sm sm:text-base hover:text-primary transition-colors"
        >
          Leaderboard
        </Link>
        <Link 
          href="/#about" 
          className="text-sm sm:text-base hover:text-primary transition-colors"
        >
          About Us
        </Link>
      </div>
      
      {/* Social Icons */}
      <div className="flex gap-2 sm:gap-3 md:gap-4">
        <Link href="#" className="hover:opacity-75 transition-opacity">
          <FaSquareXTwitter className="text-primary size-5 sm:size-6 md:size-7" />
        </Link>
        <Link href="#" className="hover:opacity-75 transition-opacity">
          <FaSquareFacebook className="text-primary size-5 sm:size-6 md:size-7" />
        </Link>
        <Link href="#" className="hover:opacity-75 transition-opacity">
          <FaSquareInstagram className="text-primary size-5 sm:size-6 md:size-7" />
        </Link>
        <Link href="#" className="hover:opacity-75 transition-opacity">
          <FaSquareGithub className="text-primary size-5 sm:size-6 md:size-7" />
        </Link>
      </div>
    </div>
  );
}