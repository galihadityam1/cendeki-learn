import React from "react";
import { profile } from "@/actions/actions";
import ButtonTryAgain from "@/components/ButtonTryAgain";

export default async function Page() {
  const getData = async () => {
    return await profile();
  };

  const data = await getData();
  let histories = data?.history;

  return (
    <>
      <div className="w-full">
        <div className="mx-auto mt-16 flex w-full max-w-[80%] justify-center px-4 sm:px-0">
          <div className="mx-auto flex min-h-[50dvh] w-full lg:w-[60dvw] lg:max-w-[60dvw] flex-col items-center">
            <h2 className="mb-8 text-4xl font-bold text-center sm:text-3xl">Previous Journey</h2>

            <div className="flex w-full flex-col gap-8 overflow-hidden rounded-lg px-5 overflow-y-auto xl:max-h-[65dvh] pt-5">
              {histories &&
                histories?.map((el, idx) => {
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundImage: 'url("/roman-style.png")',
                        backgroundSize: "cover",
                        position: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="border-primary flex flex-col gap-4 rounded-lg border p-4 "
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">{el.title}</h2>
                        <p className="text-white bg-black/70 rounded-lg px-2">{el.playDate.split("T")[0]}</p>
                      </div>
                      <div className="flex justify-between">
                        <div className="rounded-md bg-sky-100 px-4 py-1 text-xl font-bold">
                          {el.category}
                        </div>
                        <p className="text-xl font-bold text-white bg-black/70 rounded-lg px-2">Score: {el.score}</p>
                      </div>
                      <ButtonTryAgain id={el.storyId} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}