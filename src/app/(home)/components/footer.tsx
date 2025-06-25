import { Github, Linkedin, Globe, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-orange-100 pt-20 pb-10 backdrop-blur-md relative overflow-hidden border-t border-orange-900">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-base md:text-lg">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Cricstore
              </span>
            </div>
            <p className="text-orange-200/80 mb-6">
              Cricket Gear Made for Champions
            </p>
            <p className="text-orange-200/60 text-sm">
              A passion project built with love for cricket enthusiasts worldwide.
            </p>
          </div>

          {/* Empty column for layout symmetry */}
          <div></div>

          {/* Social + Mail + Portfolio */}
          <div className="ml=20">
            <h4 className="text-xl font-bold mb-6 text-orange-400">Links</h4>
            <div className="flex space-x-4 mb-4">
              {/* GitHub */}
              <Link
                href="https://github.com/adarsh-naik-2004"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-700/20 flex items-center justify-center hover:from-orange-500 hover:to-orange-600 transition-all duration-300 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400 group"
              >
                <Github className="w-5 h-5 text-orange-300 group-hover:text-white group-hover:scale-110 transition-all" />
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/in/adarsh-manjunath-naik/"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-700/20 flex items-center justify-center hover:from-orange-500 hover:to-orange-600 transition-all duration-300 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400 group"
              >
                <Linkedin className="w-5 h-5 text-orange-300 group-hover:text-white group-hover:scale-110 transition-all" />
              </Link>

              {/* Mail */}
              <Link
                href="mailto:adarshnaik270@gmail.com"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-700/20 flex items-center justify-center hover:from-orange-500 hover:to-orange-600 transition-all duration-300 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400 group"
              >
                <Mail className="w-5 h-5 text-orange-300 group-hover:text-white group-hover:scale-110 transition-all" />
              </Link>

              {/* Portfolio */}
              <Link
                href="https://tinyurl.com/adarsh-18"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-700/20 flex items-center justify-center hover:from-orange-500 hover:to-orange-600 transition-all duration-300 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400 group"
              >
                <Globe className="w-5 h-5 text-orange-300 group-hover:text-white group-hover:scale-110 transition-all" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-orange-900/50 mt-10 pt-8 text-center text-orange-200/60 backdrop-blur-sm text-sm md:text-base">
          <p>
            © {new Date().getFullYear()} Cricstore. A side project crafted with passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
