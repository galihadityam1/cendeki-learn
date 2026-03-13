import React from "react";

export default function TeamIntroduction() {
  return (
    <div
      id="about"
      className="mx-auto mt-16 sm:mt-24 md:mt-32 flex max-w-[95%] sm:max-w-[90%] md:max-w-[80%] xl:max-w-[60%] flex-col items-center justify-between px-4 sm:px-0"
    >
      <h2 className="mb-4 sm:mb-6 md:mb-8 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
        Meet our team
      </h2>
      <p className="max-w-[90%] sm:max-w-[80%] md:max-w-[75%] xl:max-w-[60%] text-center text-sm sm:text-base md:text-lg leading-relaxed">
        Our philosophy is simple - hire a team of diverse, passionate people and
        foster a culture that empowers you to do your best work.
      </p>
      <div className="mx-auto mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16 w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]">
        {team.map((el, idx) => {
          return (
            <div key={idx} className="flex flex-col items-center">
              <img
                src="https://images.pexels.com/photos/279360/pexels-photo-279360.jpeg"
                alt=""
                className="mb-2 sm:mb-3 md:mb-4 size-24 sm:size-28 md:size-32 rounded-full object-cover"
              />
              <p className="text-base sm:text-lg md:text-xl font-semibold tracking-tighter text-center">
                {el.name}
              </p>
              <p className="text-primary text-sm sm:text-base md:text-lg tracking-tighter text-center">
                {el.position}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const team = [
  {
    name: "Bayu Prasetya Utomo",
    position: "Front-end Developer & Lead",
  },
  {
    name: "Raihan Yumna",
    position: "Back-end Developer",
  },
  {
    name: "Galih Aditya Mohammad",
    position: "Full-stack Developer",
  },
  {
    name: "Derio Anjaya",
    position: "Back-end Developer",
  },
];
