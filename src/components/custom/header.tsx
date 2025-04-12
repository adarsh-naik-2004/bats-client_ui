import React from "react";
import { Store } from "@/lib/types";
import StoreSelect from "./store-select";
import { getSession } from "@/lib/session";
import HeaderClient from "./header-client"; 
import Image from "next/image";

const Header = async () => {
  const session = await getSession();

  const storesResponse = await fetch(
    `${process.env.BACKEND_URL}/api/auth/stores?perPage=100`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );

  if (!storesResponse.ok) {
    throw new Error("Failed to fetch stores");
  }

  const shops: { data: Store[] } = await storesResponse.json();

  return (
    <header className="bg-white">
      <nav className="container py-5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <Image
            src="/bats_logo.png"
            alt="Cricket Store Logo"
            width={120}
            height={40}
            priority
          />
          <StoreSelect shops={shops} />
        </div>
        <HeaderClient session={session} />
      </nav>
    </header>
  );
};

export default Header;