import React from "react";
import Teaser from "@/components/Teaser";
import HeroBanner from "@/components/HeroBanner";
import HeroIntro from "@/components/HeroIntro";
import TeamIntroduction from "@/components/TeamIntroduction";
import HeroFooter from "@/components/HeroFooter";
import HeroCategory from "@/components/HeroCategory";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
      {/* Background Sparkles */}
      <div className="pointer-events-none fixed inset-0 z-0 h-screen w-full">
        <SparklesCore
          id="tsparticleshome"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="h-full w-full"
          particleColor="#38bdf8"
        />
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col pt-20 sm:pt-24">
        <HeroBanner />
        <HeroCategory />
        <HeroIntro />
        <Teaser />
        <TeamIntroduction />
        <HeroFooter />
      </div>
    </div>
  );
}
