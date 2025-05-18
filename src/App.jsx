import React from 'react';
// 1️⃣ import HashRouter (you can alias it to Router if you like)
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from "./components/NavBar"; 

import About   from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills  from './components/Skills';
import Hero    from './components/Hero';

export default function App() {
  return (
    // 2️⃣ swap your div’s top‐level to include the Router
    
      <div className="min-h-screen bg-gradient-to-tr from-darkbg via-darkfade to-blue-800">
        <NavBar />
        <Routes>
          <Route path="/"        element={<Hero />} />
          <Route path="/about"   element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skills"  element={<Skills />} />
        </Routes>
      </div>
    
  );
}
