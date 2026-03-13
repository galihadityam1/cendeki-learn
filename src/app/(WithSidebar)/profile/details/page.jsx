"use client";
import { editProfile } from "@/actions/actions";
import { useAppContext } from "@/context";
import React, { useEffect } from "react";

import ProfileSummary from "@/components/ProfileSummary";
import EditProfile from "@/components/EditProfile";

const Page = () => {
  let context = useAppContext();
  let { getProfile, state } = context;

  useEffect(() => {
    getProfile();
  }, [editProfile]);

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      {/* Page Title */}
      <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
        My Profile
      </h1>
      
      {/* Profile Card */}
      <div className="w-full max-w-7xl">
        <div
          className="relative flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8 overflow-hidden rounded-xl p-6 sm:p-8 lg:p-12 shadow-lg"
          style={{
            backgroundImage: 'url("/autumn.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Background Overlay for better readability */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          {/* Profile Image */}
          <div className="relative z-10 flex-shrink-0">
            <img
              src="https://images.pexels.com/photos/279360/pexels-photo-279360.jpeg"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white shadow-lg"
              alt="Profile"
            />
          </div>

          {/* Profile Information */}
          <div className="relative z-10 flex-1 w-full lg:max-w-none">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Full Name
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 break-words">
                    {state.fullname || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 break-all">
                    {state.email || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Bio
                </p>
                <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-700 leading-relaxed">
                  {state.bio || "No bio available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Components */}
      <div className="w-full max-w-7xl space-y-6 lg:space-y-8">
        <ProfileSummary />
        <EditProfile getProfile={getProfile} />
      </div>
    </div>
  );
};

export default Page;