"use client";
import { editProfile } from "@/actions/actions";
import { useAppContext } from "@/context";
import React, { useEffect, useState } from "react";
import ProfileSummary from "@/components/ProfileSummary";
import { SparklesCore } from "@/components/ui/sparkles";
import { FiUser, FiMail, FiCalendar, FiFileText } from "react-icons/fi";

export default function Page() {
  const dataProfile = useAppContext();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (dataProfile.state) {
      // Profile data is available
    }
  }, [dataProfile.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullname = formData.get("fullname");
    const bio = formData.get("bio");
    const age = formData.get("age");

    await editProfile({ fullname, bio, age: parseInt(age) });

    // Refresh profile data after update
    await dataProfile.refreshProfile();
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Background Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesprofile"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="h-full w-full"
          particleColor="#38bdf8"
        />
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl pt-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Account Settings
            </span>
          </div>
          <h1 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            My Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left Column: Summary Card */}
          <div className="md:col-span-4">
            <ProfileSummary dataProfile={dataProfile} />
          </div>

          {/* Right Column: Details/Edit Form */}
          <div className="md:col-span-8">
            <div className="rounded-[2rem] border border-slate-800/60 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Personal Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    isEditing
                      ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20"
                  }`}
                >
                  {isEditing ? "Cancel Edit" : "Edit Profile"}
                </button>
              </div>

              {!isEditing ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 rounded-xl border border-slate-800/50 bg-slate-950/50 p-4">
                    <div className="rounded-lg bg-slate-800 p-3 text-sky-400">
                      <FiUser className="size-5" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Full Name
                      </p>
                      <p className="text-lg font-medium text-white">
                        {dataProfile?.state?.fullname || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-slate-800/50 bg-slate-950/50 p-4">
                    <div className="rounded-lg bg-slate-800 p-3 text-sky-400">
                      <FiMail className="size-5" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Email Address
                      </p>
                      <p className="text-lg font-medium text-white">
                        {dataProfile?.state?.email || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-slate-800/50 bg-slate-950/50 p-4">
                    <div className="mt-1 rounded-lg bg-slate-800 p-3 text-sky-400">
                      <FiFileText className="size-5" />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Bio
                      </p>
                      <p className="whitespace-pre-wrap text-lg font-medium text-white">
                        {dataProfile?.state?.bio || "No bio set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-slate-800/50 bg-slate-950/50 p-4">
                    <div className="rounded-lg bg-slate-800 p-3 text-sky-400">
                      <FiCalendar className="size-5" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Age
                      </p>
                      <p className="text-lg font-medium text-white">
                        {dataProfile?.state?.age
                          ? `${dataProfile.state.age} years old`
                          : "Not set"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-slate-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      defaultValue={dataProfile?.state?.fullname}
                      className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-5 text-base text-white shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={dataProfile?.state?.email}
                      disabled
                      className="h-14 w-full cursor-not-allowed rounded-xl border border-slate-700 bg-slate-800/60 px-5 text-base text-slate-400 shadow-inner transition-all duration-200 placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-slate-300">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      defaultValue={dataProfile?.state?.bio || ""}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-5 py-3 text-base text-white shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-slate-300">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      defaultValue={dataProfile?.state?.age}
                      className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-5 text-base text-white shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="h-14 flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 text-lg font-bold text-white transition-all duration-300 hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="h-14 flex-1 rounded-xl bg-sky-500 px-4 text-lg font-bold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-400/40 active:scale-[0.98]"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
