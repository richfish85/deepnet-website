import React from "react";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

export default function Terms() {
  return (
    <>
      <NavBar />
      <main className="max-w-3xl mx-auto px-6 py-12 prose prose-neutral">
        <h1>Terms of Service</h1>
        <p>
          Welcome to DeepNet Solutions. By accessing or using our services, you agree to the terms outlined on this page. Please read them carefully.
        </p>
        <h2>Use of Our Services</h2>
        <p>
          Our content and tools are provided for your business use. Do not misuse them or attempt to disrupt our systems.
        </p>
        <h2>Liability</h2>
        <p>
          We work hard to keep our platform running smoothly, but we can’t guarantee it will always be perfect. DeepNet Solutions isn’t liable for losses that arise from using our website.
        </p>
        <h2>Updates</h2>
        <p>
          We may update these terms as our services evolve. If the changes are significant, we’ll let you know.
        </p>
      </main>
      <Footer />
    </>
  );
}
