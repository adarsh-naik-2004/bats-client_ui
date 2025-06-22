"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu as MenuIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import Logout from "./logout";

const CartCounterWithoutSSR = dynamic(() => import("./cart-counter"), {
  ssr: false,
});

const HeaderClient = ({ session }: { session: unknown }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-5">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {["Home", "Products", "Orders"].map((item) => (
          <Link
            key={item}
            className="relative text-orange-200 hover:text-white font-medium transition-all duration-300 group text-base"
            href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden p-2 text-orange-200 relative z-[9999]" // Keep this high so button is clickable
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MenuIcon className="w-5 h-5" />
        )}
      </Button>

      <div className="relative">
        <CartCounterWithoutSSR />
      </div>

      <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-orange-800/30 backdrop-blur-sm rounded-full border border-orange-600/50">
        <Phone className="w-4 h-4 text-orange-300" />
        <span className="text-sm font-medium text-orange-200">
          +91 7477007852
        </span>
      </div>

      <div className="flex items-center">
        {session ? (
          <Logout />
        ) : (
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu Overlay (Click to close background) */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 z-[9998]" // z-index lower than menu, but higher than page content
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Navigation Panel */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-4/5 max-w-xs z-[9999] shadow-2xl transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#0f172a" }}
      >
        {/* Inner content of the mobile menu */}
        <div className="px-6 py-8 h-full flex flex-col bg-gray-900">
          {" "}
          {/* Explicitly setting bg-gray-900 here again for redundancy/specificity */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Elite Cricket
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-orange-200 hover:text-white hover:bg-orange-800/20"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="flex flex-col space-y-6 flex-grow">
            {["Home", "Products", "Orders"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                className="text-orange-200 hover:text-white font-medium text-lg transition-colors duration-300 py-3 border-b border-gray-600/50 hover:border-orange-400/50"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="pt-6 border-t border-gray-600/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-orange-800/40 rounded-lg border border-orange-600/30">
              <Phone className="w-5 h-5 text-orange-300" />
              <span className="text-base font-medium text-orange-200">
                +91 7477007852
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderClient;
