import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroCard({ el }) {
  return (
    <>
      {el.ready === true ? (
        <Link href="/lobby">
          <div className="bg-primary relative flex min-h-[470px] min-w-[320px] cursor-pointer flex-col rounded-2xl transition-shadow duration-300 hover:shadow-lg hover:shadow-sky-400">
            <Image
              src={`/${el.category}.png`}
              alt={el.category}
              className="min-h-[470px] rounded-2xl object-cover"
              width={320}
              height={470}
            />
            <div className="text-primary absolute bottom-0 flex h-14 w-32 items-center justify-center rounded-tr-lg bg-white px-3 pt-1">
              <p className="font-semibold">{el.category}</p>
              {/* <p className="pl-2">{el.stories.length} Stories</p> */}
            </div>
          </div>
        </Link>
      ) : (
        <div className="relative flex min-h-[470px] min-w-[320px] flex-col rounded-2xl bg-black">
          <Image
            src={`/${el.category}.png`}
            alt={el.category}
            className="min-h-[470px] rounded-2xl object-cover opacity-30"
            width={320}
            height={470}
          />
          <div className="absolute bottom-0 h-14 w-32 rounded-tr-lg bg-white px-3 pt-1 text-red-600 ">
            <p className="pl-2 font-semibold">{el.category}</p>
            <p className="">Coming Soon</p>
          </div>
        </div>
      )}
    </>
  );
}
