"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

export default function HeroBanner() {
  const cookies = useMemo(() => new Cookies(), []);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before checking cookies
  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(!!cookies.get("Authorization"));
  }, [cookies]);

  const goToLogin = async () => {
    let data = await cookies.get("Authorization");
    if (!data) {
      return router.push("/login");
    }
    if (data) {
      const token = data.split(" ")[1];
      if (token) {
        return router.push("/lobby");
      }
    }
  };
  return (
    <div
      className="mx-auto mt-8 flex h-[250px] max-w-[95%] flex-col items-center justify-center gap-3 overflow-clip rounded-xl px-4 sm:mt-12 sm:h-[300px] sm:max-w-[90%] sm:gap-4 sm:rounded-2xl md:mt-16 md:h-[363px] md:max-w-[85%] md:gap-6 lg:max-w-[920px]"
      style={{
        backgroundImage: "url(/Learn.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <p className="text-center text-xl font-semibold leading-tight invert sm:text-2xl md:text-3xl lg:text-4xl">
        CENDEKIA LEARNING PLATFORM
      </p>
      <p className="px-2 text-center text-sm invert sm:text-base md:text-lg lg:text-xl">
        Where education meets entertainment!
      </p>
      {mounted && (
        <div className="flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4 md:gap-8">
          {!isLoggedIn && (
            <button
              onClick={() => goToLogin()}
              className="bg-primary mx-auto flex w-full max-w-[150px] items-center justify-center rounded-lg px-3 py-2 sm:mx-0 sm:w-32 sm:px-4 sm:py-3 md:w-36"
            >
              <p className="text-sm font-semibold invert sm:text-base">Login</p>
            </button>
          )}
          <Link
            href={isLoggedIn ? "/lobby" : "#teaser"}
            className="bg-primary mx-auto flex w-full max-w-[150px] items-center justify-center rounded-lg px-3 py-2 sm:mx-0 sm:w-32 sm:px-4 sm:py-3 md:w-36"
          >
            <p className="text-sm font-semibold invert sm:text-base">
              {isLoggedIn ? "Categories" : "Try it for free!"}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
