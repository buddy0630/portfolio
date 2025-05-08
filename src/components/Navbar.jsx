// src/components/Navbar.jsx
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-md rounded-full px-6 py-3 mt-6 mx-8 flex justify-between items-center">
      <div className="text-white font-bold text-xl">Rohan Patil</div>
      <ul className="flex gap-8 text-white font-medium text-sm">
        <li className="border-b-2 border-fuchsia-500 pb-1">Home</li>
        <li>Projects</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-white text-xs">
          <Sun className="w-4 h-4" />
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
          <Moon className="w-4 h-4" />
        </div>
        <button className="bg-white text-black font-semibold rounded-full px-4 py-1 text-sm">Contact Me</button>
      </div>
    </nav>
  );
};

export default Navbar;
