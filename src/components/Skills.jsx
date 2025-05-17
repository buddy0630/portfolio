// src/components/Skills.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaCss3Alt, FaHtml5, FaGithub, FaDatabase
} from 'react-icons/fa';
import { SiJavascript, SiReact, SiCplusplus } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
// Define skills with rating out of 8 based on your actual experience
const skills = [
  { name: 'HTML', level: 6, color: '#e34c26', icon: <FaHtml5 /> },
  { name: 'CSS', level: 5, color: '#2965f1', icon: <FaCss3Alt /> },
  { name: 'JavaScript', level: 3, color: '#f7df1e', icon: <SiJavascript /> },
  { name: 'React', level: 3, color: '#61dafb', icon: <SiReact /> },
  { name: 'C/C++', level: 4, color: '#00599c', icon: <SiCplusplus /> },
  { name: 'Java', level: 4, color: '#007396', icon: <FaJava /> },
  { name: 'SQL', level: 3, color: '#f29111', icon: <FaDatabase /> },
  { name: 'GitHub', level: 5, color: '#ffffff', icon: <FaGithub /> },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [animatedLevels, setAnimatedLevels] = useState(
    skills.map(() => 0)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
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

  // Animate skill levels when visible
  useEffect(() => {
    if (isVisible) {
      const timers = skills.map((skill, index) => {
        return setTimeout(() => {
          setAnimatedLevels(prev => {
            const newLevels = [...prev];
            newLevels[index] = skill.level;
            return newLevels;
          });
        }, 300 + index * 200);
      });

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isVisible]);

  const getSkillDescription = (skillName) => {
    const descriptions = {
      'HTML': 'Good understanding of semantic HTML and document structure.',
      'CSS': 'Comfortable with styling, layout, and basic responsive design.',
      'JavaScript': 'Still learning the fundamentals and core concepts.',
      'React': 'Familiar with basic concepts and components, actively learning.',
      'C/C++': 'General knowledge of syntax and programming concepts.',
      'Java': 'Understanding of object-oriented programming and basic syntax.',
      'SQL': 'Familiar with basic queries and database concepts but still learning.',
      'GitHub': 'Almost 2 years of experience, mostly solo projects with some collaboration.',
    };
    return descriptions[skillName] || 'Skill description not available';
  };

  return (
    <section ref={sectionRef} className="py-20 px-8 text-white bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {skills.map((skill, idx) => (
          <div 
            key={`bg-${idx}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: skill.color,
              width: `${30 + Math.random() * 100}px`,
              height: `${30 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              opacity: 0.4,
              transform: 'translate(-50%, -50%)',
              animation: `float-${idx} ${10 + Math.random() * 20}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center mb-12">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
            My Skills
          </h2>
          <div className="ml-4 h-1 flex-grow bg-gradient-to-r from-pink-500 to-transparent rounded-full" />
        </div>

        <div className="space-y-10">
          {skills.map(({ name, level, color, icon }, index) => (
            <div 
              key={name} 
              className={`transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'} transition-all duration-700`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveSkill(name)}
              onMouseLeave={() => setActiveSkill(null)}
            >
              <div className="flex items-center mb-2">
                <div className="text-2xl mr-3" style={{ color }}>
                  {icon}
                </div>
                <span className="text-xl font-semibold">{name}</span>
                <span className="ml-auto text-sm font-mono bg-gray-800 px-2 py-1 rounded">
                  {animatedLevels[index]}/8
                </span>
              </div>
              
              <div className="flex items-center relative">
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(animatedLevels[index] / 8) * 100}%`,
                      background: `linear-gradient(to right, ${color}, ${color}88)`,
                      boxShadow: activeSkill === name ? `0 0 10px ${color}` : 'none'
                    }}
                  />
                </div>
                
                {/* Skill dots indicator */}
                <div className="ml-4 hidden sm:flex space-x-1">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx < animatedLevels[index]
                          ? 'scale-100'
                          : 'scale-75 opacity-50'
                      }`}
                      style={{ 
                        backgroundColor: idx < animatedLevels[index] ? color : '#374151',
                        transitionDelay: `${idx * 50}ms`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Skill description panel */}
              <div 
                className={`mt-2 text-sm text-gray-300 overflow-hidden transition-all duration-300 ${
                  activeSkill === name ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {getSkillDescription(name)}
              </div>
            </div>
          ))}
        </div>
        
        {/* Learning journey section */}
        <div className="mt-16 bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-pink-400">My Learning Journey</h3>
          <p className="text-gray-300">
            I'm currently a 3rd year Information Technology student focused on expanding my skills. While I have a solid foundation in multiple programming languages, I'm particularly interested in web development and continue to improve my JavaScript and React knowledge. I'm always eager to learn new technologies and collaborate on real-world projects.
          </p>
          
          {/* Timeline for learning journey */}
          <div className="mt-8 relative before:absolute before:left-3 before:top-2 before:h-full before:w-0.5 before:bg-pink-500/30">
            <div className="ml-10 relative mb-6">
              <div className="absolute -left-10 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h4 className="font-semibold">Beginning with Programming Fundamentals</h4>
              <p className="text-sm text-gray-400">C/C++ and Java foundations</p>
            </div>
            <div className="ml-10 relative mb-6">
              <div className="absolute -left-10 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h4 className="font-semibold">Web Development Basics</h4>
              <p className="text-sm text-gray-400">HTML, CSS and GitHub workflow</p>
            </div>
            <div className="ml-10 relative">
              <div className="absolute -left-10 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h4 className="font-semibold">Current Focus</h4>
              <p className="text-sm text-gray-400">JavaScript, React, and database integration</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes float-0 { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes float-1 { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(-360deg); } }
        @keyframes float-2 { 0% { transform: translate(-50%, -50%) translateY(0); } 100% { transform: translate(-50%, -50%) translateY(-50px); } }
        @keyframes float-3 { 0% { transform: translate(-50%, -50%) translateX(0); } 100% { transform: translate(-50%, -50%) translateX(50px); } }
        @keyframes float-4 { 0% { transform: translate(-50%, -50%) scale(1); } 100% { transform: translate(-50%, -50%) scale(1.5); } }
        @keyframes float-5 { 0% { transform: translate(-50%, -50%) translateY(0); } 100% { transform: translate(-50%, -50%) translateY(50px); } }
        @keyframes float-6 { 0% { transform: translate(-50%, -50%) translateX(0); } 100% { transform: translate(-50%, -50%) translateX(-50px); } }
        @keyframes float-7 { 0% { transform: translate(-50%, -50%) scale(1); } 100% { transform: translate(-50%, -50%) scale(1.3); } }
      `}</style>
    </section>
  );
}