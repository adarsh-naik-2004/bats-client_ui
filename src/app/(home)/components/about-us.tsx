import { Github, ExternalLink, Linkedin, User, Code, Trophy } from "lucide-react";

const AboutSection = () => {
  return (
    <div className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">About Me</h2>
          <p className="text-lg text-orange-200/80 max-w-2xl mx-auto">
            Full-stack developer passionate about creating functional web applications
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 mb-12 border border-orange-900">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 bg-gradient-to-r from-orange-500/10 to-orange-700/10 rounded-full mx-auto lg:mx-0 mb-4 flex items-center justify-center overflow-hidden">
                <div className="bg-gray-700 border-2 border-dashed rounded-xl w-28 h-28 flex items-center justify-center">
                  <User className="w-16 h-16 text-orange-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white">Your Name</h3>
              <p className="text-gradient bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-medium">Full Stack Developer</p>
              
              <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="px-3 py-1 bg-orange-900/30 text-orange-300 text-xs font-medium rounded-full">React</span>
                <span className="px-3 py-1 bg-orange-900/30 text-orange-300 text-xs font-medium rounded-full">Next.js</span>
                <span className="px-3 py-1 bg-orange-900/30 text-orange-300 text-xs font-medium rounded-full">Node.js</span>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <p className="text-orange-200/80 mb-4">
                I&apos;m a passionate developer specializing in creating modern web applications. This cricket equipment store is one of my side projects where I explore e-commerce functionality with Next.js and modern UI patterns.
              </p>
              <p className="text-orange-200/80">
                When I&apos;m not coding, I contribute to open-source projects and solve problems on coding platforms. My approach focuses on clean architecture, performance optimization, and delightful user experiences.
              </p>
              
              <div className="mt-6 flex items-center gap-4">
                <Trophy className="w-5 h-5 text-orange-500" />
                <p className="text-sm text-orange-200/80">
                  <span className="font-semibold">Coding Achievements:</span> Top 5% on LeetCode, 50+ GitHub repositories
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 rounded-2xl shadow-lg p-8 mb-12 border border-orange-900">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Developer Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-gray-800 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-orange-300">GitHub</h4>
                <p className="text-sm text-orange-200/80">View my code repositories and contributions</p>
              </div>
            </a>
            
            <a 
              href="https://leetcode.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-gray-800 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-orange-300">LeetCode</h4>
                <p className="text-sm text-orange-200/80">Check my problem-solving progress</p>
              </div>
            </a>
            
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-gray-800 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-orange-300">LinkedIn</h4>
                <p className="text-sm text-orange-200/80">Connect professionally</p>
              </div>
            </a>
            
            <a 
              href="https://yourportfolio.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-gray-800 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-orange-300">Portfolio</h4>
                <p className="text-sm text-orange-200/80">See my other projects</p>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border border-orange-900 rounded-2xl p-6 inline-block max-w-2xl">
            <h4 className="font-bold text-orange-300 mb-2">About This Project</h4>
            <p className="text-orange-200">
              This cricket equipment store is a side project built with Next.js to demonstrate modern e-commerce patterns including cart management, product customization, and responsive design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;