import React, { useEffect, useRef } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaGithub, FaInstagram, FaLinkedinIn, FaFacebook } from 'react-icons/fa';

export default function Hero() {
  const canvasRef = useRef(null);
  const rafId    = useRef(null);
  const isMouseDown = useRef(false);

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

    const mouse = { x: w / 2, y: h / 2 };
    const onMouseMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    const onMouseDown = () => { isMouseDown.current = true; };
    const onMouseUp = () => { isMouseDown.current = false; };
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const starCount = 10000;
    const MAX_VEL = 3;
    const MAX_TAIL = 30;
    const stars = Array.from({ length: starCount }).map(() => {
      const xPos = Math.random() * w;
      const yPos = Math.random() * h;
      const zVal = Math.random() || 0.001;
      const scale = 0.5 / zVal;
      const sx = w * (0.5 + (xPos - w / 2) * scale / (w / 2));
      const sy = h * (0.5 + (yPos - h / 2) * scale / (h / 2));
      return { x: xPos, y: yPos, z: zVal, dx: 0, dy: 0, prevSx: sx, prevSy: sy };
    });

    const shootingStars = [];
    const SHOOT_INTERVAL = 5000;
    const SHOOT_SPEED    = 1.5;
    const SHOOT_LENGTH   = 200;
    const shootTimer = setInterval(() => {
      shootingStars.push({ x: Math.random() * w, y: -20, dx: (Math.random() * 0.5 - 0.25) * w, dy: h * (0.5 + Math.random() * 0.5), progress: 0 });
    }, SHOOT_INTERVAL);

    const speedFactor = 0.07 * 0.001;
    let last = performance.now();

    const resetStar = (s) => {
      s.x = Math.random() * w;
      s.y = Math.random() * h;
      s.z = 1;
      s.dx = 0;
      s.dy = 0;
      const scale = 0.5 / s.z;
      s.prevSx = w * (0.5 + (s.x - w/2) * scale / (w/2));
      s.prevSy = h * (0.5 + (s.y - h/2) * scale / (h/2));
    };

    const draw = (now) => {
      rafId.current = requestAnimationFrame(draw);
      const delta = now - last;
      last = now;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (const s of stars) {
        s.z -= delta * speedFactor;

        // reset when too close or off-screen
        const scale = 0.5 / s.z;
        const sx = w * (0.5 + (s.x - w/2) * scale / (w/2));
        const sy = h * (0.5 + (s.y - h/2) * scale / (h/2));
        if (s.z <= 0.002 || sx < 0 || sx > w || sy < 0 || sy > h) {
          resetStar(s);
          continue;
        }

        if (isMouseDown.current) {
          const dx = mouse.x - sx;
          const dy = mouse.y - sy;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 90000) {
            const force = 100 / (dist2 + 10000);
            s.dx += dx * force;
            s.dy += dy * force;
          }
        }

        // velocity and movement
        s.dx *= 0.95;
        s.dy *= 0.95;
        const vel = Math.hypot(s.dx, s.dy);
        if (vel > MAX_VEL) {
          const ratio = MAX_VEL / vel;
          s.dx *= ratio;
          s.dy *= ratio;
        }
        s.x += s.dx;
        s.y += s.dy;

        // draw tail
        const dxTail = sx - s.prevSx;
        const dyTail = sy - s.prevSy;
        let tailStartX = s.prevSx;
        let tailStartY = s.prevSy;
        const tailLen = Math.hypot(dxTail, dyTail);
        if (tailLen > MAX_TAIL) {
          tailStartX = sx;
          tailStartY = sy;
        }

        ctx.beginPath();
        ctx.moveTo(tailStartX, tailStartY);
        ctx.lineTo(sx, sy);
        const brightness = Math.min((1 - s.z) * 0.8, 1);
        ctx.strokeStyle = `rgba(255,255,255,${brightness})`;
        ctx.lineWidth = brightness * 2;
        ctx.stroke();

        s.prevSx = sx;
        s.prevSy = sy;
      }

      ctx.globalCompositeOperation = 'source-over';
      // shooting stars drawing same as before...
      for (const comet of shootingStars) {
        comet.progress += delta * SHOOT_SPEED;
        const t = comet.progress / SHOOT_LENGTH;
        if (t <= 1) {
          const cx = comet.x + comet.dx * t;
          const cy = comet.y + comet.dy * t;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx - comet.dx * 0.02, cy - comet.dy * 0.02);
          ctx.strokeStyle = `rgba(160, 130, 255,${1 - t})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        if (shootingStars[i].progress / SHOOT_LENGTH > 1) shootingStars.splice(i, 1);
      }
    };

    const onTouchStart = e => {
    isMouseDown.current = true;
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
  };
  const onTouchMove = e => {
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
  };
  const onTouchEnd = () => {
    isMouseDown.current = false;
  };

  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd);

    draw(performance.now());



    return () => {
      clearInterval(shootTimer);
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none">
      <canvas ref={canvasRef} id="starfield" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-4 sm:px-8">
        <div className="text-white max-w-md w-full md:w-auto text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Эрдэнэбат<br />Баянбат
            </h1>
            <div className="flex items-start justify-center md:justify-start space-x-4">
              <div className="border-l-2 border-gray-400 h-12" />
              <p className="text-base sm:text-lg">Information Technology student at National University of Mongolia</p>
            </div>
            <a href="CV.pdf" download className="relative inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 overflow-hidden text-white font-semibold transform transition-all duration-500 hover:scale-110 hover:shadow-2xl group">
              <div className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FiDownload className="mr-2 z-10 group-hover:animate-bounce" /><span className="z-10">Download CV</span>
            </a>
          </div>
          <div className="flex md:flex-col space-x-4 md:space-x-0 mt-8 md:mt-0 md:ml-12 text-white">
            {[
              ['https://github.com/buddy0630', <FaGithub size={24} />],
              ['https://www.instagram.com/bayanbatbuddy/', <FaInstagram size={24} />],
              ['https://www.linkedin.com/in/bayanbat-buddy-078116306/', <FaLinkedinIn size={24} />],
              ['https://www.facebook.com/profile.php?id=100012229111768', <FaFacebook size={24} />],
            ].map(([href, icon], i) => (<a key={i} href={href} className="transform hover:scale-125 hover:text-pink-500 transition duration-300 my-2">{icon}</a>))}
          </div>
      </div>
    </section>
  );
}
