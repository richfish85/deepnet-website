import React from "react";
import NavBar from "./components/NavBar.jsx";
import NewsHeroRSS from "./components/NewsHeroRSS.jsx";
import Problem from "./components/Problem.jsx";
import Solution from "./components/Solution.jsx";
import Packages from "./components/Packages.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <NewsHeroRSS />
        <Problem />
        <Solution />
        <Packages />
        <WhyChoose />
      </main>
      <Footer />
    </>
  );
}