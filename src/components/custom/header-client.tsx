'use client';
import React from "react";
import Link from "next/link";
import { Phone, Menu as MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import Logout from "./logout";

const CartCounterWithoutSSR = dynamic(() => import("./cart-counter"), { ssr: false });

const HeaderClient = ({ session }: { session: unknown }) => {
  return (
    <div className="flex items-center gap-x-5">
      <nav className="hidden md:flex items-center space-x-7">
        {["Home", "Products", "About", "Orders"].map((item) => (
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
      
      <Button variant="ghost" size="sm" className="md:hidden p-2 text-orange-200">
        <MenuIcon className="w-5 h-5" />
      </Button>
      
      <div className="relative">
        <CartCounterWithoutSSR />
      </div>
      
      <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-orange-800/30 backdrop-blur-sm rounded-full border border-orange-600/50">
        <Phone className="w-4 h-4 text-orange-300" />
        <span className="text-sm font-medium text-orange-200">+91 7477007852</span>
      </div>
      
      <div className="flex items-center">
        {session ? (
          <Logout />
        ) : (
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-medium px-5 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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