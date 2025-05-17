import React, { useEffect, useState, useRef } from 'react';
import { FaArrowRight, FaHtml5, FaCss3Alt, FaReact, FaJava, FaDatabase, FaGithub } from 'react-icons/fa';
import { SiJavascript, SiCplusplus } from 'react-icons/si';
import { NavLink } from 'react-router-dom';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverSkill, setHoverSkill] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    setMousePosition({ x, y });
  };

  const skills = [
    { name: "HTML", icon: <FaHtml5 />, color: "text-orange-500" },
    { name: "CSS", icon: <FaCss3Alt />, color: "text-blue-400" },
    { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
    { name: "React", icon: <FaReact />, color: "text-blue-300" },
    { name: "C/C++", icon: <SiCplusplus />, color: "text-blue-600" },
    { name: "Java", icon: <FaJava />, color: "text-red-500" },
    { name: "SQL", icon: <FaDatabase />, color: "text-green-400" },
    { name: "GitHub", icon: <FaGithub />, color: "text-white" }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 px-8 min-h-screen flex flex-col md:flex-row items-center gap-12 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0">
        <div 
          className="absolute w-1/2 h-1/2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full filter blur-3xl"
          style={{ 
            left: `${mousePosition.x * 20}%`, 
            top: `${mousePosition.y * 20}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.3s ease-out, top 0.3s ease-out'
          }}
        />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-pink-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 7}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Profile image with glow */}
      <div className={`relative z-20 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} transition-all duration-1000`}>
        <div className="w-80 h-80 rounded-full overflow-hidden relative group">
          <img 
            src="/laptop.jpg" 
            alt="Bayanbat" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="text-white font-bold text-lg">Bayanbat</span>
          </div>
        </div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full filter blur-xl animate-pulse" />
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full filter blur-xl animate-pulse" />
      </div>
      
      {/* Content section */}
      <div className={`flex-1 text-white z-20 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'} transition-all duration-1000 delay-300`}>
        <div className="flex items-center space-x-4 mb-6">
          <h2 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
            About<br/>me
          </h2>
          <FaArrowRight className="text-pink-500 text-3xl animate-pulse" />
        </div>
        
        <p className="max-w-xl leading-relaxed mb-8 text-lg">
          I'm <span className="font-bold text-pink-400">Bayanbat</span>, an Information Technology student at the 
          <span className="italic"> National University of Mongolia</span> with a passion for web development. 
          I have a strong foundation in frontend technologies like HTML, CSS, JavaScript, and React.js, 
          along with experience in C/C++, Java, and database management with SQL. 
          I enjoy solving problems with logical thinking and am eager to learn new technologies 
          while collaborating on real-world projects.
        </p>
        
        {/* Skills section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">My Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full cursor-pointer transform hover:scale-110 transition-all duration-300 ${skill.color} relative`}
                onMouseEnter={() => setHoverSkill(index)}
                onMouseLeave={() => setHoverSkill(null)}
              >
                <span className="text-xl">{skill.icon}</span>
                <span>{skill.name}</span>
                
                {hoverSkill === index && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-500 rounded-full animate-ping" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <NavLink 
          to="/contact" 
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 text-white inline-flex items-center gap-2 group"
        >
          Contact Me
          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </NavLink>
        
        {/* Animated dots with trail effect */}
        <div className="grid grid-cols-5 gap-4 mt-12">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 bg-pink-500 rounded-full transform hover:scale-150 transition-all duration-300"
              style={{ 
                animationDelay: `${i * 0.05}s`,
                opacity: isVisible ? (i % 2 === 0 ? 0.3 : 0.6) : 0
              }} 
            />
          ))}
        </div>
      </div>
      
      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}