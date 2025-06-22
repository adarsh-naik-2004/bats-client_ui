import { Zap } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-orange-100 pt-20 pb-10 backdrop-blur-md relative overflow-hidden border-t border-orange-900">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-orange-500 mr-3" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Elite Cricket</span>
            </div>
            <p className="text-orange-200/80 mb-6">
              Premium cricket equipment crafted for champions. Performance meets perfection in every swing.
            </p>
            <div className="flex space-x-4">
              {[1,2,3,4].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-700/20 flex items-center justify-center hover:from-orange-500 hover:to-orange-600 transition-all duration-300 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400 group">
                  <div className="w-4 h-4 bg-orange-300 rounded-sm group-hover:scale-110 transition-transform"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-400">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Products", "About Us", "My Orders", "Contact"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-orange-200/80 hover:text-orange-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-px bg-orange-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-400">Contact</h3>
            <ul className="space-y-4 text-orange-200/80">
              <li className="flex items-start group">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-700/20 flex items-center justify-center mr-3 flex-shrink-0 backdrop-blur-sm border border-orange-500/30 group-hover:border-orange-400 transition-colors">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
                <span className="group-hover:text-orange-300 transition-colors">123 Sports Avenue, Mumbai, India</span>
              </li>
              <li className="flex items-start group">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-700/20 flex items-center justify-center mr-3 flex-shrink-0 backdrop-blur-sm border border-orange-500/30 group-hover:border-orange-400 transition-colors">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
                <span className="group-hover:text-orange-300 transition-colors">+91 98765 43210</span>
              </li>
              <li className="flex items-start group">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-700/20 flex items-center justify-center mr-3 flex-shrink-0 backdrop-blur-sm border border-orange-500/30 group-hover:border-orange-400 transition-colors">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
                <span className="group-hover:text-orange-300 transition-colors">info@elitecricket.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-orange-900/50 mt-16 pt-8 text-center text-orange-200/60 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p>© {new Date().getFullYear()} Elite Cricket. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-sm">Made with</span>
              <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-pulse"></div>
              <span className="text-sm">for cricket enthusiasts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;