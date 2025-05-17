import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = [
  { to: '/',       label: 'Home'     },
  { to: '/projects', label: 'Projects' },
  { to: '/about',   label: 'About'    },
  { to: '/skills',  label: 'Skills'   },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 px-8 py-4 flex items-center justify-between bg-transparent">
      <div className="text-white text-2xl font-bold">
        Эрдэнэбатын Баянбат
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex space-x-8">
        {links.map(({ to, label }) => (
          <li key={label}>
            <NavLink
              end
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-b-2 border-pink-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Contact button (desktop) */}
      <div className="hidden md:block ml-12">
        <NavLink
          to="/contact"
          className="
            relative inline-flex items-center px-6 py-2 rounded-full
            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-800
            text-white font-medium overflow-hidden
            transform transition-all duration-500
            hover:scale-105 hover:shadow-2xl
            group
          "
        >
          <div
            className="
              absolute inset-0 bg-white/30 rounded-full
              scale-0 group-hover:scale-100
              transition-transform duration-500
            "
          />
          <div
            className="
              absolute inset-0 bg-gradient-to-r from-blue-800 via-purple-500 to-pink-500
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
            "
          />
          <span className="z-10 group-hover:animate-bounce">
            Contact Me
          </span>
        </NavLink>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile dropdown menu */}
      {isOpen && (
  <ul
    className="
      absolute top-full right-8
      bg-gray-800
      rounded-xl shadow-lg
      py-2 px-4
      flex flex-col space-y-2
      md:hidden
      w-auto
    "
  >
    {links.map(({ to, label }) => (
      <li key={label}>
        <NavLink
          end
          to={to}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive
              ? 'text-white text-lg'
              : 'text-gray-300 hover:text-white text-lg'
          }
        >
          {label}
        </NavLink>
      </li>
    ))}
    <li>
      <NavLink
        to="/contact"
        onClick={() => setIsOpen(false)}
        className="text-pink-400 hover:text-pink-200 text-lg"
      >
        Contact Me
      </NavLink>
    </li>
  </ul>
)}

    </nav>
  );
}
