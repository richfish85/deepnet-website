import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ToolkitPage from "./pages/Toolkit.jsx";
import DocsLandingPage from "./app/docs/page.tsx";
import DocsDynamicPage from "./app/docs/[...slug]/page.tsx";
import PackagesIndexPage from "./app/packages/index.jsx";
import FrontDoorPage from "./app/packages/FrontDoorPage.jsx";
import CyberGuardCorePage from "./app/packages/CyberGuardCorePage.jsx";
import CyberShield360Page from "./app/packages/CyberShield360Page.jsx";
import DeepNetInfrastructurePage from "./app/packages/DeepNetInfrastructurePage.jsx";
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
        <Route path="/docs" element={<DocsLandingPage />} />
        <Route path="/docs/*" element={<DocsDynamicPage />} />
        <Route path="/packages" element={<PackagesIndexPage />} />
        <Route path="/packages/front-door-scan" element={<FrontDoorPage />} />
        <Route path="/packages/cyberguard-core" element={<CyberGuardCorePage />} />
        <Route path="/packages/cybershield-360" element={<CyberShield360Page />} />
        <Route path="/packages/deepnet-infrastructure" element={<DeepNetInfrastructurePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
