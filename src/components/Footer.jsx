import React from "react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-display text-xl font-semibold mb-2">DeepNet Solutions</h3>
          <p className="text-sm mb-4">Cybersecurity for Melbourne SMBs.</p>
          <p className="text-sm">Phone: 0466 892 484</p>
          <p className="text-sm">Email: staff@deepnet.com.au</p>
        </div>
        <div className="md:text-right text-sm space-y-2">
          <a href="#packages" className="block hover:text-brand-accent-2">Packages</a>
          <a href="#why" className="block hover:text-brand-accent-2">Why DeepNet</a>
          <a href="/privacy" className="block hover:text-brand-accent-2">Privacy Policy</a>
          <a href="/terms" className="block hover:text-brand-accent-2">Terms of Service</a>
        </div>
      </div>
      <div className="bg-brand-primary text-center py-4 text-xs">
        © {new Date().getFullYear()} DeepNet Solutions. All Rights Reserved.
      </div>
    </footer>
  );
}