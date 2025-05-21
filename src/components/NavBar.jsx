import React from "react";
import logo from "../assets/logo.svg";

export default function NavBar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="flex items-center space-x-2">
          <img src={logo} alt="DeepNet Solutions logo" className="h-8 w-8" />
          <span className="font-display font-semibold text-xl text-brand-primary">DeepNet</span>
        </a>
        <div className="hidden md:flex space-x-6 font-semibold">
          <a href="#packages" className="hover:text-brand-accent-1">Packages</a>
          <a href="#why" className="hover:text-brand-accent-1">Why DeepNet</a>
          <a href="#contact" className="hover:text-brand-accent-1">Contact</a>
        </div>
        <a href="#contact" className="btn-primary text-sm">Free Consultation</a>
      </div>
    </header>
  );
}