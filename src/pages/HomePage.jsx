import React from "react";
import NewsHeroRSS from "../components/NewsHeroRSS.jsx";
import Problem from "../components/Problem.jsx";
import Solution from "../components/Solution.jsx";
import Packages from "../components/Packages.jsx";
import WhyChoose from "../components/WhyChoose.jsx";

export default function HomePage() {
  return (
    <>
      <NewsHeroRSS />
      <Problem />
      <Solution />
      <Packages />
      <WhyChoose />
    </>
  );
}
