import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const links = [ { to: '/', label: 'Home' }, { to: '/projects', label: 'Projects' }, { to: '/about', label: 'About' },{ to: '/skills', label: 'Skills' }, ];

export default function NavBar() {
  return (
    <nav className="fixed w-full top-0 z-50 px-8 py-4 flex items-center justify-between bg-transparent">
      <div className="text-white text-2xl font-bold">Эрдэнэбатын Баянбат</div>
      <ul className="hidden md:flex space-x-8">
        {links.map(({ to, label }) => (
          <li key={label}>
            <NavLink
              end
              to={to}
              className={({ isActive }) => isActive ? 'text-white border-b-2 border-pink-500 pb-1' : 'text-gray-300 hover:text-white'}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="hidden md:block ml-50">
        <NavLink to="/contact" className="px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-800 rounded-full text-white">
          Contact Me
        </NavLink>
      </div>
      <div className="md:hidden text-white">
        <FaBars size={24} />
      </div>
    </nav>
  );
}