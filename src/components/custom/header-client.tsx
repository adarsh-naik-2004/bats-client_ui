"use client";
import React from "react";
import Link from "next/link";
import { Phone, Menu as MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import Logout from "./logout";

const CartCounterWithoutSSR = dynamic(() => import("./cart-counter"), {
  ssr: false,
});

const HeaderClient = ({ session }: { session: unknown }) => {
  return (
    <div className="flex items-center gap-x-6">
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link 
          className="relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 group" 
          href={"/"}
        >
          Menu
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link 
          className="relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 group" 
          href={"/orders"}
        >
          Orders
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="md:hidden p-2"
      >
        <MenuIcon className="w-5 h-5" />
      </Button>

      {/* Cart Counter */}
      <div className="relative">
        <CartCounterWithoutSSR />
      </div>

      {/* Phone Number */}
      <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100">
        <Phone className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">+91 7477007852</span>
      </div>

      {/* Auth Section */}
      <div className="flex items-center">
        {session ? (
          <Logout />
        ) : (
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderClient;