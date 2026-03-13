import React from "react";
import Teaser from "@/components/Teaser";
import HeroBanner from "@/components/HeroBanner";
import HeroIntro from "@/components/HeroIntro";
import TeamIntroduction from "@/components/TeamIntroduction";
import HeroFooter from "@/components/HeroFooter";
import HeroCategory from "@/components/HeroCategory";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <HeroBanner />
      <HeroCategory />
      <HeroIntro />
      <Teaser />
      <TeamIntroduction />
      <HeroFooter />
    </div>
  );
}
