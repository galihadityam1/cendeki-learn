import React from "react";
import Image from "next/image";
import EditProfile from "./EditProfile";

const ProfileNav = ({ profile, getProfile }) => {
  return (
    <div className="flex h-40 w-full items-center justify-center bg-slate-300 py-5">
      <div className="flex h-full w-[60%] flex-row items-center justify-center">
        <div className="flex w-[10%] justify-center">
          <Image
            src="https://png.pngtree.com/png-clipart/20190120/ourmid/pngtree-cute-ghost-ghostly-cute-ghost-halloween-halloween-ghost-png-image_493761.jpg"
            alt="Profile avatar"
            width={40}
            height={40}
          />
        </div>
        <div className="flex w-[65%] flex-col px-2">
          <div className="text-xl">{profile.fullname}</div>
          <div className="flex flex-row gap-3 text-xs text-gray-400">
            <div>{profile.email}</div>
            <div className="underline ">age: {profile.age}</div>
          </div>
        </div>
        <div className="mr-5 flex flex-1 flex-col text-end">
          <div className="flex justify-end">
            {/* <div className="bg-white w-36 h-8 flex items-center justify-center rounded-xl text-blue-300">
                Edit Profile
              </div> */}
            <EditProfile getProfile={getProfile} />
          </div>
          <div className="flex w-full flex-row justify-end gap-3 pt-3">
            <div className="text-sm">Point</div>
            <div className="flex w-5 flex-row">
              <Image
                src="https://i.pngimg.me/thumb/f/350/freesvgorg171772.jpg"
                alt="Point icon"
                width={20}
                height={20}
              />
            </div>
            <div className="flex items-center text-xs">99</div>
            <div className="flex w-5 flex-row">
              <Image
                src="https://i.pngimg.me/thumb/f/350/freesvgorg171773.jpg"
                alt="Point icon"
                width={20}
                height={20}
              />
            </div>
            <div className="flex items-center text-xs">99</div>
            <div className="flex w-5 flex-row">
              <Image
                src="https://i.pngimg.me/thumb/f/720/freesvgorg171777.jpg"
                alt="Point icon"
                width={20}
                height={20}
              />
            </div>
            <div className="flex items-center text-xs">99</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
