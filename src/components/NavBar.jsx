import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-50 px-8 py-4 flex items-center justify-between bg-gray-900/70 backdrop-blur-md">
      <div className="text-white text-xl md:text-2xl font-bold">Эрдэнэбатын Баянбат</div>
      
      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-8">
        {links.map(({ to, label }) => (
          <li key={label}>
            <NavLink
              end
              to={to}
              className={({ isActive }) => 
                isActive 
                  ? 'text-white border-b-2 border-pink-500 pb-1' 
                  : 'text-gray-300 hover:text-white transition-colors duration-300'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      
      <div className="hidden md:block">
        <NavLink 
          to="/contact" 
          className="px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-800 rounded-full text-white hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
        >
          Contact Me
        </NavLink>
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMenu} 
        className="md:hidden text-white focus:outline-none z-50"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      
      {/* Mobile Menu Dropdown */}
      <div 
        className={`fixed inset-0 bg-gray-900/95 backdrop-blur-md flex flex-col justify-center items-center transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col items-center space-y-6">
          {links.map(({ to, label }) => (
            <li key={label}>
              <NavLink
                end
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  isActive 
                    ? 'text-2xl font-medium text-white border-b-2 border-pink-500 pb-1' 
                    : 'text-2xl font-medium text-gray-300 hover:text-white transition-colors duration-300'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="mt-8">
            <NavLink 
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-800 rounded-full text-white text-lg font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
            >
              Contact Me
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}