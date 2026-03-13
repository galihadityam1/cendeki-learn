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
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  async function logout() {
    let token = cookies.get("Authorization");
    if (!token) {
      return Swal.fire({
        title: "You are not logged in yet",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
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
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[9999] p-2 bg-sky-200 rounded-md shadow-md md:hidden hover:bg-sky-300 transition-colors"
      >
        {isSidebarOpen ? <HiX size={20} /> : <HiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-lg shadow-blue-600
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'w-80 z-[9999]' : 'w-64 md:w-72 lg:w-80 z-10'}
          flex flex-col justify-between
        `}
      >
        <div className="flex flex-col items-center overflow-y-auto">
          {/* Logo section */}
          <Link 
            href="/" 
            className="my-6 mb-8 flex items-center justify-center px-4"
            onClick={closeSidebar}
          >
            <img src="/logo.png" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            <h2 className="text-primary text-xl sm:text-2xl font-extrabold ml-2">
              Cendekia
            </h2>
          </Link>

          {/* Menu label */}
          <p className="mb-4 px-4 text-gray-500 text-sm font-medium self-start">
            Menu
          </p>

          {/* Menu items */}
          <div className="mx-auto mb-8 flex w-full max-w-[90%] flex-col gap-2">
            {menus.map((el, idx) => {
              return (
                <Link
                  href={el.href}
                  key={idx}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-sky-100 transition-colors group"
                  onClick={closeSidebar}
                >
                  <span className="text-gray-600 group-hover:text-sky-600 transition-colors">
                    {el.icon}
                  </span>
                  <p className="text-base font-medium text-gray-700 group-hover:text-sky-700 transition-colors">
                    {el.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Profile section */}
        <div className="flex flex-col gap-3 px-4 py-4 border-t border-gray-200 mt-auto">
          <p className="text-sm font-medium text-gray-500">Profile</p>
          
          <Link 
            href="/profile/details" 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-sky-50 transition-colors"
            onClick={closeSidebar}
          >
            <img
              src="https://images.pexels.com/photos/279360/pexels-photo-279360.jpeg"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              alt="Profile"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">
                {dataProfile?.state?.fullname || "User"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {dataProfile?.state?.email || "user@email.com"}
              </p>
            </div>
          </Link>

          <button
            onClick={() => {
              logout();
              closeSidebar();
            }}
            className="mt-2 rounded-lg bg-sky-200 py-2.5 px-4 text-center font-semibold text-sky-800 hover:bg-sky-300 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Spacer for desktop layout only when sidebar is open */}
      <div className={`hidden md:block transition-all duration-300 ${isSidebarOpen ? 'w-64 md:w-72 lg:w-80' : 'w-0'} flex-shrink-0`} />
    </>
  );
}

const menus = [
  {
    name: "Category",
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