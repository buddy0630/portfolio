import React, { useEffect, useRef } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaGithub, FaInstagram, FaLinkedinIn, FaFacebook } from 'react-icons/fa';

export default function Hero() {
  const canvasRef = useRef(null);
  const rafId    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    // track mouse
    const mouse = { x: w / 2, y: h / 2 };
    const onMouseMove = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // starfield setup
    const starCount = 5000;
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random(),    // depth for speed/size
      dx: 0,
      dy: 0,
    }));

    // shooting star setup
    const shootingStars = [];
    const SHOOT_INTERVAL = 5000;  // spawn every ~5s
    const SHOOT_SPEED    = 1.5;   // speed multiplier
    const SHOOT_LENGTH   = 200;   // tail length

    const shootTimer = setInterval(() => {
      shootingStars.push({
        x: Math.random() * w,
        y: -20,
        dx: (Math.random() * 0.5 - 0.25) * w,
        dy: h * (0.5 + Math.random() * 0.5),
        progress: 0
      });
    }, SHOOT_INTERVAL);

    const speedFactor = 0.07 * 0.001;
    let last = performance.now();

    const draw = (now) => {
      rafId.current = requestAnimationFrame(draw);
      const delta = now - last;
      last = now;

      // clear canvas
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);

      // draw & update stars
      ctx.globalCompositeOperation = 'lighter';
      for (const s of stars) {
        s.z -= delta * speedFactor;
        if (s.z <= 0) s.z = 1;

        const scale = 0.5 / s.z;
        let x = w * (0.5 + (s.x - w/2) * scale / (w/2));
        let y = h * (0.5 + (s.y - h/2) * scale / (h/2));

        // gravity toward mouse
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const dist2 = dx*dx + dy*dy;
        if (dist2 < 10000) {
          const force = 1000 / (dist2 + 10000);
          s.dx += dx * force;
          s.dy += dy * force;
        }
        s.dx *= 0.95;
        s.dy *= 0.95;
        s.x += s.dx;
        s.y += s.dy;

        // re-calc pos
        x = w * (0.5 + (s.x - w/2) * scale / (w/2));
        y = h * (0.5 + (s.y - h/2) * scale / (h/2));

        // brightness & draw
        const brightness = (1 - s.z) * 0.9;
        ctx.beginPath();
        ctx.arc(x, y, brightness * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(brightness,1)})`;
        ctx.fill();
      }

      // draw shooting stars
      ctx.globalCompositeOperation = 'source-over';
      for (const comet of shootingStars) {
        comet.progress += delta * SHOOT_SPEED;
        const t = comet.progress / SHOOT_LENGTH;
        if (t <= 1) {
          const cx = comet.x + comet.dx * t;
          const cy = comet.y + comet.dy * t;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(
            cx - comet.dx * 0.02,
            cy - comet.dy * 0.02
          );
          ctx.strokeStyle = `rgba(255,255,255,${1 - t})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      // clean up
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        if (shootingStars[i].progress / SHOOT_LENGTH > 1) {
          shootingStars.splice(i, 1);
        }
      }

      // black-hole mask
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
      ctx.fill();
    };

    // start animation
    draw(performance.now());

    return () => {
      clearInterval(shootTimer);
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        id="starfield"
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

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
            className="relative inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 overflow-hidden text-white font-semibold transform transition-all duration-500 hover:scale-110 hover:shadow-2xl group"
          >
            <div className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <FiDownload className="mr-2 z-10 group-hover:animate-bounce" />
            <span className="z-10">Download CV</span>
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