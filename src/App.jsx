import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ToolkitPage from "./pages/Toolkit.jsx";
// import HeroAnimated from "./components/HeroAnimated.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      {/* <HeroAnimated /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/toolkit" element={<ToolkitPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
