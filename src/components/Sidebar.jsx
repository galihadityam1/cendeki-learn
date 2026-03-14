"use client";
import { profile } from "@/actions/actions";
import { useAppContext } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { BiCategory } from "react-icons/bi";
import { IoIosBookmarks } from "react-icons/io";
import { MdOutlineBarChart } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-open sidebar on desktop, keep closed on mobile
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  async function logout() {
    let token = cookies.get("Authorization");
    if (!token) {
      return Swal.fire({
        title: "You are not logged in yet",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
        background: "#0f172a",
        color: "#f8fafc",
      });
    }
    cookies.remove("Authorization", { path: "/" });
    cookies.remove("Authorization", { path: "/profile" });
    return router.push("/login");
  }

  const dataProfile = useAppContext();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed left-4 top-4 z-[9999] rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-300 shadow-lg transition-all duration-300 hover:bg-slate-800 hover:text-white md:hidden"
      >
        {isSidebarOpen ? <HiX size={20} /> : <HiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-screen border-r border-slate-800 bg-slate-950
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isMobile ? "z-[9999] w-80 shadow-2xl" : "z-40 w-72 lg:w-80"}
          flex flex-col justify-between
        `}
      >
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-full bg-gradient-to-b from-sky-500/5 to-transparent" />

        <div className="hide-scrollbar relative z-10 flex h-full flex-col overflow-y-auto">
          {/* Logo section */}
          <Link
            href="/"
            className="group mb-10 mt-8 flex items-center justify-center px-6"
            onClick={closeSidebar}
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-sky-500/20 transition-transform group-hover:scale-105 sm:h-12 sm:w-12">
              <img
                src="/logo.png"
                alt="Cendekia Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="ml-3 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-sky-300 sm:text-2xl">
              Cendekia
            </h2>
          </Link>

          {/* Menu label */}
          <p className="mb-4 px-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          {/* Menu items */}
          <div className="mb-8 flex w-full flex-col gap-2 px-4">
            {menus.map((el, idx) => {
              return (
                <Link
                  href={el.href}
                  key={idx}
                  className="group flex items-center gap-4 rounded-xl border border-transparent px-4 py-3.5 text-slate-400 transition-all duration-300 hover:border-slate-800/50 hover:bg-slate-900 hover:text-white"
                  onClick={closeSidebar}
                >
                  <span className="rounded-lg bg-slate-900 p-2 transition-colors group-hover:bg-sky-500/20 group-hover:text-sky-400">
                    {el.icon}
                  </span>
                  <p className="text-sm font-semibold tracking-wide">
                    {el.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Profile section */}
        <div className="relative z-10 mt-auto flex flex-col border-t border-slate-800/50 bg-slate-950 px-4 py-6">
          <p className="mb-4 px-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            Account
          </p>

          <Link
            href="/profile/details"
            className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-slate-800/50 hover:bg-slate-900"
            onClick={closeSidebar}
          >
            <img
              src="https://images.pexels.com/photos/279360/pexels-photo-279360.jpeg"
              className="h-10 w-10 flex-shrink-0 rounded-full border-2 border-slate-700 object-cover transition-colors group-hover:border-sky-500"
              alt="Profile"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white transition-colors group-hover:text-sky-300">
                {dataProfile?.state?.fullname || "User"}
              </p>
              <p className="truncate text-xs font-medium text-slate-500">
                {dataProfile?.state?.email || "user@email.com"}
              </p>
            </div>
          </Link>

          <button
            onClick={() => {
              logout();
              closeSidebar();
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-bold text-rose-400 transition-all duration-300 hover:bg-rose-500 hover:text-white"
          >
            <FiLogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Spacer for desktop layout only when sidebar is open */}
      <div
        className={`hidden transition-all duration-300 md:block ${isSidebarOpen ? "w-72 lg:w-80" : "w-0"} flex-shrink-0`}
      />
    </>
  );
}

const menus = [
  {
    name: "Categories",
    icon: <BiCategory size={20} />,
    href: "/lobby",
  },
  {
    name: "Leaderboard",
    icon: <MdOutlineBarChart size={20} />,
    href: "/leaderboard",
  },
  {
    name: "Previous Journey",
    icon: <IoIosBookmarks size={20} />,
    href: "/profile/history",
  },
];
