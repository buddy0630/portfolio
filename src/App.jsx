import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-darkbg via-darkfade to-blue-800">
      <NavBar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </div>
  );
}


