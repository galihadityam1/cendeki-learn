"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "universal-cookie";

export default function HeroBanner() {
  const cookies = new Cookies();
  const router = useRouter();
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
      className="mx-auto mt-8 sm:mt-12 md:mt-16 flex h-[250px] sm:h-[300px] md:h-[363px] flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 overflow-clip rounded-xl sm:rounded-2xl max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[920px] px-4"
      style={{
        backgroundImage: "url(/Learn.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold invert text-center leading-tight">
        CENDEKIA LEARNING PLATFORM
      </p>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl invert text-center px-2">
        Where education meets entertainment!
      </p>
      <div className="flex flex-col items-center justify-center sm:flex-row gap-3 sm:gap-4 md:gap-8 w-full max-w-xs sm:max-w-none">
        <button
          onClick={() => goToLogin()}
          className="bg-primary flex w-full sm:w-32 md:w-36 max-w-[150px] items-center justify-center rounded-lg px-3 sm:px-4 py-2 sm:py-3 mx-auto sm:mx-0"
        >
          <p className="font-semibold invert text-sm sm:text-base">Login</p>
        </button>
        <Link
          href="#teaser"
          className="bg-primary flex w-full sm:w-32 md:w-36 max-w-[150px] items-center justify-center rounded-lg px-3 sm:px-4 py-2 sm:py-3 mx-auto sm:mx-0"
        >
          <p className="font-semibold invert text-sm sm:text-base">Try it for free!</p>
        </Link>
      </div>
    </div>
  );
}