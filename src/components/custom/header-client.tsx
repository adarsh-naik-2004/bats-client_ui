"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import Logout from "./logout";

const CartCounterWithoutSSR = dynamic(() => import("./cart-counter"), {
  ssr: false,
});

const HeaderClient = ({ session }: { session: unknown }) => {
  return (
    <div className="flex items-center gap-x-4">
      <ul className="flex items-center font-medium space-x-4">
        <li>
          <Link className="hover:text-primary" href={"/"}>
            Menu
          </Link>
        </li>
        <li>
          <Link className="hover:text-primary" href={"/"}>
            Orders
          </Link>
        </li>
      </ul>
      <CartCounterWithoutSSR />
      <div className="flex items-center ml-12">
        <Phone />
        <span>+91 7477007852</span>
      </div>
      {session ? (
        <Logout />
      ) : (
        <Button size={"sm"} asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};

export default HeaderClient;