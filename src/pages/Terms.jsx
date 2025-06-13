import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

export default function Terms() {
  return (
    <>
      <NavBar />
      <main className="max-w-3xl mx-auto px-6 py-12 prose prose-brand">
        <h1>Terms of Service</h1>
        <p>
          These terms govern your use of the DeepNet Solutions website and any
          services we provide. By accessing our site, you agree to be bound by
          these terms.
        </p>
        <h2>Use of Site</h2>
        <p>
          You agree to use this site only for lawful purposes and in a way that
          does not infringe the rights of, restrict or inhibit anyone else's use
          of the site.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics and logos, is
          the property of DeepNet Solutions and may not be reproduced without
          permission.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          We strive to ensure the information on this site is accurate but make
          no guarantees. We are not liable for any losses or damages arising
          from your use of the site.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these terms, please email
          roosdy@roosdy.dev.
        </p>
      </main>
      <Footer />
    </>
  );
}
