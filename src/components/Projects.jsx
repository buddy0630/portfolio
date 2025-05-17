import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Sample project data
const projectsData = [
  {
    id: 1,
    title: "Pet Clinic Management",
    description:
      "A website built with HTML5, CSS3, JavaScript and Firebase Authentication featuring user registration, login, pet registration, search functionality, and appointment scheduling.",
    imageUrl: "/images/pet-clinic.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Firebase"],
    githubUrl: "https://github.com/buddy0630/3th_team",
    liveUrl: "",
    date: "2023",
  },
  {
    id: 2,
    title: "Anime Web",
    description:
      "A React and Vite project styled with TailwindCSS following the StreamVibe Figma design with a polished interface.",
    imageUrl: "/images/anime-web.png",
    tags: ["React", "Vite", "TailwindCSS"],
    githubUrl: "",
    liveUrl: "https://main.d3r2moq7qa0sqp.amplifyapp.com/",
    date: "2024",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Personal portfolio developed using React.js and TailwindCSS, hosted on Vercel with a custom domain.",
    imageUrl: "/images/portfolio.png",
    tags: ["React.js", "TailwindCSS", "Vercel"],
    githubUrl: "",
    liveUrl: "https://bayanbat.com",
    date: "2025",
  },
  {
    id: 4,
    title: "Future Project",
    description: "A placeholder for my next exciting project. Stay tuned!",
    imageUrl: "/images/placeholder.jpg",
    tags: ["Coming soon"],
    githubUrl: "",
    liveUrl: "",
    date: "2025",
  },
];

export default function Projects() {
  const [projects] = useState(projectsData);
  const [githubRepos, setGithubRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Fetch GitHub repos on button click
  const fetchGithubRepos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://api.github.com/users/buddy0630/repos');
      if (res.ok) setGithubRepos(await res.json());
    } catch (e) {
      console.error('Error fetching GitHub repos:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Track mouse position for background blob
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  return (
    <motion.section
      className="relative py-24 px-8 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated gradient blob */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0">
        <motion.div
          className="absolute w-1/2 h-1/2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full filter blur-3xl"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-p pink-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 items-start md:items-center justify-between mb-12">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            My Projects
          </motion.h2>
          <motion.button
            onClick={fetchGithubRepos}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-pink-500 rounded-full font-semibold hover:bg-opacity-80 transition-all"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaGithub size={20} />
            {isLoading ? 'Loading...' : 'Load GitHub Projects'}
          </motion.button>
        </div>

        {/* Project cards */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-pink-500/50 group"
              variants={cardVariants}
            >
              <div className="h-48 overflow-hidden">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <FaCode className="text-5xl text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-pink-500/20 text-pink-300 py-1 px-2 rounded-full">
                    {project.date}
                  </span>
                </div>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-700 text-gray-300 py-1px px-2 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xl" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Repos Section */}
        {githubRepos.length > 0 && (
          <motion.div className="mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h3 className="text-3xl font-bold mb-8">My GitHub Repositories</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {githubRepos.map((repo) => (
                <motion.div
                  key={repo.id}
                  className="bg-gray-800/50 p-5 rounded-lg border border-gray-700"
                  variants={cardVariants}
                >
                  <h4 className="text-lg font-semibold mb-2">{repo.name}</h4>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <span className="text-xs flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        {repo.language || 'N/A'}
                      </span>
                      <span className="text-xs flex items-center gap-1">⭐ {repo.stargazers_count}</span>
                      <span className="text-xs flex items-center gap-1">🍴 {repo.forks_count}</span>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 text-sm">
                      View
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        </div>
      </motion.section>
  );
}