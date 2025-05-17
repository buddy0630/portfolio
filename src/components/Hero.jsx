// Hero.jsx
import React, { useEffect, useRef } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaGithub, FaInstagram, FaLinkedinIn, FaFacebook } from 'react-icons/fa';
// make sure .glow-card is defined here

export default function Hero() {
  const canvasRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    const starCount = 1000;
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
    }));

    const speedFactor = 0.07 * 0.001;
    let last = performance.now();

    const draw = (now) => {
      const delta = now - last;
      last = now;

      // partial clear
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'black';
      ctx.globalAlpha = 0.3;
      ctx.fillRect(0, 0, w, h);

      // draw stars
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 1;
      stars.forEach((s) => {
        s.z -= delta * speedFactor;
        if (s.z <= 0) s.z = 1;
        const k = 0.5 / s.z;
        const x = w * (0.5 + s.x * k);
        const y = h * (0.5 + s.y * k);
        if (x < 0 || x > w || y < 0 || y > h) return;
        const brightness = (1 - s.z) * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, brightness * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.fill();
      });

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Starfield */}
      <canvas
        ref={canvasRef}
        id="starfield"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-4 sm:px-8">
        <div className="text-white max-w-md w-full md:w-auto text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Эрдэнэбат<br />Баянбат
          </h1>
          <div className="flex items-start justify-center md:justify-start space-x-4">
            <div className="border-l-2 border-gray-400 h-12" />
            <p className="text-base sm:text-lg">
              Information Technology student at National University of Mongolia
            </p>
          </div>
<a
  href="CV.pdf"
  download
  className="
    relative inline-flex items-center px-6 py-3 rounded-full 
    bg-gradient-to-r from-pink-500 to-purple-500
    overflow-hidden text-white font-semibold 
    transform transition-all duration-500 
    hover:scale-110 hover:shadow-2xl
    group
  "
>
  {/* white flash ripple */}
  <div className="
    absolute inset-0 bg-white/30 rounded-full 
    scale-0 group-hover:scale-100 
    transition-transform duration-500
  " />

  {/* gradient flip */}
  <div className="
    absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 
    opacity-0 group-hover:opacity-100 
    transition-opacity duration-500
  " />

  {/* content */}
  <FiDownload className="mr-2 z-10 group-hover:animate-bounce" />
  <span className="z-10">
    Download CV
  </span>
</a>

        </div>

        <div className="flex md:flex-col space-x-4 md:space-x-0 mt-8 md:mt-0 md:ml-12 text-white">
          {[
            ['https://github.com/buddy0630', <FaGithub size={24} />],
            ['https://www.instagram.com/bayanbatbuddy/', <FaInstagram size={24} />],
            ['https://www.linkedin.com/in/bayanbat-buddy-078116306/', <FaLinkedinIn size={24} />],
            ['https://www.facebook.com/profile.php?id=100012229111768', <FaFacebook size={24} />],
          ].map(([href, icon], i) => (
            <a
              key={i}
              href={href}
              className="transform hover:scale-125 hover:text-pink-500 transition duration-300 my-2"
            >
              {icon}
            </a>
          ))}
        </div>

      </div>  
    </section>
  );
}
