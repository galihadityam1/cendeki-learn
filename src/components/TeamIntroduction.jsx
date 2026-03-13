import Image from "next/image";
import React from "react";

export default function TeamIntroduction() {
  return (
    <div
      id="about"
      className="mx-auto mt-16 flex max-w-[95%] flex-col items-center justify-center px-4 sm:mt-24 sm:max-w-[90%] sm:px-0 md:mt-32 md:max-w-[80%] xl:max-w-[60%]"
    >
      <h2 className="mb-4 text-center text-2xl font-bold sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl lg:text-5xl">
        About This Project
      </h2>
      <p className="mb-8 max-w-[90%] text-center text-sm leading-relaxed sm:max-w-[80%] sm:text-base md:max-w-[75%] md:text-lg xl:max-w-[60%]">
        An interactive learning platform that generates educational stories with
        fill-in-the-blank questions to make learning History and English more
        engaging and fun.
      </p>
      <div className="mx-auto mt-8 flex w-full max-w-[90%] flex-col items-center sm:mt-12 sm:max-w-[80%] md:mt-16 lg:max-w-[70%] xl:max-w-[60%]">
        <div className="flex flex-col items-center">
          <Image
            src="https://images.pexels.com/photos/279360/pexels-photo-279360.jpeg"
            width={380}
            height={380}
            alt="Developer"
            className="mb-4 size-32 rounded-full border-4 border-sky-200 object-cover sm:mb-6 sm:size-36 md:mb-8 md:size-40"
          />
          <h3 className="mb-2 text-center text-xl font-bold sm:text-2xl md:text-3xl">
            Galih Aditya Mohammad
          </h3>
          <p className="text-primary mb-4 text-center text-lg font-semibold sm:text-xl md:text-2xl">
            Full-stack Developer
          </p>
          <p className="max-w-md text-center text-sm text-gray-600 sm:text-base md:text-lg">
            Passionate about creating educational technology that makes learning
            interactive and enjoyable. Built this platform to help students
            learn History and English in a more engaging way.
          </p>
        </div>
      </div>
    </div>
  );
}
