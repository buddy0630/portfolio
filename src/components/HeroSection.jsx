// src/components/HeroSection.jsx
import { Download } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center px-12 bg-gradient-to-br from-black via-[#10042f] to-purple-900">
      {/* Text Content */}
      <div className="z-10 text-white space-y-6">
        <h1 className="text-7xl font-bold leading-none">Rohan<br />Patil</h1>
        <p className="max-w-sm text-base font-light border-l-2 border-white pl-4">
          I’m a full-stack web developer and I work remotely from Bharat
        </p>
        <button className="relative bg-fuchsia-600 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2">
          <Download className="w-4 h-4" />
          CV
        </button>
      </div>

      {/* Social Icons */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 space-y-6">
        {['github', 'instagram', 'linkedin', 'figma'].map(icon => (
          <img key={icon} src={`/icons/${icon}.svg`} alt={icon} className="w-6 h-6" />
        ))}
      </div>

      {/* Glowing Blobs */}
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-purple-500 via-blue-300 to-fuchsia-400 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute top-[30%] right-[10%] w-32 h-32 bg-gradient-to-br from-fuchsia-400 via-blue-200 to-white rounded-full blur-2xl opacity-90"></div>
    </section>
  );
};

export default HeroSection;
