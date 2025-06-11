import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

export default function Privacy() {
  return (
    <>
      <NavBar />
      <main className="max-w-3xl mx-auto px-6 py-12 prose prose-brand">
        <h1>Privacy Policy</h1>
        <p>
          DeepNet Solutions respects your privacy and is committed to protecting
          your personal information. This policy outlines how we collect,
          use and safeguard data when you interact with our website.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We only collect the personal information you voluntarily provide, such
          as your name, email address and phone number when you request a
          consultation or contact us.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          The details you share enable us to respond to your enquiries and
          deliver relevant service information. We never sell or share your
          personal data with third parties for marketing purposes.
        </p>
        <h2>Data Security</h2>
        <p>
          We take reasonable steps to protect the information we hold from
          misuse, loss and unauthorised access. However, no internet
          transmission is completely secure. You provide information at your own
          risk.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please email
          roosdy@roosdy.dev.
        </p>
      </main>
      <Footer />
    </>
  );
}
