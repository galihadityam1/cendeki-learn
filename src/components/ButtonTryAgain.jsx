"use client";
import { useAppContext } from "@/context";
import { BASE_URL } from "@/db/config/constant";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const ButtonTryAgain = ({ id }) => {
  const router = useRouter();
  const { setStory } = useAppContext();
  const cookies = new Cookies();
  const handleSubmit = async () => {
    let res = await fetch(`${BASE_URL}/api/journey/retry?storyId=${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: cookies.toString(),
      },
    });

    if (!res.ok) {
      return Swal.fire({
        title: "Story not Found",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
      });
    }

    const { data } = await res.json();
    setStory(data);
    router.push(`/${data.category}/revisit`);
  };
  return (
    <>
      <button
        className="h-10 rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 text-sm font-bold text-sky-400 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-500/20 hover:text-sky-300 hover:shadow-sky-500/40 active:scale-95"
        onClick={handleSubmit}
      >
        Try Again
      </button>
    </>
  );
};

export default ButtonTryAgain;
