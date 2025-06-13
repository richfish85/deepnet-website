import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function NavBar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="DeepNet Solutions logo" className="h-8 w-8" />
          <span className="font-display font-semibold text-xl text-brand-primary">DeepNet</span>
        </Link>
        <div className="hidden md:flex space-x-6 font-semibold">
          <a href="/#packages" className="hover:text-brand-accent-1">Packages</a>
          <a href="/#why" className="hover:text-brand-accent-1">Why DeepNet</a>
          <a href="/toolkit" className="hover:underline">Free Toolkit</a>
          <Link to="/contact" className="hover:text-brand-accent-1">Contact</Link>
        </div>
        <Link to="/contact" className="btn-primary text-sm">Free Consultation</Link>
      </div>
    </header>
  );
}