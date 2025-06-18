import { getSession } from "@/lib/session";
import HeaderClient from "./header-client";
import { Sword } from "lucide-react";

const Header = async () => {
  const session = await getSession();

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-950 backdrop-blur-md border-b border-orange-900/50 sticky top-0 z-50 shadow-xl">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative group flex items-center">
              <Sword className="w-8 h-8 text-orange-500 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Elite Cricket
              </span>
            </div>
          </div>
          <HeaderClient session={session} />
        </div>
      </nav>
    </header>
  );
};

export default Header;