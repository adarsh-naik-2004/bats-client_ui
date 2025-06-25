import { getSession } from "@/lib/session";
import HeaderClient from "./header-client";

const Header = async () => {
  const session = await getSession();

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-950  border-b border-orange-900/50 sticky top-0 z-50 shadow-xl">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative group flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500 bg-clip-text text-transparent">
                Cricstore
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