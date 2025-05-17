import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaGithub, FaInstagram, FaLinkedinIn, FaFacebook } from 'react-icons/fa';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [orbPosition, setOrbPosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for interactive elements
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    setMousePosition({ x, y });
  };

  // Animation for small orb
  useEffect(() => {
    setIsVisible(true);
    const animateOrb = () => {
      const time = Date.now() * 0.001;
      setOrbPosition({
        x: Math.sin(time) * 40,
        y: Math.cos(time) * 40,
      });
    };
    const intervalId = setInterval(animateOrb, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      className="relative w-full h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />

      {/* Main content */}
      <div className="text-white max-w-md w-full md:w-auto z-10 transform transition-all duration-1000 ease-out text-center md:text-left">
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          Эрдэнэбат<br />Баянбат
        </h1>

        <div
          className={`mt-4 sm:mt-6 flex items-start justify-center md:justify-start transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="border-l-2 border-gray-400 h-10 sm:h-12 mr-3 sm:mr-4"></div>
          <p className="text-base sm:text-lg">Information Technology student at National University of Mongolia</p>
        </div>

        <a
          href="CV.pdf"
          download
          className={`mt-6 sm:mt-8 flex items-center bg-gradient-to-r from-pink-500 to-purple-500 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full relative group transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-purple-600 opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-opacity" />
          <FiDownload className="text-white mr-2 z-10" />
          <span className="text-white font-semibold z-10 text-sm sm:text-base">Download CV</span>
        </a>
      </div>

      {/* Contact info card (hidden on mobile) */}
      <div
        className={`hidden md:block absolute right-4 lg:right-24 bottom-1/4 w-64 sm:w-72 bg-gray-900/70 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-gray-800 z-20 transform transition-all duration-1000 delay-800 ${
          isVisible ? 'translate-x-0 opacity-80' : 'translate-x-12 opacity-0'
        }`}
      >
        <h3 className="text-white font-bold mb-2 sm:mb-3 text-base sm:text-lg">Contact</h3>
        <p className="text-gray-300 text-xs sm:text-sm mb-1">976-88567073</p>
        <p className="text-gray-300 text-xs sm:text-sm">buddybayanbat@gmail.com</p>
      </div>

      {/* Large interactive globe */}
      <div
        className="absolute bottom-0 right-0 w-48 sm:w-96 md:w-[600px] h-48 sm:h-96 md:h-[600px] bg-gradient-to-br from-pink-500/40 to-blue-300/40 opacity-70 rounded-full filter blur-3xl z-0 transition-all duration-300 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * -30}px, ${(mousePosition.y - 0.5) * -30}px)`,
        }}
      />

      {/* Smaller floating orb with animation */}
      <div
        className="absolute top-16 sm:top-20 right-16 sm:right-32 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-tr from-purple-300/70 to-blue-200/70 opacity-80 rounded-full filter blur-2xl z-0"
        style={{
          transform: `translate(${orbPosition.x}px, ${orbPosition.y}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      {/* Decorative circle (hidden on mobile) */}
      <div className="hidden lg:block absolute bottom-48 right-48 w-36 sm:w-48 h-36 sm:h-48 border-2 border-pink-500/50 rounded-full opacity-60 z-0 animate-pulse" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 7}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Social icons */}
      <div className="absolute right-4 sm:right-8 top-1/4 sm:top-1/3 flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-6 text-white z-10">
        {[
          { href: 'https://github.com/buddy0630', icon: <FaGithub size={20} /> },
          { href: 'https://www.instagram.com/bayanbatbuddy/', icon: <FaInstagram size={20} /> },
          { href: 'https://www.linkedin.com/in/bayanbat-buddy-078116306/', icon: <FaLinkedinIn size={20} /> },
          { href: 'https://www.facebook.com/profile.php?id=100012229111768', icon: <FaFacebook size={20} /> },
        ].map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="transform hover:scale-125 hover:text-pink-500 transition-all duration-300"
          >
            {link.icon}
          </a>
        ))}
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
